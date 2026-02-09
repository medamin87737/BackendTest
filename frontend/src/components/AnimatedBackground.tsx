import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { ThreeDObject } from '../types';

const FloatingCube: React.FC<ThreeDObject> = ({ position, rotationSpeed, size, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.01;
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingSphere: React.FC<ThreeDObject> = ({ position, rotationSpeed, size, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.005;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 2;
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

const ParticleSystem: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions] = React.useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 1) {
      arr[i] = (Math.random() - 0.5) * 100;
    }
    return arr;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        {/* Typage spécifique de react-three-fiber pour bufferAttribute */}
        <bufferAttribute
          attach="attributes-position"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          args={[positions as any, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#60a5fa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export const AnimatedBackground: React.FC = () => {
  const objects: ThreeDObject[] = [
    { id: '1', type: 'cube', position: [5, 2, -5], rotationSpeed: 1, size: 1.5, color: '#3b82f6' },
    { id: '2', type: 'sphere', position: [-6, 3, -8], rotationSpeed: 0.7, size: 1.8, color: '#8b5cf6' },
    { id: '3', type: 'cube', position: [8, -1, -10], rotationSpeed: 1.2, size: 1.2, color: '#10b981' },
    { id: '4', type: 'sphere', position: [-8, 1, -6], rotationSpeed: 0.9, size: 1.4, color: '#f59e0b' },
    { id: '5', type: 'cube', position: [0, 4, -12], rotationSpeed: 0.8, size: 1, color: '#ec4899' },
  ];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

        {objects.map((obj) =>
          obj.type === 'cube' ? <FloatingCube key={obj.id} {...obj} /> : <FloatingSphere key={obj.id} {...obj} />,
        )}

        <ParticleSystem />
        <Stars radius={100} depth={50} count={5000} factor={4} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <fog attach="fog" args={['#1e40af', 10, 50]} />
      </Canvas>
    </div>
  );
};