import { ModelLoader } from '../components/three/ModelLoader';
import { pbrMaterials } from '../rendering/pbrMaterials';

export function StudentAvatar() {
  return (
    <ModelLoader assetId="student-humanoid" fallback={<HumanoidFallback />} />
  );
}

function HumanoidFallback() {
  return (
    <group>
      <mesh castShadow position={[0, 1.08, 0]}>
        <boxGeometry args={[0.46, 0.88, 0.26]} />
        <meshStandardMaterial color="#2f80ed" metalness={0.04} roughness={0.48} />
      </mesh>
      <mesh castShadow position={[0, 1.68, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#f1c6a8" roughness={0.52} />
      </mesh>
      <mesh castShadow position={[0, 1.88, 0.02]}>
        <sphereGeometry args={[0.23, 24, 12]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
      <mesh castShadow position={[-0.34, 1.08, 0]}>
        <boxGeometry args={[0.14, 0.78, 0.14]} />
        <meshStandardMaterial color="#2f80ed" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.34, 1.08, 0]}>
        <boxGeometry args={[0.14, 0.78, 0.14]} />
        <meshStandardMaterial color="#2f80ed" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[-0.14, 0.42, 0]}>
        <boxGeometry args={[0.16, 0.84, 0.16]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
      <mesh castShadow position={[0.14, 0.42, 0]}>
        <boxGeometry args={[0.16, 0.84, 0.16]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
    </group>
  );
}
