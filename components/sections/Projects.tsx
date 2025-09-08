"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "AI-Powered SaaS Platform",
    description:
      "A comprehensive SaaS solution with AI-driven analytics, real-time collaboration, and advanced data visualization.",
    image: "/modern-saas-dashboard.png",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "E-commerce Marketplace",
    description:
      "Full-stack e-commerce platform with payment integration, inventory management, and mobile-first design.",
    image: "/ecommerce-marketplace-interface.png",
    tech: ["React", "Node.js", "Stripe", "MongoDB", "AWS"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "Real-time Chat Application",
    description: "Scalable chat application with WebSocket integration, file sharing, and end-to-end encryption.",
    image: "/chat-application-interface.png",
    tech: ["React", "Socket.io", "Express", "Redis", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for complex data analysis with real-time updates and customizable widgets.",
    image: "/data-visualization-dashboard.png",
    tech: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing innovative solutions that drive business growth and user engagement
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-purple-400/50 transition-all duration-500 ${
                project.featured ? "lg:grid lg:grid-cols-2 lg:gap-8" : ""
              }`}
            >
              <div className={`relative ${project.featured ? "lg:order-2" : ""}`}>
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
              </div>

              <div className={`p-8 ${project.featured ? "lg:order-1 lg:flex lg:flex-col lg:justify-center" : ""}`}>
                <div className="flex items-center gap-2 mb-4">
                  {project.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                  >
                    <Github size={20} />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
