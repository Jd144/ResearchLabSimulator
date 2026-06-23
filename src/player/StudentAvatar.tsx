export function StudentAvatar() {
  return (
    <group>
      <mesh castShadow position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.32, 0.9, 8, 16]} />
        <meshStandardMaterial color="#2f80ed" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#f1c6a8" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 1.82, 0.02]}>
        <boxGeometry args={[0.46, 0.09, 0.38]} />
        <meshStandardMaterial color="#1f2933" roughness={0.7} />
      </mesh>
    </group>
  );
}

