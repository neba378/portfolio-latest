"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Float } from "@react-three/drei"
import type * as THREE from "three"

interface TestimonialCard3DProps {
  position: [number, number, number]
  color: string
  isSelected: boolean
  onClick: () => void
}

export default function TestimonialCard3D({ position, color, isSelected, onClick }: TestimonialCard3DProps) {
  const cardRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = state.clock.elapsedTime * 0.5

      if (isSelected) {
        cardRef.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      } else {
        cardRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={cardRef} args={[1.5, 2, 0.1]} position={position} onClick={onClick}>
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isSelected ? 0.5 : 0.2}
          transparent
          opacity={isSelected ? 1 : 0.8}
        />
      </Box>
    </Float>
  )
}
