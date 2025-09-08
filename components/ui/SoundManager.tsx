"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export default function SoundManager() {
  const [isMuted, setIsMuted] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playSound = (frequency: number, duration = 0.1) => {
    if (isMuted || !audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }

  useEffect(() => {
    const handleClick = () => playSound(800, 0.1)
    const handleHover = () => playSound(600, 0.05)

    if (!isMuted) {
      document.addEventListener("click", handleClick)

      const interactiveElements = document.querySelectorAll("button, a, [role='button']")
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHover)
      })

      return () => {
        document.removeEventListener("click", handleClick)
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleHover)
        })
      }
    }
  }, [isMuted])

  return (
    <motion.button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2 }}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </motion.button>
  )
}
