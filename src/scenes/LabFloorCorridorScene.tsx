import { worldZones } from '../data/world';
import { NPCStudent } from './NPCStudent';

const labFloorZone = worldZones['lab-floor-corridor'];

export function LabFloorCorridorScene() {
  return (
    <group>
      <CorridorShell />
      <LabDoors />
      <PIOfficeDoor />
      <Desks />
      <PPEStation />
      <LabFloorNPCs />
      <InteractionMarkers />
    </group>
  );
}

function CorridorShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <boxGeometry args={[9.6, 0.08, 20]} />
        <meshStandardMaterial color="#606e78" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[-4.8, 2.35, 0]}>
        <boxGeometry args={[0.12, 4.7, 20]} />
        <meshStandardMaterial color="#e2e8ea" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[4.8, 2.35, 0]}>
        <boxGeometry args={[0.12, 4.7, 20]} />
        <meshStandardMaterial color="#e2e8ea" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[0, 4.72, 0]}>
        <boxGeometry args={[9.6, 0.12, 20]} />
        <meshStandardMaterial color="#f6f8f9" roughness={0.94} />
      </mesh>
      <mesh position={[0, 4.58, 0]}>
        <boxGeometry args={[1.1, 0.08, 17]} />
        <meshStandardMaterial color="#c4f4ff" emissive="#7ddce8" emissiveIntensity={0.55} />
      </mesh>
    </group>
  );
}

function LabDoors() {
  const molecularLab = labFloorZone.interactions.find((interaction) => interaction.id === 'molecular-biology-lab-door')!;

  return (
    <group>
      <group position={[molecularLab.position.x, 0, molecularLab.position.z]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow position={[0, 1.35, 0]}>
          <boxGeometry args={[1.65, 2.7, 0.16]} />
          <meshStandardMaterial color="#35546a" roughness={0.62} />
        </mesh>
        <mesh position={[0, 1.9, 0.1]}>
          <boxGeometry args={[1.05, 0.22, 0.04]} />
          <meshStandardMaterial color="#e8f1f2" roughness={0.4} />
        </mesh>
        <mesh position={[0.44, 1.2, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#e0b75c" metalness={0.45} roughness={0.32} />
        </mesh>
      </group>
      {[1.2, -1.4].map((z, index) => (
        <group key={z} position={[4.72, 0, z]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh castShadow receiveShadow position={[0, 1.28, 0]}>
            <boxGeometry args={[1.3, 2.56, 0.14]} />
            <meshStandardMaterial color={index === 0 ? '#5b6f7b' : '#56636c'} roughness={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PIOfficeDoor() {
  const office = labFloorZone.interactions.find((interaction) => interaction.id === 'pi-office-door')!;

  return (
    <group position={[office.position.x, 0, office.position.z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[1.22, 2.5, 0.14]} />
        <meshStandardMaterial color="#644b3a" roughness={0.74} />
      </mesh>
      <mesh position={[0, 1.82, 0.09]}>
        <boxGeometry args={[0.72, 0.18, 0.035]} />
        <meshStandardMaterial color="#f1efe8" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Desks() {
  return (
    <group>
      {[-1.6, 1.4].map((z, index) => (
        <group key={z} position={[-2.6, 0, z]}>
          <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
            <boxGeometry args={[1.7, 0.18, 0.95]} />
            <meshStandardMaterial color="#6b4f3a" roughness={0.78} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.4, 0.94, 0]}>
            <boxGeometry args={[0.46, 0.78, 0.46]} />
            <meshStandardMaterial color={index === 0 ? '#44515f' : '#4a5964'} roughness={0.75} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PPEStation() {
  const ppe = labFloorZone.interactions.find((interaction) => interaction.id === 'ppe-station')!;

  return (
    <group position={[ppe.position.x, 0, ppe.position.z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.15, 0]}>
        <boxGeometry args={[1.35, 2.3, 0.2]} />
        <meshStandardMaterial color="#e8edf0" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[-0.34, 1.35, 0.15]}>
        <boxGeometry args={[0.36, 0.82, 0.08]} />
        <meshStandardMaterial color="#ffffff" roughness={0.54} />
      </mesh>
      <mesh castShadow position={[0.2, 1.22, 0.15]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#74d2e7" roughness={0.36} />
      </mesh>
      <mesh castShadow position={[0.52, 0.88, 0.15]}>
        <boxGeometry args={[0.28, 0.18, 0.08]} />
        <meshStandardMaterial color="#8fd19e" roughness={0.42} />
      </mesh>
    </group>
  );
}

function LabFloorNPCs() {
  return (
    <group>
      <NPCStudent position={[0.9, 0, 2.7]} color="#b998ff" walkAxis="z" walkRange={1.3} speed={0.55} />
      <NPCStudent position={[-1.7, 0, -2.6]} color="#f28f8f" />
    </group>
  );
}

function InteractionMarkers() {
  return (
    <group>
      {labFloorZone.interactions.map((interaction) => (
        <mesh
          key={interaction.id}
          position={[interaction.position.x, 0.018, interaction.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.58, 0.66, 42]} />
          <meshBasicMaterial color={interaction.type === 'ppe-station' ? '#9cf6b7' : '#75e6da'} transparent opacity={0.62} />
        </mesh>
      ))}
    </group>
  );
}

