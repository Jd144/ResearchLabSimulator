import { worldZones } from '../data/world';
import { NPCStudent } from './NPCStudent';

const campusZone = worldZones['campus-ground'];

export function CampusGroundScene() {
  return (
    <group>
      <Ground />
      <Pathway />
      <Trees />
      <DepartmentBuilding />
      <CampusNPCs />
      <DepartmentMarker />
    </group>
  );
}

function Ground() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[22, 0.08, 26]} />
        <meshStandardMaterial color="#516d55" roughness={0.94} />
      </mesh>
      <mesh receiveShadow position={[0, 0.002, 0]}>
        <boxGeometry args={[7.2, 0.025, 23]} />
        <meshStandardMaterial color="#7c8583" roughness={0.86} />
      </mesh>
    </group>
  );
}

function Pathway() {
  return (
    <group>
      {[-6, -2, 2, 6].map((z) => (
        <mesh key={z} receiveShadow position={[0, 0.025, z]}>
          <boxGeometry args={[6.8, 0.025, 0.12]} />
          <meshStandardMaterial color="#aab3ae" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Trees() {
  const trees: Array<[number, number, number]> = [
    [-7.2, 0, 5.8],
    [7.6, 0, 4.7],
    [-8.1, 0, -1.6],
    [8.0, 0, -3.7],
    [-6.8, 0, -8.2],
    [6.5, 0, -8.6],
  ];

  return (
    <group>
      {trees.map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]}>
          <mesh castShadow position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.16, 0.22, 1.3, 12]} />
            <meshStandardMaterial color="#6c4b32" roughness={0.86} />
          </mesh>
          <mesh castShadow position={[0, 1.55, 0]}>
            <sphereGeometry args={[0.82, 18, 18]} />
            <meshStandardMaterial color="#2d7a4e" roughness={0.78} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DepartmentBuilding() {
  return (
    <group position={[0, 0, -12]}>
      <mesh castShadow receiveShadow position={[0, 2.1, 0]}>
        <boxGeometry args={[8.5, 4.2, 1.5]} />
        <meshStandardMaterial color="#d8dee4" roughness={0.8} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 4.45, 0]}>
        <boxGeometry args={[9.2, 0.38, 1.9]} />
        <meshStandardMaterial color="#7a8794" roughness={0.72} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.1, 0.82]}>
        <boxGeometry args={[1.35, 2.2, 0.12]} />
        <meshStandardMaterial color="#344b5a" roughness={0.48} />
      </mesh>
      {[-3, -1.5, 1.5, 3].map((x) => (
        <mesh key={x} position={[x, 2.55, 0.82]}>
          <boxGeometry args={[0.82, 0.72, 0.08]} />
          <meshStandardMaterial color="#88b7c8" metalness={0.1} roughness={0.36} />
        </mesh>
      ))}
      <mesh position={[0, 4.85, 0.86]}>
        <boxGeometry args={[4.4, 0.34, 0.08]} />
        <meshStandardMaterial color="#263947" roughness={0.58} />
      </mesh>
    </group>
  );
}

function CampusNPCs() {
  return (
    <group>
      <NPCStudent position={[-2.1, 0, 3.5]} color="#f6c85f" walkAxis="z" walkRange={2.2} speed={0.45} />
      <NPCStudent position={[2.7, 0, 0.5]} color="#72b7f2" walkAxis="z" walkRange={1.7} speed={0.55} />
      <NPCStudent position={[-4.2, 0, -5.8]} color="#f48fb1" />
    </group>
  );
}

function DepartmentMarker() {
  const department = campusZone.interactions.find((interaction) => interaction.id === 'department-building-entry')!;

  return (
    <mesh
      position={[department.position.x, 0.025, department.position.z]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.86, 0.98, 48]} />
      <meshBasicMaterial color="#75e6da" transparent opacity={0.68} />
    </mesh>
  );
}

