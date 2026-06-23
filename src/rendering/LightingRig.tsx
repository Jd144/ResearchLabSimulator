import { Environment, Lightformer, SoftShadows } from '@react-three/drei';

export function LightingRig() {
  return (
    <>
      <SoftShadows size={28} samples={12} focus={0.45} />
      <ambientLight intensity={0.22} />
      <directionalLight
        castShadow
        position={[5, 8, 4]}
        intensity={1.85}
        shadow-camera-far={40}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <rectAreaLight position={[0, 4.6, 0]} width={9} height={4} intensity={2.1} color="#d7fbff" />
      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[0, 5, -6]} scale={[8, 3, 1]} color="#e8fbff" />
        <Lightformer intensity={1.4} position={[-5, 3, 3]} scale={[4, 4, 1]} color="#c7e7ff" />
        <Lightformer intensity={1.1} position={[5, 4, 4]} scale={[4, 3, 1]} color="#fff3df" />
      </Environment>
    </>
  );
}

