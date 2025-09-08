"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import type * as THREE from "three"

const codeSnippets = [
  "const magic = () => {",
  "  return impossible();",
  "}",
  "AI.integrate(creativity)",
  "3D.render(dreams)",
  "innovation.push(limits)",
]

export default function FloatingCode() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {codeSnippets.map((code, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[-4 + Math.cos(index * 1.2) * 3, 2 - index * 0.8, Math.sin(index * 1.2) * 2]}
            fontSize={0.3}
            color="#45b7d1"
            anchorX="center"
            anchorY="middle"
            font="/fonts/GeistMono-Regular.ttf"
          >
            {code}
          </Text>
        </Float>
      ))}
    </group>
  )
}
