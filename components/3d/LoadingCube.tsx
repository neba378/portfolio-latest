"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box } from "@react-three/drei"
import type * as THREE from "three"

interface LoadingCubeProps {
  progress: number
}

export default function LoadingCube({ progress }: LoadingCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.5
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.7
      cubeRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Box ref={cubeRef} args={[2, 2, 2]}>
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.8}
          roughness={0.2}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* Progress Rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (progress / 100) * Math.PI * 2 + (i * Math.PI) / 3]}>
          <torusGeometry args={[3 + i * 0.5, 0.1, 8, 32]} />
          <meshStandardMaterial
            color={i === 0 ? "#ff6b6b" : i === 1 ? "#4ecdc4" : "#45b7d1"}
            emissive={i === 0 ? "#ff6b6b" : i === 1 ? "#4ecdc4" : "#45b7d1"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}
