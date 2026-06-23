import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { HostelRoomScene } from '../scenes/HostelRoomScene';
import { PlayerController } from '../player/PlayerController';
import type { PlayerPosition } from '../player/playerTypes';

type GameProps = {
  onPlayerMove: (position: PlayerPosition) => void;
};

export function Game({ onPlayerMove }: GameProps) {
  return (
    <Canvas shadows camera={{ position: [0, 4, 7], fov: 55 }}>
      <color attach="background" args={['#101820']} />
      <fog attach="fog" args={['#101820', 15, 32]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        position={[5, 8, 5]}
        intensity={1.4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Sky sunPosition={[6, 8, 2]} turbidity={5} rayleigh={1.5} />
      <HostelRoomScene />
      <PlayerController onMove={onPlayerMove} />
    </Canvas>
  );
}
