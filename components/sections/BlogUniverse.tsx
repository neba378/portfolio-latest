"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { motion, useInView } from "framer-motion"
import { Suspense } from "react"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import BlogBook3D from "@/components/3d/BlogBook3D"

const blogPosts = [
  {
    title: "Mastering Competitive Programming",
    excerpt:
      "My journey to solving 900+ problems on LeetCode and Codeforces, sharing strategies and insights for algorithmic thinking.",
    date: "2024-12-15",
    readTime: "10 min read",
    category: "Algorithms",
    color: "#ff6b6b",
    position: [-3, 1, 0] as [number, number, number],
  },
  {
    title: "Building AI Agents with Node.js",
    excerpt:
      "Deep dive into creating intelligent Telegram bots that can scrape, filter, and provide personalized job recommendations.",
    date: "2024-12-10",
    readTime: "12 min read",
    category: "AI/ML",
    color: "#4ecdc4",
    position: [0, 0, 1] as [number, number, number],
  },
  {
    title: "Clean Architecture in Go",
    excerpt:
      "How I led the transition to Clean Architecture at Eskalate, improving codebase modularity by 40% with Go and MongoDB.",
    date: "2024-12-05",
    readTime: "8 min read",
    category: "Backend",
    color: "#45b7d1",
    position: [3, -1, 0] as [number, number, number],
  },
  {
    title: "From A2SV to Industry Success",
    excerpt: "My experience in the Africa To Silicon Valley program and how it shaped my software engineering career.",
    date: "2024-11-28",
    readTime: "6 min read",
    category: "Career",
    color: "#96ceb4",
    position: [-1, -2, -1] as [number, number, number],
  },
]

export default function BlogUniverse() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog" className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Knowledge Universe
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Sharing insights from competitive programming to AI development
          </p>
        </motion.div>

        {/* 3D Blog Books */}
        <div className="h-96 mb-16">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} />
              {blogPosts.map((post, index) => (
                <BlogBook3D
                  key={index}
                  position={post.position}
                  color={post.color}
                  isSelected={selectedPost === index}
                  onClick={() => setSelectedPost(selectedPost === index ? null : index)}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group cursor-pointer transition-all duration-500 ${
                selectedPost === index ? "scale-105" : ""
              }`}
              onClick={() => setSelectedPost(selectedPost === index ? null : index)}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 h-full hover:border-gray-500 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: post.color + "20",
                      color: post.color,
                      border: `1px solid ${post.color}40`,
                    }}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm space-x-2">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm space-x-2">
                    <Calendar size={14} />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
