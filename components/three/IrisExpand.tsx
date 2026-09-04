'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function IrisMesh({ scrollProgress }: { scrollProgress: number }) {
  const irisRef = useRef<THREE.Group>(null);
  const pupilRef = useRef<THREE.Mesh>(null);
  const glareRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!irisRef.current) return;
    const t = clock.getElapsedTime();

    // Subtle idle pulsing
    const pulse = 1 + Math.sin(t * 0.8) * 0.02;
    const scale = (0.4 + scrollProgress * 2.8) * pulse;
    irisRef.current.scale.setScalar(scale);

    // Subtle rotation
    irisRef.current.rotation.z = t * 0.05;

    // Pupil dilation with scroll
    if (pupilRef.current) {
      pupilRef.current.scale.setScalar(0.3 + scrollProgress * 0.4);
    }

    // Glare shimmer
    if (glareRef.current) {
      const mat = glareRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.6 + Math.sin(t * 1.2) * 0.1;
    }
  });

  const irisColor = '#8B6914';
  const irisLight = '#C9A84C';

  return (
    <group ref={irisRef}>
      {/* Outer iris ring */}
      <mesh>
        <ringGeometry args={[0.85, 1.0, 64]} />
        <meshStandardMaterial color="#1a0f00" side={THREE.DoubleSide} />
      </mesh>

      {/* Iris base */}
      <mesh>
        <circleGeometry args={[0.85, 64]} />
        <meshStandardMaterial color={irisColor} />
      </mesh>

      {/* Iris texture rings */}
      {[0.75, 0.6, 0.45].map((r, i) => (
        <mesh key={i} rotation-z={(i * Math.PI) / 3}>
          <ringGeometry args={[r - 0.12, r, 48, 1, 0, Math.PI * 2]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#6B4E10' : '#A07818'}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Radial lines effect */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh key={`line-${i}`} rotation-z={angle}>
            <planeGeometry args={[0.01, 0.7]} />
            <meshStandardMaterial
              color={irisLight}
              transparent
              opacity={0.15}
            />
          </mesh>
        );
      })}

      {/* Pupil */}
      <mesh ref={pupilRef}>
        <circleGeometry args={[0.28, 64]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Cornea reflection */}
      <mesh ref={glareRef} position={[0.15, 0.2, 0.01]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Small secondary glare */}
      <mesh position={[-0.1, -0.15, 0.01]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 3]} intensity={1.5} color="#C9A84C" />
      <pointLight position={[-2, -1, 2]} intensity={0.8} color="#ffffff" />
      <IrisMesh scrollProgress={scrollProgress} />
    </>
  );
}

export default function IrisExpand({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
