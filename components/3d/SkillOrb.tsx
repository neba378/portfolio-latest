"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface SkillOrbProps {
  position: [number, number, number]
  color: string
  isSelected: boolean
  onClick: () => void
}

export default function SkillOrb({ position, color, isSelected, onClick }: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { raycaster, mouse, camera, scene } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4

      if (isSelected) {
        meshRef.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event: THREE.Event) => {
    event.stopPropagation()
    onClick()
  }

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]} position={position} onClick={handleClick}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={isSelected ? 0.6 : 0.3}
        speed={isSelected ? 3 : 1}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={isSelected ? 1 : 0.8}
        emissive={color}
        emissiveIntensity={isSelected ? 0.3 : 0.1}
      />
    </Sphere>
  )
}
