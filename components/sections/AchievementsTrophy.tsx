"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Trophy, Star, Target, Zap, Crown } from "lucide-react"

const achievements = [
  {
    icon: Crown,
    title: "A2SV Hackathon 2nd Place",
    description: "AI-driven chat support system with intelligent automation",
    year: "2024",
    color: "from-yellow-400 to-orange-500",
    bgColor: "from-yellow-400/10 to-orange-500/10",
    borderColor: "border-yellow-400/20",
  },
  {
    icon: Zap,
    title: "900+ Problems Solved",
    description: "LeetCode & Codeforces competitive programming mastery",
    year: "2024",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-500/10 to-rose-500/10",
    borderColor: "border-pink-500/20",
  },
  {
    icon: Star,
    title: "Vice President CS Club",
    description: "Leadership in technical excellence and community building",
    year: "2024",
    color: "from-cyan-500 to-blue-500",
    bgColor: "from-cyan-500/10 to-blue-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: Target,
    title: "Clean Architecture Leader",
    description: "40% codebase improvement and architectural transformation",
    year: "2024",
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-500/10 to-indigo-500/10",
    borderColor: "border-purple-500/20",
  },
]

export default function AchievementsTrophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="achievements" className="relative py-32 bg-gradient-to-b from-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-sm mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-medium">Achievements</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Hall of
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Celebrating milestones in the journey of innovation and technical mastery
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <motion.div
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${achievement.bgColor} backdrop-blur-sm border ${achievement.borderColor} hover:border-opacity-40 transition-all duration-500 text-center`}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
              >
                {/* Floating Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 font-medium">
                  {achievement.year}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
                  {achievement.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {achievement.description}
                </p>

                {/* Decorative Sparkles */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                <div
                  className="absolute bottom-2 right-2 w-1 h-1 bg-white/40 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
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
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
