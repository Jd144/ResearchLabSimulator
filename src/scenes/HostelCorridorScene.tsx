import { worldZones } from '../data/world';
import { NPCStudent } from './NPCStudent';

const corridorZone = worldZones['hostel-corridor'];

export function HostelCorridorScene() {
  return (
    <group>
      <CorridorShell />
      <RoomDoors />
      <NoticeBoard />
      <StairsArea />
      <LiftDoor />
      <CorridorNPCs />
      <InteractionMarkers />
    </group>
  );
}

function CorridorShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <boxGeometry args={[7.4, 0.08, 17.2]} />
        <meshStandardMaterial color="#56616f" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[-3.7, 2.2, 0]}>
        <boxGeometry args={[0.12, 4.4, 17.2]} />
        <meshStandardMaterial color="#dfe5e8" roughness={0.86} />
      </mesh>
      <mesh receiveShadow position={[3.7, 2.2, 0]}>
        <boxGeometry args={[0.12, 4.4, 17.2]} />
        <meshStandardMaterial color="#dfe5e8" roughness={0.86} />
      </mesh>
      <mesh receiveShadow position={[0, 4.42, 0]}>
        <boxGeometry args={[7.4, 0.12, 17.2]} />
        <meshStandardMaterial color="#f3f5f6" roughness={0.94} />
      </mesh>
      <mesh position={[0, 4.28, -0.3]}>
        <boxGeometry args={[1.2, 0.08, 15]} />
        <meshStandardMaterial color="#d6fbff" emissive="#7ddce8" emissiveIntensity={0.65} />
      </mesh>
    </group>
  );
}

function RoomDoors() {
  const doorPositions = [-5.6, -3.1, -0.6, 2.0, 4.6];

  return (
    <group>
      {doorPositions.map((z, index) => (
        <group key={`left-door-${z}`} position={[-3.62, 0, z]} rotation={[0, Math.PI / 2, 0]}>
          <Door color={index % 2 === 0 ? '#6f4e37' : '#5b4538'} />
        </group>
      ))}
      {doorPositions.map((z, index) => (
        <group key={`right-door-${z}`} position={[3.62, 0, z + 0.7]} rotation={[0, -Math.PI / 2, 0]}>
          <Door color={index % 2 === 0 ? '#73513d' : '#614637'} />
        </group>
      ))}
    </group>
  );
}

function Door({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[1.05, 2.5, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.76} />
      </mesh>
      <mesh castShadow position={[0.34, 1.18, 0.08]}>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshStandardMaterial color="#e0b75c" metalness={0.45} roughness={0.32} />
      </mesh>
    </group>
  );
}

function NoticeBoard() {
  const notice = corridorZone.interactions.find((interaction) => interaction.id === 'corridor-notice-board')!;

  return (
    <group position={[notice.position.x, 0, notice.position.z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.65, 0]}>
        <boxGeometry args={[1.65, 1.08, 0.12]} />
        <meshStandardMaterial color="#31515e" roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.65, 0.07]}>
        <boxGeometry args={[1.38, 0.82, 0.035]} />
        <meshStandardMaterial color="#f2d27a" roughness={0.64} />
      </mesh>
      <mesh position={[-0.32, 1.79, 0.095]}>
        <boxGeometry args={[0.42, 0.06, 0.018]} />
        <meshStandardMaterial color="#2d3c46" roughness={0.6} />
      </mesh>
      <mesh position={[0.22, 1.6, 0.095]}>
        <boxGeometry args={[0.68, 0.05, 0.018]} />
        <meshStandardMaterial color="#2d3c46" roughness={0.6} />
      </mesh>
    </group>
  );
}

function StairsArea() {
  const stairs = corridorZone.interactions.find((interaction) => interaction.id === 'corridor-stairs')!;

  return (
    <group position={[stairs.position.x, 0, stairs.position.z]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <mesh key={index} castShadow receiveShadow position={[0, 0.08 + index * 0.08, index * -0.28]}>
          <boxGeometry args={[1.45, 0.16, 0.42]} />
          <meshStandardMaterial color="#8b98a3" roughness={0.82} />
        </mesh>
      ))}
      <mesh position={[0, 0.04, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.7, 40]} />
        <meshBasicMaterial color="#75e6da" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function LiftDoor() {
  const lift = corridorZone.interactions.find((interaction) => interaction.id === 'corridor-lift')!;

  return (
    <group position={[lift.position.x, 0, lift.position.z]}>
      <mesh castShadow receiveShadow position={[0, 1.28, 0]}>
        <boxGeometry args={[1.25, 2.56, 0.16]} />
        <meshStandardMaterial color="#9ba8b3" metalness={0.25} roughness={0.38} />
      </mesh>
      <mesh position={[0, 1.28, 0.1]}>
        <boxGeometry args={[0.04, 2.3, 0.025]} />
        <meshStandardMaterial color="#4e5a64" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.82, 1.38, 0.09]}>
        <boxGeometry args={[0.16, 0.26, 0.04]} />
        <meshStandardMaterial color="#1f2933" roughness={0.5} />
      </mesh>
    </group>
  );
}

function CorridorNPCs() {
  return (
    <group>
      <NPCStudent position={[-1.1, 0, 2.7]} color="#ef8f6b" walkAxis="z" walkRange={1.2} speed={0.7} />
      <NPCStudent position={[1.8, 0, -1.2]} color="#84d17d" />
      <NPCStudent position={[-2.0, 0, -4.0]} color="#d7a4f5" walkAxis="x" walkRange={0.8} speed={0.9} />
    </group>
  );
}

function InteractionMarkers() {
  return (
    <group>
      {corridorZone.interactions.map((interaction) => (
        <mesh
          key={interaction.id}
          position={[interaction.position.x, 0.016, interaction.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.55, 0.63, 42]} />
          <meshBasicMaterial color="#75e6da" transparent opacity={0.56} />
        </mesh>
      ))}
    </group>
  );
}

