"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import type * as THREE from "three"

export default function HolographicAvatar() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3

      // React to mouse movement
      meshRef.current.rotation.x += mouse.y * 0.1
      meshRef.current.rotation.y += mouse.x * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[3, 0, 0]}>
        <MeshDistortMaterial
          color="#4ecdc4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Inner core */}
      <Sphere args={[0.8, 32, 32]} position={[3, 0, 0]}>
        <MeshDistortMaterial
          color="#ff6b6b"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  )
}
