import { worldZones } from '../data/world';
import { NPCStudent } from './NPCStudent';

const labZone = worldZones['molecular-biology-lab'];

export function MolecularBiologyLabScene() {
  return (
    <group>
      <LabShell />
      <LabBenches />
      <UserDesk />
      <Instruments />
      <ChemicalShelf />
      <LabNPCs />
      <InteractionMarkers />
    </group>
  );
}

function LabShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <boxGeometry args={[17.2, 0.08, 18]} />
        <meshStandardMaterial color="#66737b" roughness={0.86} />
      </mesh>
      <mesh receiveShadow position={[0, 2.45, -8.9]}>
        <boxGeometry args={[17.2, 4.9, 0.12]} />
        <meshStandardMaterial color="#e8eef0" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[-8.6, 2.45, 0]}>
        <boxGeometry args={[0.12, 4.9, 18]} />
        <meshStandardMaterial color="#f0f3f5" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[8.6, 2.45, 0]}>
        <boxGeometry args={[0.12, 4.9, 18]} />
        <meshStandardMaterial color="#f0f3f5" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[0, 4.92, 0]}>
        <boxGeometry args={[17.2, 0.12, 18]} />
        <meshStandardMaterial color="#fafafa" roughness={0.94} />
      </mesh>
      <mesh position={[0, 4.76, 0]}>
        <boxGeometry args={[1.2, 0.08, 15.2]} />
        <meshStandardMaterial color="#d7fbff" emissive="#87e8f4" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function LabBenches() {
  return (
    <group>
      {[[-2.2, -1.6], [2.2, -1.6], [-2.2, 2.2], [2.2, 2.2]].map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
            <boxGeometry args={[2.9, 0.24, 1.2]} />
            <meshStandardMaterial color="#d8e0e3" roughness={0.6} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
            <boxGeometry args={[2.7, 0.72, 0.95]} />
            <meshStandardMaterial color="#8b98a3" roughness={0.76} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function UserDesk() {
  return (
    <group position={[-5.6, 0, 5.1]}>
      <mesh castShadow receiveShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[2.35, 0.2, 1.1]} />
        <meshStandardMaterial color="#6d513c" roughness={0.76} />
      </mesh>
      <mesh castShadow position={[-0.44, 0.78, -0.1]}>
        <boxGeometry args={[0.58, 0.05, 0.74]} />
        <meshStandardMaterial color="#f4f0d9" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0.55, 0.86, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.5]} />
        <meshStandardMaterial color="#101820" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Instruments() {
  return (
    <group>
      <group position={[-3.9, 0, -5.4]}>
        <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 0.72, 28]} />
          <meshStandardMaterial color="#d7dde2" roughness={0.42} />
        </mesh>
        <mesh castShadow position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.16, 28]} />
          <meshStandardMaterial color="#8fa2af" roughness={0.38} />
        </mesh>
      </group>
      <group position={[5.0, 0, -5.0]}>
        <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
          <boxGeometry args={[1.1, 0.28, 0.8]} />
          <meshStandardMaterial color="#f0f3f5" roughness={0.5} />
        </mesh>
        <mesh castShadow position={[0, 1.12, -0.08]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
          <meshStandardMaterial color="#263947" roughness={0.44} />
        </mesh>
        <mesh castShadow position={[0.2, 1.55, -0.08]}>
          <boxGeometry args={[0.62, 0.18, 0.28]} />
          <meshStandardMaterial color="#263947" roughness={0.44} />
        </mesh>
      </group>
      <group position={[3.8, 0, -2.7]}>
        <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
          <boxGeometry args={[1.6, 0.34, 1.0]} />
          <meshStandardMaterial color="#c7d9e8" roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.89, 0]}>
          <boxGeometry args={[1.25, 0.08, 0.68]} />
          <meshStandardMaterial color="#7cd1ef" transparent opacity={0.78} roughness={0.22} />
        </mesh>
      </group>
    </group>
  );
}

function ChemicalShelf() {
  return (
    <group position={[7.4, 0, 2.6]}>
      <mesh castShadow receiveShadow position={[0, 1.35, 0]}>
        <boxGeometry args={[1.3, 2.7, 0.52]} />
        <meshStandardMaterial color="#6d7b85" roughness={0.72} />
      </mesh>
      {[0.65, 1.25, 1.85].map((y) => (
        <mesh key={y} position={[0, y, -0.3]}>
          <boxGeometry args={[1.1, 0.08, 0.18]} />
          <meshStandardMaterial color="#dfe6ea" roughness={0.5} />
        </mesh>
      ))}
      {[-0.32, 0, 0.32].map((x) => (
        <mesh key={x} castShadow position={[x, 1.05, -0.16]}>
          <cylinderGeometry args={[0.07, 0.07, 0.36, 12]} />
          <meshStandardMaterial color={x === 0 ? '#ef8f6b' : '#8bd3dd'} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function LabNPCs() {
  return (
    <group>
      <NPCStudent position={[-6.1, 0, -3.6]} color="#8bd3dd" />
      <NPCStudent position={[0.4, 0, -5.2]} color="#b998ff" walkAxis="x" walkRange={1.2} speed={0.55} />
      <NPCStudent position={[5.7, 0, 1.8]} color="#f28f8f" />
    </group>
  );
}

function InteractionMarkers() {
  return (
    <group>
      {labZone.interactions.map((interaction) => (
        <mesh
          key={interaction.id}
          position={[interaction.position.x, 0.018, interaction.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.58, 0.66, 42]} />
          <meshBasicMaterial color="#75e6da" transparent opacity={0.56} />
        </mesh>
      ))}
    </group>
  );
}

