"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { Star } from "lucide-react"
import TestimonialCard3D from "@/components/3d/TestimonialCard3D"

const testimonials = [
  {
    name: "Eskalate Team Lead",
    role: "Senior Software Engineer",
    company: "Eskalate",
    content:
      "Nebiyu led our transition to Clean Architecture, improving codebase modularity by 40%. His Go and MongoDB expertise was exceptional.",
    rating: 5,
    avatar: "/testimonial-avatar-1.png",
    color: "#ff6b6b",
  },
  {
    name: "A2SV Mentor",
    role: "Technical Mentor",
    company: "Africa To Silicon Valley",
    content:
      "Outstanding problem-solving skills with 900+ problems solved. Nebiyu's algorithmic thinking and competitive programming expertise is remarkable.",
    rating: 5,
    avatar: "/testimonial-avatar-2.png",
    color: "#4ecdc4",
  },
  {
    name: "CS Club Member",
    role: "Student",
    company: "ASTU CS Club",
    content:
      "As Vice President, Nebiyu transformed our club with innovative workshops and coding sessions. His leadership inspired us all.",
    rating: 5,
    avatar: "/testimonial-avatar-3.png",
    color: "#45b7d1",
  },
  {
    name: "Hackathon Judge",
    role: "Technical Evaluator",
    company: "A2SV Hackathon",
    content:
      "Nebiyu's AI-driven chat support system was impressive. The FastAPI backend and user engagement improvements earned second place.",
    rating: 5,
    avatar: "/testimonial-avatar-4.png",
    color: "#96ceb4",
  },
]

export default function TestimonialsOrbit() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Client Orbit
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Testimonials floating in the space of satisfaction</p>
        </motion.div>

        {/* 3D Testimonials Orbit */}
        <div className="h-96 mb-16">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} />
              {testimonials.map((testimonial, index) => {
                const angle = (index / testimonials.length) * Math.PI * 2
                const radius = 4
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius

                return (
                  <TestimonialCard3D
                    key={index}
                    position={[x, 0, z]}
                    color={testimonial.color}
                    isSelected={selectedTestimonial === index}
                    onClick={() => setSelectedTestimonial(index)}
                  />
                )
              })}
            </Suspense>
          </Canvas>
        </div>

        {/* Selected Testimonial Details */}
        <motion.div
          key={selectedTestimonial}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="flex justify-center mb-4">
              {Array.from({ length: testimonials[selectedTestimonial].rating }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-2xl text-gray-300 mb-8 italic leading-relaxed">
              "{testimonials[selectedTestimonial].content}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{
                  background: `linear-gradient(135deg, ${testimonials[selectedTestimonial].color}40, ${testimonials[selectedTestimonial].color}80)`,
                }}
              >
                {testimonials[selectedTestimonial].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">{testimonials[selectedTestimonial].name}</div>
                <div className="text-gray-400">{testimonials[selectedTestimonial].role}</div>
                <div className="text-gray-500 text-sm">{testimonials[selectedTestimonial].company}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-4 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                selectedTestimonial === index ? "bg-white scale-125" : "bg-gray-600"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
