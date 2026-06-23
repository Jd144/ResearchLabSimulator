import { worldZones } from '../data/world';
import { NPCStudent } from './NPCStudent';

const lobbyZone = worldZones['department-lobby'];

export function DepartmentLobbyScene() {
  return (
    <group>
      <LobbyShell />
      <ReceptionDesk />
      <NoticeBoard />
      <FacultyOfficeDoors />
      <VerticalTransport />
      <LobbyNPCs />
      <InteractionMarkers />
    </group>
  );
}

function LobbyShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <boxGeometry args={[16, 0.08, 16]} />
        <meshStandardMaterial color="#697782" roughness={0.86} />
      </mesh>
      <mesh receiveShadow position={[0, 2.4, -7.8]}>
        <boxGeometry args={[16, 4.8, 0.12]} />
        <meshStandardMaterial color="#e5eaed" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[-7.9, 2.4, 0]}>
        <boxGeometry args={[0.12, 4.8, 16]} />
        <meshStandardMaterial color="#eef2f4" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[7.9, 2.4, 0]}>
        <boxGeometry args={[0.12, 4.8, 16]} />
        <meshStandardMaterial color="#eef2f4" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[0, 4.82, 0]}>
        <boxGeometry args={[16, 0.12, 16]} />
        <meshStandardMaterial color="#f7f8f9" roughness={0.94} />
      </mesh>
      <mesh position={[0, 0.015, 3.8]}>
        <boxGeometry args={[5.8, 0.025, 5.6]} />
        <meshStandardMaterial color="#415564" roughness={0.9} />
      </mesh>
    </group>
  );
}

function ReceptionDesk() {
  const reception = lobbyZone.interactions.find((interaction) => interaction.id === 'department-reception')!;

  return (
    <group position={[reception.position.x, 0, reception.position.z]}>
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[4.2, 1.1, 1.15]} />
        <meshStandardMaterial color="#73513d" roughness={0.78} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.16, -0.2]}>
        <boxGeometry args={[4.4, 0.18, 1.3]} />
        <meshStandardMaterial color="#9d7455" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[1.45, 1.42, -0.2]}>
        <boxGeometry args={[0.86, 0.08, 0.58]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
    </group>
  );
}

function NoticeBoard() {
  const notice = lobbyZone.interactions.find((interaction) => interaction.id === 'department-notice-board')!;

  return (
    <group position={[notice.position.x, 0, notice.position.z]} rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.72, 0]}>
        <boxGeometry args={[1.9, 1.18, 0.12]} />
        <meshStandardMaterial color="#284c5a" roughness={0.74} />
      </mesh>
      <mesh position={[0, 1.72, 0.075]}>
        <boxGeometry args={[1.56, 0.88, 0.035]} />
        <meshStandardMaterial color="#f4df8a" roughness={0.62} />
      </mesh>
      {[-0.38, 0, 0.38].map((yOffset) => (
        <mesh key={yOffset} position={[0, 1.72 + yOffset, 0.1]}>
          <boxGeometry args={[1.1, 0.045, 0.018]} />
          <meshStandardMaterial color="#2b3640" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function FacultyOfficeDoors() {
  return (
    <group>
      {[-4.6, -2.2, 2.2, 4.6].map((x, index) => (
        <group key={x} position={[x, 0, -7.72]}>
          <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
            <boxGeometry args={[1.25, 2.5, 0.14]} />
            <meshStandardMaterial color={index % 2 === 0 ? '#675040' : '#5b4639'} roughness={0.75} />
          </mesh>
          <mesh castShadow position={[0.42, 1.18, 0.09]}>
            <sphereGeometry args={[0.055, 14, 14]} />
            <meshStandardMaterial color="#d9af55" metalness={0.42} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function VerticalTransport() {
  const stairs = lobbyZone.interactions.find((interaction) => interaction.id === 'department-stairs')!;
  const lift = lobbyZone.interactions.find((interaction) => interaction.id === 'department-lift')!;

  return (
    <group>
      <group position={[stairs.position.x, 0, stairs.position.z]}>
        {Array.from({ length: 5 }).map((_, index) => (
          <mesh key={index} castShadow receiveShadow position={[0, 0.08 + index * 0.08, index * -0.28]}>
            <boxGeometry args={[1.5, 0.16, 0.42]} />
            <meshStandardMaterial color="#8795a1" roughness={0.82} />
          </mesh>
        ))}
      </group>
      <group position={[lift.position.x, 0, lift.position.z]}>
        <mesh castShadow receiveShadow position={[0, 1.28, 0]}>
          <boxGeometry args={[1.35, 2.56, 0.16]} />
          <meshStandardMaterial color="#a4afb8" metalness={0.2} roughness={0.38} />
        </mesh>
        <mesh position={[0, 1.28, 0.1]}>
          <boxGeometry args={[0.04, 2.3, 0.025]} />
          <meshStandardMaterial color="#4e5a64" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function LobbyNPCs() {
  return (
    <group>
      <NPCStudent position={[2.2, 0, 1.3]} color="#8bd3dd" />
      <NPCStudent position={[-2.9, 0, 3.8]} color="#f5a65b" walkAxis="x" walkRange={0.9} speed={0.8} />
    </group>
  );
}

function InteractionMarkers() {
  return (
    <group>
      {lobbyZone.interactions.map((interaction) => (
        <mesh
          key={interaction.id}
          position={[interaction.position.x, 0.018, interaction.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.58, 0.66, 42]} />
          <meshBasicMaterial color="#75e6da" transparent opacity={0.58} />
        </mesh>
      ))}
    </group>
  );
}

