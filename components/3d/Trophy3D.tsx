"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface Trophy3DProps {
  position: [number, number, number]
  color: string
  delay: number
}

export default function Trophy3D({ position, color, delay }: Trophy3DProps) {
  const trophyRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={trophyRef} position={position}>
        {/* Trophy Base */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.6, 0.8, 0.3, 8]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
        </mesh>

        {/* Trophy Stem */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 0.8, 8]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Trophy Cup */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0} emissive={color} emissiveIntensity={0.3} />
        </mesh>

        {/* Trophy Handles */}
        <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}
