"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Go", "C++", "Java"],
    color: "#ff6b6b",
  },
  {
    name: "Frontend Development",
    skills: ["React", "Next.js", "shadcn-ui", "Tailwind CSS", "Material UI"],
    color: "#4ecdc4",
  },
  {
    name: "Backend & APIs",
    skills: ["Node.js", "Go (Gin)", "FastAPI", "REST APIs", "Microservices"],
    color: "#45b7d1",
  },
  {
    name: "Databases & Storage",
    skills: ["PostgreSQL", "MongoDB", "Database Design", "Data Modeling"],
    color: "#96ceb4",
  },
  {
    name: "AI & DevOps Tools",
    skills: ["Docker", "LangChain", "LLMs", "Telegram API", "Git", "Cron Jobs"],
    color: "#feca57",
  },
]

export default function InteractiveSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I use to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Skill Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-8 rounded-xl border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 bg-gray-900/30 backdrop-blur-sm group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${category.color}40, ${category.color}80)`,
                  boxShadow: `0 0 20px ${category.color}40`,
                }}
              >
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: category.color }} />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
