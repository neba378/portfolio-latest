"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Play } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AI Job Hunter Bot",
    category: "AI/Automation",
    description:
      "Telegram-based AI agent that scrapes job listings, filters by user preferences, and provides intelligent alerts. Reduced job-search time by 80% with AI-driven recommendations.",
    image: "/ai-job-hunter-bot.png",
    tech: [
      "Node.js",
      "TypeScript",
      "Playwright",
      "Telegraf",
      "Docker",
      "AI Agents",
    ],
    color: "#ff6b6b",
    featured: true,
    github: "https://github.com/neba378/ai-job-hunter",
    live: "https://t.me/your_job_bot",
    video: "https://example.com/video",
  },
  {
    id: 2,
    title: "AI Recovery Support Platform",
    category: "Healthcare/AI",
    description:
      "Holistic recovery platform with 24/7 AI chat, personalized recovery plans, and mental health tools. Built with FastAPI backend and LLM integration.",
    image: "/ai-recovery-platform.png",
    tech: ["FastAPI", "React", "Gemini", "LLMs", "RAG", "PostgreSQL"],
    color: "#4ecdc4",
    featured: true,
    github: "https://github.com/abdiesu04/AI-recovery",
    live: "https://recovery-platform.com",
    video: "https://example.com/video",
  },
  {
    id: 3,
    title: "E-Commerce Telegram Bot",
    category: "E-commerce",
    description:
      "Free and simple Telegram bot for e-commerce that lets users add products and post to groups/channels with structured bot architecture.",
    image: "/ecommerce-telegram-bot.png",
    tech: ["Node.js", "Telegram API", "MongoDB", "Bot Framework"],
    color: "#45b7d1",
    featured: false,
    github: "https://github.com/neba378/e-commerce-bot",
    live: "https://t.me/e_local_commerce_bot",
    video: "https://example.com/video",
  },
  {
    id: 4,
    title: "Modern Blog Platform",
    category: "Web Development",
    description:
      "Responsive blog website built with Next.js, shadcn-ui, and Tailwind CSS featuring SEO optimization and Markdown support.",
    image: "/modern-blog-platform.png",
    tech: ["Next.js", "shadcn-ui", "Tailwind CSS", "Express.js", "SEO"],
    color: "#96ceb4",
    featured: false,
    github: "https://github.com/neba378/blog-site",
    live: "https://blog-site-1-8vn9.onrender.com/",
    video: "https://example.com/video",
  },
  {
    id: 5,
    title: "YouTube Clone",
    category: "Frontend",
    description:
      "Sleek YouTube-inspired frontend built with React and Material UI, designed for smooth user experience and modern aesthetics.",
    image: "/youtube-clone-interface.png",
    tech: ["React", "Material UI", "JavaScript", "Responsive Design"],
    color: "#feca57",
    featured: false,
    github: "https://github.com/neba378/youtube-clone",
    live: "https://youtube-clone-neba.netlify.app/",
    video: "https://example.com/video",
  },
  {
    id: 6,
    title: "Interactive Typing Game",
    category: "Gaming",
    description:
      "Fun and interactive typing game with real-time progress tracking, WPM calculation, and accuracy feedback built with vanilla JavaScript.",
    image: "/typing-game-interface.png",
    tech: ["HTML", "CSS", "JavaScript", "Game Development", "DOM Manipulation"],
    color: "#ff9ff3",
    featured: false,
    github: "https://github.com/neba378/Typing-Game",
    live: "https://neba378.github.io/Typing-Game/",
    video: "https://example.com/video",
  },
];

const categories = [
  "All",
  "AI/Automation",
  "Healthcare/AI",
  "E-commerce",
  "Web Development",
  "Frontend",
  "Gaming",
];

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Project Galaxy
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Explore my universe of impossible creations - each project pushes
            the boundaries of what's possible
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "border-white bg-white text-black"
                    : "border-gray-600 text-gray-300 hover:border-gray-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 hover:border-gray-500 transition-all duration-500 ${
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project.id)}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}20, transparent)`,
                    }}
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-black/80 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-black/80 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: project.color + "20",
                        color: project.color,
                        border: `1px solid ${project.color}40`,
                      }}
                    >
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
