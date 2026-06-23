import { hostelDoor } from '../data/hostelRoom';

export function HostelRoomScene() {
  return (
    <group>
      <RoomShell />
      <Furniture />
      <ExitDoor />
      <Guides />
    </group>
  );
}

function RoomShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <boxGeometry args={[9, 0.08, 9]} />
        <meshStandardMaterial color="#657786" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 2.3, -4.5]}>
        <boxGeometry args={[9, 4.6, 0.12]} />
        <meshStandardMaterial color="#dde4e8" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-4.5, 2.3, 0]}>
        <boxGeometry args={[0.12, 4.6, 9]} />
        <meshStandardMaterial color="#edf1f3" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[4.5, 2.3, 0]}>
        <boxGeometry args={[0.12, 4.6, 9]} />
        <meshStandardMaterial color="#edf1f3" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 4.6, 0]}>
        <boxGeometry args={[9, 0.12, 9]} />
        <meshStandardMaterial color="#f7f8fa" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Furniture() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[-2.7, 0.35, 1.8]}>
        <boxGeometry args={[2.5, 0.35, 1.35]} />
        <meshStandardMaterial color="#8aa0af" roughness={0.72} />
      </mesh>
      <mesh castShadow receiveShadow position={[-2.7, 0.75, 1.8]}>
        <boxGeometry args={[2.25, 0.22, 1.12]} />
        <meshStandardMaterial color="#d7eef8" roughness={0.5} />
      </mesh>
      <mesh castShadow receiveShadow position={[2.65, 0.55, 1.9]}>
        <boxGeometry args={[1.8, 0.18, 1.05]} />
        <meshStandardMaterial color="#6b4f3a" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[2.65, 0.95, 1.9]}>
        <boxGeometry args={[0.8, 0.08, 0.56]} />
        <meshStandardMaterial color="#1e293b" roughness={0.52} />
      </mesh>
      <mesh castShadow position={[2.65, 1.16, 1.66]} rotation={[-0.55, 0, 0]}>
        <boxGeometry args={[0.82, 0.06, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.48} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.8, 0.55, -1.3]}>
        <boxGeometry args={[0.9, 1.1, 0.9]} />
        <meshStandardMaterial color="#44515f" roughness={0.75} />
      </mesh>
      <mesh castShadow receiveShadow position={[-3.75, 1.15, -1.7]}>
        <boxGeometry args={[0.9, 2.3, 1.4]} />
        <meshStandardMaterial color="#9a6b4f" roughness={0.82} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.06, 0.1]}>
        <boxGeometry args={[2.2, 0.04, 1.4]} />
        <meshStandardMaterial color="#23414f" roughness={0.9} />
      </mesh>
    </group>
  );
}

function ExitDoor() {
  return (
    <group position={[hostelDoor.position.x, 0, hostelDoor.position.z]}>
      <mesh castShadow receiveShadow position={[0, 1.3, 0]}>
        <boxGeometry args={[1.35, 2.6, 0.16]} />
        <meshStandardMaterial color="#5d4037" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0.48, 1.2, 0.11]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#e6b84f" metalness={0.45} roughness={0.28} />
      </mesh>
    </group>
  );
}

function Guides() {
  return (
    <group>
      <mesh position={[0, 0.012, -3.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75, 0.82, 48]} />
        <meshBasicMaterial color="#75e6da" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

