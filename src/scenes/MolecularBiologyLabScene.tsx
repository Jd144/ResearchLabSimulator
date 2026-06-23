import { worldZones } from '../data/world';
import { NPCStudent } from './NPCStudent';
import { useRef } from 'react';
import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ModelLoader } from '../components/three/ModelLoader';
import { pbrMaterials } from '../rendering/pbrMaterials';

const labZone = worldZones['molecular-biology-lab'];

export function MolecularBiologyLabScene({ centrifugeRunning }: { centrifugeRunning: boolean }) {
  return (
    <group>
      <LabShell />
      <LabBenches />
      <UserDesk />
      <Instruments centrifugeRunning={centrifugeRunning} />
      <ChemicalShelf />
      <WasteBin />
      <LabExitDoor />
      <LabNPCs />
      <InteractionMarkers />
    </group>
  );
}

function LabShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <boxGeometry args={[17.2, 0.08, 18]} />
        <meshStandardMaterial {...pbrMaterials.tiles} />
      </mesh>
      <mesh receiveShadow position={[0, 2.45, -8.9]}>
        <boxGeometry args={[17.2, 4.9, 0.12]} />
        <meshStandardMaterial {...pbrMaterials.paintedWalls} />
      </mesh>
      <mesh receiveShadow position={[-8.6, 2.45, 0]}>
        <boxGeometry args={[0.12, 4.9, 18]} />
        <meshStandardMaterial {...pbrMaterials.paintedWalls} />
      </mesh>
      <mesh receiveShadow position={[8.6, 2.45, 0]}>
        <boxGeometry args={[0.12, 4.9, 18]} />
        <meshStandardMaterial {...pbrMaterials.paintedWalls} />
      </mesh>
      <mesh receiveShadow position={[0, 4.92, 0]}>
        <boxGeometry args={[17.2, 0.12, 18]} />
        <meshStandardMaterial color="#fafafa" roughness={0.94} />
      </mesh>
      <mesh position={[0, 4.76, 0]}>
        <boxGeometry args={[1.2, 0.08, 15.2]} />
        <meshStandardMaterial color="#d7fbff" emissive="#87e8f4" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function LabBenches() {
  return (
    <group>
      {[[-2.2, -1.6], [2.2, -1.6], [-2.2, 2.2], [2.2, 2.2]].map(([x, z]) => (
        <ModelLoader key={`${x}-${z}`} assetId="lab-bench" position={[x, 0, z]} fallback={<LabBenchFallback />} />
      ))}
    </group>
  );
}

function UserDesk() {
  return (
    <ModelLoader assetId="user-desk" position={[-5.6, 0, 5.1]} fallback={<UserDeskFallback />} />
  );
}

function Instruments({ centrifugeRunning }: { centrifugeRunning: boolean }) {
  const centrifugeRotorRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!centrifugeRunning || !centrifugeRotorRef.current) {
      return;
    }

    centrifugeRotorRef.current.rotation.y += delta * 18;
  });

  return (
    <group>
      <ModelLoader
        assetId="centrifuge"
        position={[-3.9, 0, -5.4]}
        fallback={<CentrifugeFallback centrifugeRotorRef={centrifugeRotorRef} running={centrifugeRunning} />}
      />
      <ModelLoader assetId="microscope" position={[5.0, 0, -5.0]} fallback={<MicroscopeFallback />} />
      <ModelLoader assetId="gel-electrophoresis-unit" position={[3.8, 0, -2.7]} fallback={<GelUnitFallback />} />
    </group>
  );
}

