"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Float } from "@react-three/drei"
import type * as THREE from "three"

interface TimelineNodeProps {
  position: [number, number, number]
  color: string
  delay: number
  isActive: boolean
}

export default function TimelineNode({ position, color, delay, isActive }: TimelineNodeProps) {
  const nodeRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (nodeRef.current && isActive) {
      nodeRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay
      nodeRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        <Sphere ref={nodeRef} args={[0.5, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>

        {/* Connecting Lines */}
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}
