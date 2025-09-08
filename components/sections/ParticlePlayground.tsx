"use client"

import { useState, useRef, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"
import InteractiveParticles from "@/components/3d/InteractiveParticles"

export default function ParticlePlayground() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [particleCount, setParticleCount] = useState(1000)
  const [speed, setSpeed] = useState(1)
  const [color, setColor] = useState("#8b5cf6")
  const [key, setKey] = useState(0) // Force re-render when count changes
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const resetPlayground = useCallback(() => {
    setParticleCount(1000)
    setSpeed(1)
    setColor("#8b5cf6")
    setIsPlaying(true)
    setKey((prev) => prev + 1) // Force re-render
  }, [])

  const handleParticleCountChange = useCallback((newCount: number) => {
    setParticleCount(newCount)
    setKey((prev) => prev + 1) // Force re-render when count changes
  }, [])

  return (
    <section id="playground" className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Particle Playground
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interact with the quantum field - move your mouse and watch the magic happen
          </p>
        </motion.div>

        {/* Interactive Controls */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </motion.button>

          <motion.button
            onClick={resetPlayground}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </motion.button>

          <motion.button
            onClick={() => handleParticleCountChange(Math.min(particleCount + 500, 3000))}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={20} />
            <span>More Particles</span>
          </motion.button>
        </motion.div>

        {/* Control Sliders */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-8"
        >
          <div className="text-center">
            <label className="block text-white mb-2">Particles: {particleCount}</label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={particleCount}
              onChange={(e) => handleParticleCountChange(Number(e.target.value))}
              className="w-32 accent-purple-500"
            />
          </div>

          <div className="text-center">
            <label className="block text-white mb-2">Speed: {speed.toFixed(1)}x</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32 accent-cyan-500"
            />
          </div>

          <div className="text-center">
            <label className="block text-white mb-2">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-8 rounded border-none cursor-pointer"
            />
          </div>
        </motion.div>

        {/* Interactive Particle Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="h-96 border border-gray-700 rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <InteractiveParticles
                key={key} // Force re-render when key changes
                count={particleCount}
                speed={speed}
                color={color}
                isPlaying={isPlaying}
              />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-lg">Move your mouse over the canvas to interact with the particles!</p>
        </motion.div>
      </div>
    </section>
  )
}
