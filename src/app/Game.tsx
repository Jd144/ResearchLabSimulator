import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { CampusGroundScene } from '../scenes/CampusGroundScene';
import { DepartmentLobbyScene } from '../scenes/DepartmentLobbyScene';
import { HostelCorridorScene } from '../scenes/HostelCorridorScene';
import { HostelRoomScene } from '../scenes/HostelRoomScene';
import { LabFloorCorridorScene } from '../scenes/LabFloorCorridorScene';
import { MolecularBiologyLabScene } from '../scenes/MolecularBiologyLabScene';
import { PlayerController } from '../player/PlayerController';
import type { WorldZone } from '../data/world';
import type { LabRuntimeState } from '../features/experiments/labRuntimeTypes';
import type { PlayerPosition } from '../player/playerTypes';

type GameProps = {
  currentZone: WorldZone;
  labRuntime: LabRuntimeState;
  onPlayerMove: (position: PlayerPosition) => void;
};

export function Game({ currentZone, labRuntime, onPlayerMove }: GameProps) {
  return (
    <Canvas shadows camera={{ position: [0, 4, 7], fov: 55 }}>
      <color attach="background" args={['#101820']} />
      <fog attach="fog" args={['#101820', 18, 38]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        position={[5, 8, 5]}
        intensity={1.4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Sky sunPosition={[6, 8, 2]} turbidity={5} rayleigh={1.5} />
      <ActiveScene zoneId={currentZone.id} labRuntime={labRuntime} />
      <PlayerController
        bounds={currentZone.bounds}
        spawnPoint={currentZone.spawnPoint}
        zoneId={currentZone.id}
        onMove={onPlayerMove}
      />
    </Canvas>
  );
}

function ActiveScene({
  zoneId,
  labRuntime,
}: {
  zoneId: WorldZone['id'];
  labRuntime: LabRuntimeState;
}) {
  if (zoneId === 'hostel-corridor') {
    return <HostelCorridorScene />;
  }

  if (zoneId === 'campus-ground') {
    return <CampusGroundScene />;
  }

  if (zoneId === 'department-lobby') {
    return <DepartmentLobbyScene />;
  }

  if (zoneId === 'lab-floor-corridor') {
    return <LabFloorCorridorScene />;
  }

  if (zoneId === 'molecular-biology-lab') {
    return <MolecularBiologyLabScene centrifugeRunning={labRuntime.centrifuge.isRunning} />;
  }

  return <HostelRoomScene />;
}
