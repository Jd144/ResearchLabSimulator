import { Clone, useGLTF } from '@react-three/drei';
import type { ReactNode } from 'react';
import { modelAssets, type AssetId } from '../../data/assetManifest';

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

  if (!asset.available) {
    return (
      <group position={position} rotation={rotation} scale={scale}>
        {fallback}
      </group>
    );
  }

  return (
    <GLTFModel path={asset.path} position={position} rotation={rotation} scale={scale} />
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

