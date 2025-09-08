"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

export default function QuantumParticles() {
  const ref = useRef<THREE.Points>(null)
  const { mouse, viewport } = useThree()

  const [positions, colors] = useMemo(() => {
    const particleCount = 3000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Create quantum field distribution
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Quantum color distribution
      const colorIntensity = Math.random()
      colors[i * 3] = colorIntensity * (0.5 + Math.sin(i * 0.1) * 0.5) // R
      colors[i * 3 + 1] = colorIntensity * (0.8 + Math.cos(i * 0.1) * 0.2) // G
      colors[i * 3 + 2] = colorIntensity * (1.0 + Math.sin(i * 0.05) * 0.3) // B
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      // Quantum field rotation
      ref.current.rotation.x = time * 0.05
      ref.current.rotation.y = time * 0.08
      ref.current.rotation.z = time * 0.03

      // Mouse interaction
      ref.current.rotation.x += mouse.y * viewport.height * 0.00002
      ref.current.rotation.y += mouse.x * viewport.width * 0.00002

      // Quantum fluctuation - only update if geometry exists
      if (ref.current.geometry.attributes.position) {
        const positions = ref.current.geometry.attributes.position.array as Float32Array
        const originalPositions = ref.current.geometry.userData.originalPositions as Float32Array

        if (!originalPositions) {
          // Store original positions on first run
          ref.current.geometry.userData.originalPositions = new Float32Array(positions)
          return
        }

        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] = originalPositions[i + 1] + Math.sin(time + i * 0.01) * 0.1
        }
        ref.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
