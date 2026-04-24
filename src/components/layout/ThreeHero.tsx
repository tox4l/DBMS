"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function DatabaseNodes() {
  const group = useRef<THREE.Group>(null);
  
  // Generate random positions for nodes
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5 - 2
      ));
    }
    return temp;
  }, []);

  // Generate connection lines
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          temp.push([nodes[i], nodes[j]]);
        }
      }
    }
    return temp;
  }, [nodes]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere position={pos} args={[0.15, 16, 16]}>
            <meshStandardMaterial 
              color="#0ea5e9" 
              emissive="#0ea5e9" 
              emissiveIntensity={0.5} 
              roughness={0.2} 
              metalness={0.8} 
            />
          </Sphere>
        </Float>
      ))}
      
      {lines.map((points, i) => (
        <Line 
          key={`line-${i}`} 
          points={points as any} 
          color="#0ea5e9" 
          opacity={0.15} 
          transparent 
          lineWidth={1} 
        />
      ))}
    </group>
  );
}

export default function ThreeHero() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <DatabaseNodes />
      </Canvas>
    </div>
  );
}
