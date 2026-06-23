import { Clone, Text, useGLTF } from '@react-three/drei';
import { useEffect, useState, type ReactNode } from 'react';
import { modelAssets, type AssetId } from '../../data/assetManifest';
import { reportAssetStatus } from '../../features/assets/assetStatus';

const warnedMissingAssets = new Set<string>();

type ModelLoaderProps = {
  assetId: AssetId;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  fallback: ReactNode;
};

export function ModelLoader({
  assetId,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  fallback,
}: ModelLoaderProps) {
  const asset = modelAssets[assetId];
  const [loadStatus, setLoadStatus] = useState<'checking' | 'loaded' | 'fallback'>('checking');

  useEffect(() => {
    let isMounted = true;

    fetch(asset.path, { method: 'HEAD' })
      .then((response) => {
        if (!isMounted) return;

        if (response.ok) {
          setLoadStatus('loaded');
          reportAssetStatus({
            assetId,
            name: asset.name,
            path: asset.path,
            status: 'model loaded',
          });
          return;
        }

        warnMissingAsset(asset.path);
        setLoadStatus('fallback');
        reportAssetStatus({
          assetId,
          name: asset.name,
          path: asset.path,
          status: 'fallback used',
        });
      })
      .catch(() => {
        if (!isMounted) return;

        warnMissingAsset(asset.path);
        setLoadStatus('fallback');
        reportAssetStatus({
          assetId,
          name: asset.name,
          path: asset.path,
          status: 'fallback used',
        });
      });

    return () => {
      isMounted = false;
    };
  }, [asset.name, asset.path, assetId]);

  if (loadStatus !== 'loaded') {
    return (
      <group position={position} rotation={rotation} scale={scale}>
        {fallback}
        <FallbackBadge />
      </group>
    );
  }

  return (
    <GLTFModel path={asset.path} position={position} rotation={rotation} scale={scale} />
  );
}

function warnMissingAsset(path: string) {
  if (warnedMissingAssets.has(path)) {
    return;
  }

  warnedMissingAssets.add(path);
  console.warn(`[RealLabVerse] Missing GLB asset, fallback used: ${path}`);
}

function FallbackBadge() {
  return (
    <group position={[0, 2.15, 0]}>
      <mesh>
        <boxGeometry args={[0.92, 0.22, 0.04]} />
        <meshBasicMaterial color="#ffb454" />
      </mesh>
      <Text position={[0, 0.005, 0.026]} fontSize={0.09} color="#101820" anchorX="center" anchorY="middle">
        FALLBACK
      </Text>
    </group>
  );
}

function GLTFModel({
  path,
  position,
  rotation,
  scale,
}: {
  path: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
}) {
  const gltf = useGLTF(path);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Clone object={gltf.scene} castShadow receiveShadow />
    </group>
  );
}
