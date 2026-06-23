import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { roomBounds } from '../data/hostelRoom';
import { StudentAvatar } from './StudentAvatar';
import { useKeyboardControls } from './useKeyboardControls';
import type { PlayerPosition } from './playerTypes';

type PlayerControllerProps = {
  onMove: (position: PlayerPosition) => void;
};

const movementSpeed = 3.2;
const cameraOffset = new THREE.Vector3(0, 3.2, 5.5);

export function PlayerController({ onMove }: PlayerControllerProps) {
  const playerRef = useRef<THREE.Group>(null);
  const direction = useRef(new THREE.Vector3());
  const { camera } = useThree();
  const keys = useKeyboardControls();

  useFrame((_, delta) => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    direction.current.set(0, 0, 0);

    if (keys.forward) direction.current.z -= 1;
    if (keys.backward) direction.current.z += 1;
    if (keys.left) direction.current.x -= 1;
    if (keys.right) direction.current.x += 1;

    if (direction.current.lengthSq() > 0) {
      direction.current.normalize();
      player.position.x += direction.current.x * movementSpeed * delta;
      player.position.z += direction.current.z * movementSpeed * delta;
      player.rotation.y = Math.atan2(direction.current.x, direction.current.z);
    }

    player.position.x = THREE.MathUtils.clamp(player.position.x, roomBounds.minX, roomBounds.maxX);
    player.position.z = THREE.MathUtils.clamp(player.position.z, roomBounds.minZ, roomBounds.maxZ);

    const targetCameraPosition = player.position.clone().add(cameraOffset);
    camera.position.lerp(targetCameraPosition, 0.12);
    camera.lookAt(player.position.x, player.position.y + 1, player.position.z);

    onMove({
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
    });
  });

  return (
    <group ref={playerRef} position={[0, 0, 2]}>
      <StudentAvatar />
    </group>
  );
}
