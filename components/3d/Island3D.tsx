"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Sphere, Box } from "@react-three/drei"
import type * as THREE from "three"

interface Island3DProps {
  position: [number, number, number]
  color: string
  delay: number
}

export default function Island3D({ position, color, delay }: Island3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Main island platform */}
        <Box args={[2, 0.3, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Box>

        {/* Floating elements */}
        <Sphere args={[0.2]} position={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </Sphere>

        <Sphere args={[0.15]} position={[-0.6, 1.2, -0.4]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </Sphere>

        <Box args={[0.3, 0.3, 0.3]} position={[0.4, 1.5, -0.8]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial color={color} metalness={1} roughness={0} />
        </Box>
      </group>
    </Float>
  )
}
