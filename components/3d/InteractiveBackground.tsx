"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

export default function InteractiveBackground() {
  const ref = useRef<THREE.Points>(null)
  const { mouse, viewport } = useThree()

  const particlesPosition = useMemo(() => {
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.075

      // React to mouse movement
      ref.current.rotation.x += mouse.y * viewport.height * 0.00005
      ref.current.rotation.y += mouse.x * viewport.width * 0.00005
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#8b5cf6" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}
