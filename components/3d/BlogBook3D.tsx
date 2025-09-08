"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Float } from "@react-three/drei"
import type * as THREE from "three"

interface BlogBook3DProps {
  position: [number, number, number]
  color: string
  isSelected: boolean
  onClick: () => void
}

export default function BlogBook3D({ position, color, isSelected, onClick }: BlogBook3DProps) {
  const bookRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (bookRef.current) {
      if (isSelected) {
        bookRef.current.rotation.y = state.clock.elapsedTime * 2
        bookRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      } else {
        bookRef.current.rotation.y = state.clock.elapsedTime * 0.3
        bookRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={bookRef} args={[1, 1.5, 0.2]} position={position} onClick={onClick}>
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={isSelected ? 0.4 : 0.1}
        />
      </Box>
    </Float>
  )
}
