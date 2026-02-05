'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

function AnimeKnot({ position, scale, color, speed = 1 }) { 
  const mesh = useRef();
  const group = useRef();
  const [hovered, setHover] = useState(false);
  
  const [rotSpeed] = useState(() => ({
    x: Math.random() * 0.5 + 0.3,
    y: Math.random() * 0.5 + 0.3
  }));

  const targetVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (delta > 0.1) return;
    
    // 1. SPIN
    const speedMultiplier = hovered ? 15 : 1;
    if (mesh.current) {
        mesh.current.rotation.x += delta * rotSpeed.x * speed * speedMultiplier;
        mesh.current.rotation.y += delta * rotSpeed.y * speed * speedMultiplier;
        
        // Scale Bounce
        const s = hovered ? scale * 1.3 : scale;
        targetVec.set(s, s, s);
        mesh.current.scale.lerp(targetVec, 0.1);
    }

    // 2. SWAY (Magnetic)
    if (group.current) {
        const mouseX = state.pointer.x * 0.5; 
        const mouseY = state.pointer.y * 0.5;
        
        group.current.rotation.x += (mouseY - group.current.rotation.x) * 0.1;
        group.current.rotation.y += (mouseX - group.current.rotation.y) * 0.1;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={group} position={position}>
        <mesh 
          ref={mesh} 
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
        >
          <torusKnotGeometry args={[1, 0.3, 64, 8]} />
          <meshToonMaterial color={color} />
          <Edges threshold={15} color="black" scale={1.0} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 14], fov: 45 }} 
      className="w-full h-full"
      dpr={[1, 1.5]} 
      gl={{ alpha: true, antialias: true, powerPreference: "default" }}
      eventSource={typeof window !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={2.0} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={1.0} />

      <group>
        {/* 1. HERO - TOP RIGHT (Teal) */}
        <AnimeKnot position={[9, 5, -8]} color="#4ecdc4" speed={1.0} scale={2.5} /> 
        
        {/* 2. ANCHOR - BOTTOM LEFT (Pink) */}
        <AnimeKnot position={[-10, -6, -6]} color="#ff6b6b" speed={0.8} scale={2.2} /> 
        
        {/* 3. DEPTH - FAR TOP LEFT (Yellow) */}
        <AnimeKnot position={[-14, 9, -15]} color="#ffe66d" speed={0.5} scale={1.8} /> 
        
        {/* 4. ACCENT - MID RIGHT EDGE (Lavender) */}
        <AnimeKnot position={[16, -2, -12]} color="#a29bfe" speed={0.6} scale={1.5} /> 
      </group>
    </Canvas>
  );
}