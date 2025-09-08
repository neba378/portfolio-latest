"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Code2, Trophy, Rocket } from "lucide-react"

export default function FloatingIslands() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const islands = [
    {
      icon: Brain,
      title: "Problem Solving Mastery",
      description:
        "900+ problems solved on LeetCode and Codeforces with advanced algorithmic thinking and competitive programming excellence.",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-500/10 to-rose-500/10",
      borderColor: "border-pink-500/20",
    },
    {
      icon: Code2,
      title: "AI & Full-Stack Excellence",
      description:
        "Specialized in AI agent integration, microservices architecture, and scalable backend systems with modern technologies.",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      icon: Trophy,
      title: "Leadership & Innovation",
      description:
        "Vice President of CS Club, A2SV Hackathon winner, driving team success and fostering innovation in tech communities.",
      color: "from-purple-500 to-indigo-500",
      bgColor: "from-purple-500/10 to-indigo-500/10",
      borderColor: "border-purple-500/20",
    },
  ]

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-slate-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 backdrop-blur-sm mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="w-4 h-4 text-pink-400 mr-2" />
            <span className="text-pink-300 font-medium">About Me</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Crafting Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From competitive programming champion to AI-focused engineer, I transform complex challenges into elegant
            solutions
          </p>
        </motion.div>

        {/* Floating Islands Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {islands.map((island, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <motion.div
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${island.bgColor} backdrop-blur-sm border ${island.borderColor} hover:border-opacity-40 transition-all duration-500`}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                style={{
                  background: `linear-gradient(135deg, ${island.bgColor.split(" ")[1]} 0%, ${island.bgColor.split(" ")[3]} 100%)`,
                }}
              >
                {/* Floating Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${island.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <island.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {island.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {island.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                <div
                  className="absolute bottom-4 left-4 w-1 h-1 bg-white/30 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
