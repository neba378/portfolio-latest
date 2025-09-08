"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Star } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-gray-900" />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl rotate-45"
          animate={{ rotate: [45, 225, 45], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full"
          animate={{ y: [0, -30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl"
          animate={{ rotate: [0, 360], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Particle System */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
        style={{ y, opacity }}
      >
        {/* Floating Icons */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex space-x-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <Zap className="w-8 h-8 text-yellow-400" />
            <Star className="w-8 h-8 text-purple-400" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm mb-8"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(6,182,212,0.4)",
            }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-cyan-300 font-medium">
              Available for Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
            style={{
              background:
                "linear-gradient(135deg, #22D3EE 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, #F59E0B 100%)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient 6s ease infinite",
            }}
          >
            NEBIYU
            <br />
            <span className="text-5xl md:text-7xl lg:text-8xl">MUSBAH</span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            className="text-2xl md:text-4xl font-light text-gray-300 mb-6 space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <span className="text-cyan-400 font-semibold">AI Engineer</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-400 font-semibold">
                Full-Stack Developer
              </span>
            </div>
            <div className="text-lg text-gray-400">
              Building the <span className="text-cyan-400">impossible</span>{" "}
              with code
            </div>
          </motion.div>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Transforming ideas into reality with{" "}
          <span className="text-cyan-400 font-semibold">
            3+ years of experience
          </span>
          ,{" "}
          <span className="text-purple-400 font-semibold">
            900+ problems solved
          </span>
          , and a passion for{" "}
          <span className="text-blue-400 font-semibold">
            AI-driven innovation
          </span>
          .
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold text-lg overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(6,182,212,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Explore My Universe
            </span>
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 bg-transparent border-2 border-purple-400 rounded-full text-purple-400 font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Let's Connect
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {[
            {
              number: "900+",
              label: "Problems Solved",
              color: "from-cyan-500 to-blue-500",
            },
            {
              number: "6+",
              label: "Major Projects",
              color: "from-purple-500 to-indigo-500",
            },
            {
              number: "3+",
              label: "Years Experience",
              color: "from-pink-500 to-purple-500",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
              >
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
