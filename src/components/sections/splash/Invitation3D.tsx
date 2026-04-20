"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";
import { Text, Float, PerspectiveCamera } from "@react-three/drei";

export function Invitation3D() {
  const { scrollYProgress } = useScroll();
  const { camera } = useThree();
  
  // Animation ranges (0 to 1)
  // 0.0 - 0.2: Envelope scale up
  // 0.2 - 0.4: Envelope lid open
  // 0.4 - 0.6: Card slides out
  // 0.6 - 0.8: Card rotates and scales
  // 0.8 - 1.0: Camera zoom through
  
  const envelopeLidRotation = useTransform(scrollYProgress, [0.2, 0.4], [0, -Math.PI * 0.85]);
  const cardY = useTransform(scrollYProgress, [0.4, 0.6], [0, 1.5]);
  const cardZ = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const cardRotation = useTransform(scrollYProgress, [0.6, 0.8], [0, Math.PI * 2]);
  const sceneScale = useTransform(scrollYProgress, [0.0, 0.1], [0.5, 1]);
  const cameraZ = useTransform(scrollYProgress, [0.8, 1.0], [5, -2]);

  const envelopeBodyRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Group>(null);

  // Procedural Envelope Textures
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#D4AF37",
    roughness: 0.1,
    metalness: 0.8,
  }), []);

  const paperMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#F9F7F2",
    roughness: 0.8,
  }), []);

  useFrame((state, delta) => {
    if (envelopeBodyRef.current) {
      // Apply transforms from motion hooks
      // Note: we can't directly map motion values to three.js props in useFrame easily with useTransform
      // unless we use motion.group from framer-motion-3d or manual get()
    }
    
    // Smoothly interpolate camera based on scroll progress
    const targetZ = cameraZ.get();
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    
    // Update card properties manually
    if (cardRef.current) {
      cardRef.current.position.y = cardY.get();
      cardRef.current.position.z = cardZ.get();
      cardRef.current.rotation.y = cardRotation.get();
    }
  });

  return (
    <group scale={[sceneScale.get(), sceneScale.get(), sceneScale.get()]}>
      {/* Envelope Body */}
      <group position={[0, -0.5, 0]}>
        {/* Front Bottom */}
        <mesh position={[0, 0, 0.01]} material={goldMaterial}>
          <planeGeometry args={[3, 2]} />
        </mesh>
        
        {/* Back */}
        <mesh position={[0, 0, -0.01]} material={goldMaterial}>
          <planeGeometry args={[3, 2]} />
        </mesh>

        {/* Envelope Lid */}
        <group position={[0, 1, 0]} rotation={[envelopeLidRotation.get(), 0, 0]}>
           <mesh position={[0, 0.5, 0]} material={goldMaterial}>
             <planeGeometry args={[3, 1]} />
           </mesh>
        </group>

        {/* The Invitation Card */}
        <group ref={cardRef} position={[0, 0, 0]}>
          <mesh material={paperMaterial}>
             <boxGeometry args={[2.8, 1.8, 0.05]} />
          </mesh>
          <Text
            position={[0, 0.2, 0.03]}
            fontSize={0.2}
            color="#D4AF37"
          >
            Asif & Hiba
          </Text>
          <Text
             position={[0, -0.1, 0.03]}
             fontSize={0.1}
             color="#1a1a1a"
          >
            SAVE THE DATE
          </Text>
          <Text
             position={[0, -0.3, 0.03]}
             fontSize={0.08}
             color="#1a1a1a"
          >
            16.05.2026
          </Text>
        </group>
      </group>

      {/* Background Particles/Gold Dust */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}
