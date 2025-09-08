"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Torus, MeshDistortMaterial, Float, Ring } from "@react-three/drei"
import type * as THREE from "three"

export default function ContactPortal3D() {
  const portalRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.x = state.clock.elapsedTime * 0.5
      portalRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.8
    }
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Main Portal */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Torus ref={portalRef} args={[2, 0.3, 16, 100]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.8}
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </Torus>
      </Float>

      {/* Outer Ring */}
      <Ring ref={ringRef} args={[2.5, 3, 32]} position={[0, 0, -0.5]}>
        <MeshDistortMaterial
          color="#ec4899"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
          emissive="#ec4899"
          emissiveIntensity={0.3}
        />
      </Ring>

      {/* Inner Energy Core */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[0.8, 0.1, 8, 50]} position={[0, 0, 0.5]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.8}
            speed={5}
            roughness={0}
            metalness={1}
            transparent
            opacity={1}
            emissive="#06b6d4"
            emissiveIntensity={0.8}
          />
        </Torus>
      </Float>

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.5} floatIntensity={2}>
          <mesh position={[Math.cos(i * 0.5) * 4, Math.sin(i * 0.3) * 3, Math.sin(i * 0.8) * 2]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#4ecdc4" : "#45b7d1"}
              emissive={i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#4ecdc4" : "#45b7d1"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
