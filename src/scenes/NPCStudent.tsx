import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type NPCStudentProps = {
  position: [number, number, number];
  color?: string;
  walkAxis?: 'x' | 'z';
  walkRange?: number;
  speed?: number;
};

export function NPCStudent({
  position,
  color = '#5cc8ff',
  walkAxis,
  walkRange = 1.4,
  speed = 0.8,
}: NPCStudentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const startPosition = useRef(new THREE.Vector3(...position));

  useFrame(({ clock }) => {
    const group = groupRef.current;

    if (!group || !walkAxis) {
      return;
    }

    const offset = Math.sin(clock.elapsedTime * speed) * walkRange;
    group.position.copy(startPosition.current);
    group.position[walkAxis] += offset;
    group.rotation.y = walkAxis === 'z' ? (offset > 0 ? 0 : Math.PI) : (offset > 0 ? Math.PI / 2 : -Math.PI / 2);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow position={[0, 0.72, 0]}>
        <capsuleGeometry args={[0.22, 0.62, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, 1.28, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#e7b99a" roughness={0.68} />
      </mesh>
      <mesh castShadow position={[0, 1.43, 0.01]}>
        <boxGeometry args={[0.34, 0.06, 0.28]} />
        <meshStandardMaterial color="#202632" roughness={0.75} />
      </mesh>
    </group>
  );
}

