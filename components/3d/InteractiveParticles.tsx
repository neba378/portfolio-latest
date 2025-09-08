"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

interface InteractiveParticlesProps {
  count: number
  speed: number
  color: string
  isPlaying: boolean
}

export default function InteractiveParticles({ count, speed, color, isPlaying }: InteractiveParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const { mouse, viewport } = useThree()

  // Memoize positions and velocities based on count
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return [positions, velocities]
  }, [count])

  useFrame((state) => {
    if (!ref.current || !isPlaying) return

    const positions = ref.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    // Only update if the array sizes match
    if (positions.length !== count * 3) return

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Mouse interaction
      const mouseInfluence = 0.1
      const dx = mouse.x * viewport.width - positions[i3]
      const dy = mouse.y * viewport.height - positions[i3 + 1]
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 3) {
        positions[i3] += dx * mouseInfluence * speed * 0.01
        positions[i3 + 1] += dy * mouseInfluence * speed * 0.01
      }

      // Natural movement
      positions[i3] += velocities[i3] * speed
      positions[i3 + 1] += velocities[i3 + 1] * speed
      positions[i3 + 2] += velocities[i3 + 2] * speed

      // Wave motion
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01 * speed

      // Boundary wrapping
      if (positions[i3] > 5) positions[i3] = -5
      if (positions[i3] < -5) positions[i3] = 5
      if (positions[i3 + 1] > 5) positions[i3 + 1] = -5
      if (positions[i3 + 1] < -5) positions[i3 + 1] = 5
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