function CentrifugeFallback({
  centrifugeRotorRef,
  running,
}: {
  centrifugeRotorRef: RefObject<THREE.Group>;
  running: boolean;
}) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[1.25, 0.28, 0.95]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} color="#2d3640" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.62, 0.72, 0.7, 44]} />
        <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.31, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.1, 44]} />
        <meshStandardMaterial {...pbrMaterials.glass} color="#d8f4ff" opacity={0.58} />
      </mesh>
      <mesh castShadow position={[0.46, 0.88, 0.48]}>
        <boxGeometry args={[0.42, 0.2, 0.04]} />
        <meshStandardMaterial color="#111827" roughness={0.38} />
      </mesh>
      {[-0.38, -0.22, -0.06].map((x) => (
        <mesh key={x} castShadow position={[x, 0.88, 0.5]}>
          <cylinderGeometry args={[0.035, 0.035, 0.035, 14]} />
          <meshStandardMaterial color="#75e6da" emissive="#2c8f89" emissiveIntensity={0.35} />
        </mesh>
      ))}
        <group ref={centrifugeRotorRef} position={[0, 1.19, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.46, 0.46, 0.12, 36]} />
            <meshStandardMaterial color={running ? '#75e6da' : '#8fa2af'} metalness={0.16} roughness={0.26} />
          </mesh>
          <mesh castShadow position={[0.22, 0.1, 0]}>
            <boxGeometry args={[0.38, 0.06, 0.08]} />
            <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
          </mesh>
          <mesh castShadow position={[-0.22, 0.1, 0]}>
            <boxGeometry args={[0.38, 0.06, 0.08]} />
            <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
          </mesh>
        </group>
    </group>
  );
}

function ChemicalShelf() {
  return (
    <ModelLoader assetId="chemical-shelf" position={[7.4, 0, 2.6]} fallback={<ChemicalShelfFallback />} />
  );
}

function ChemicalShelfFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.35, 0]}>
        <boxGeometry args={[1.45, 2.7, 0.56]} />
        <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.38, 1.35, 0.3]}>
        <boxGeometry args={[0.6, 2.28, 0.05]} />
        <meshStandardMaterial {...pbrMaterials.glass} opacity={0.38} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.38, 1.35, 0.3]}>
        <boxGeometry args={[0.6, 2.28, 0.05]} />
        <meshStandardMaterial {...pbrMaterials.glass} opacity={0.38} />
      </mesh>
      <mesh castShadow position={[0, 1.35, 0.34]}>
        <boxGeometry args={[0.04, 2.36, 0.06]} />
        <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
      </mesh>
      {[0.65, 1.25, 1.85].map((y) => (
        <mesh key={y} position={[0, y, 0.02]}>
          <boxGeometry args={[1.18, 0.06, 0.42]} />
          <meshStandardMaterial {...pbrMaterials.glass} opacity={0.5} />
        </mesh>
      ))}
      {[-0.32, 0, 0.32].map((x) => (
        <mesh key={x} castShadow position={[x, 1.05, -0.16]}>
          <cylinderGeometry args={[0.07, 0.07, 0.42, 16]} />
          <meshStandardMaterial color={x === 0 ? '#ef8f6b' : '#8bd3dd'} roughness={0.24} transparent opacity={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function WasteBin() {
  return (
    <ModelLoader assetId="waste-bin" position={[-7.1, 0, -1.2]} fallback={<WasteBinFallback />} />
  );
}

function WasteBinFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.34, 0.42, 0.9, 18]} />
        <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} color="#2f3a42" />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <torusGeometry args={[0.34, 0.035, 8, 18]} />
        <meshStandardMaterial color="#d9e2e7" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.18]} />
        <meshStandardMaterial color="#ffb454" roughness={0.42} />
      </mesh>
    </group>
  );
}

function LabExitDoor() {
  return (
    <ModelLoader assetId="lab-door" position={[0, 0, 8.76]} fallback={<LabExitDoorFallback />} />
  );
}

function LabExitDoorFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.35, 0]}>
        <boxGeometry args={[1.55, 2.7, 0.16]} />
        <meshStandardMaterial {...pbrMaterials.wood} />
      </mesh>
      <mesh castShadow position={[0.5, 1.22, -0.1]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#e0b75c" metalness={0.45} roughness={0.32} />
      </mesh>
    </group>
  );
}

function LabBenchFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[3.0, 0.16, 1.25]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} color="#14191f" />
      </mesh>
      {[[-1.25, -0.48], [1.25, -0.48], [-1.25, 0.48], [1.25, 0.48]].map(([x, z]) => (
        <mesh key={`${x}-${z}`} castShadow receiveShadow position={[x, 0.34, z]}>
          <cylinderGeometry args={[0.055, 0.055, 0.68, 14]} />
          <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
        </mesh>
      ))}
      <mesh castShadow receiveShadow position={[0, 0.24, 0]}>
        <boxGeometry args={[2.55, 0.1, 0.85]} />
        <meshStandardMaterial {...pbrMaterials.stainlessSteel} color="#aebbc2" />
      </mesh>
    </group>
  );
}

function UserDeskFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[2.35, 0.2, 1.1]} />
        <meshStandardMaterial {...pbrMaterials.wood} />
      </mesh>
      <mesh castShadow position={[-0.44, 0.78, -0.1]}>
        <boxGeometry args={[0.58, 0.05, 0.74]} />
        <meshStandardMaterial color="#f4f0d9" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0.55, 0.86, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.5]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
      <ModelLoader assetId="lab-chair" position={[0, 0, 1.05]} fallback={<LabChairFallback />} />
    </group>
  );
}

function LabChairFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.52, 0]}>
        <boxGeometry args={[0.65, 0.16, 0.65]} />
        <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} color="#44515f" />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.0, 0.28]}>
        <boxGeometry args={[0.65, 0.8, 0.12]} />
        <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} color="#44515f" />
      </mesh>
      <mesh castShadow position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
        <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
      </mesh>
    </group>
  );
}

function MicroscopeFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
        <boxGeometry args={[1.1, 0.28, 0.8]} />
        <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} />
      </mesh>
      <mesh castShadow position={[-0.12, 1.1, -0.05]} rotation={[0, 0, -0.22]}>
        <cylinderGeometry args={[0.12, 0.16, 0.85, 18]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
      <mesh castShadow position={[0.26, 1.52, -0.08]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.72, 0.18, 0.28]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
      <mesh castShadow position={[0.46, 1.68, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.34, 18]} />
        <meshStandardMaterial {...pbrMaterials.glass} />
      </mesh>
      <mesh castShadow position={[0.1, 0.88, 0.02]}>
        <boxGeometry args={[0.58, 0.06, 0.46]} />
        <meshStandardMaterial {...pbrMaterials.stainlessSteel} />
      </mesh>
      {[-0.12, 0.05, 0.22].map((x) => (
        <mesh key={x} castShadow position={[x, 1.28, -0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.22, 14]} />
          <meshStandardMaterial {...pbrMaterials.glass} />
        </mesh>
      ))}
    </group>
  );
}

function GelUnitFallback() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
        <boxGeometry args={[1.72, 0.28, 1.04]} />
        <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} color="#c7d9e8" />
      </mesh>
      <mesh position={[0, 0.89, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.7]} />
        <meshStandardMaterial {...pbrMaterials.glass} color="#7cd1ef" opacity={0.72} />
      </mesh>
      <mesh castShadow position={[0.84, 0.82, 0]}>
        <boxGeometry args={[0.12, 0.24, 0.74]} />
        <meshStandardMaterial {...pbrMaterials.blackRubber} />
      </mesh>
      <mesh castShadow position={[-0.84, 0.82, 0]}>
        <boxGeometry args={[0.12, 0.24, 0.74]} />
        <meshStandardMaterial color="#c94f4f" metalness={0.12} roughness={0.36} />
      </mesh>
      {[-0.36, -0.18, 0, 0.18, 0.36].map((x) => (
        <mesh key={x} castShadow position={[x, 0.96, -0.18]}>
          <boxGeometry args={[0.045, 0.16, 0.46]} />
          <meshStandardMaterial {...pbrMaterials.laboratoryPlastic} color="#f1f5f7" />
        </mesh>
      ))}
    </group>
  );
}

function LabNPCs() {
  return (
    <group>
      <NPCStudent position={[-6.1, 0, -3.6]} color="#8bd3dd" />
      <NPCStudent position={[0.4, 0, -5.2]} color="#b998ff" walkAxis="x" walkRange={1.2} speed={0.55} />
      <NPCStudent position={[5.7, 0, 1.8]} color="#f28f8f" />
    </group>
  );
}

function InteractionMarkers() {
  return (
    <group>
      {labZone.interactions.map((interaction) => (
        <mesh
          key={interaction.id}
          position={[interaction.position.x, 0.018, interaction.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.58, 0.66, 42]} />
          <meshBasicMaterial color="#75e6da" transparent opacity={0.56} />
        </mesh>
      ))}
    </group>
  );
}
