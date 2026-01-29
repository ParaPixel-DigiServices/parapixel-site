'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';

function SmoothBlob({ position, color, speed = 1, scale = 1 }) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth rotation
    mesh.current.rotation.x = t * 0.2 * speed;
    mesh.current.rotation.y = t * 0.3 * speed;
    
    // Mouse Interaction
    const mouseX = (state.pointer.x * 5); 
    const mouseY = (state.pointer.y * 5);
    
    // Lerp with delta
    const easing = 3 * delta; 
    
    mesh.current.position.x += (position[0] - mouseX * 0.2 - mesh.current.position.x) * easing;
    mesh.current.position.y += (position[1] - mouseY * 0.2 - mesh.current.position.y) * easing;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        
        {/* CRASH FIX: Roughness at 0.2 */}
        <MeshDistortMaterial 
          color={color} 
          speed={2.5} 
          distort={0.5}
          radius={1}
          roughness={0.2} 
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1} 
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 14], fov: 40 }} 
      className="w-full h-full"
      dpr={[1, 2]} 
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 7]} intensity={2.5} />
      <Environment preset="warehouse" />

      <group>
        {/* The Liquid Trio (Your Colors) */}
        <SmoothBlob position={[-5, 2, -5]} color="#ff6b6b" speed={0.8} scale={2} />   {/* Pink */}
        <SmoothBlob position={[6, -2, -6]} color="#4ecdc4" speed={1.1} scale={2.5} /> {/* Teal */}
        <SmoothBlob position={[0, -5, -4]} color="#ffe66d" speed={0.6} scale={1.8} /> {/* Yellow */}
        
        {/* Floating background bubbles */}
        <SmoothBlob position={[-6, 6, -10]} color="#a29bfe" speed={0.4} scale={1.2} /> 
        <SmoothBlob position={[6, 5, -8]} color="#fab1a0" speed={0.4} scale={0.9} /> 
      </group>

      <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={40} blur={2} color="#000000" />
    </Canvas>
  );
}