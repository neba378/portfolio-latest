"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import InteractiveBackground from "@/components/3d/InteractiveBackground";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <InteractiveBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              John Doe
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl text-neutral-200 mb-8 space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="font-medium">Full Stack Developer</div>
            <div className="text-lg md:text-xl text-neutral-400">
              Building the future with{" "}
              <span className="text-cyan-400 font-semibold">AI</span> &{" "}
              <span className="text-fuchsia-400 font-semibold">
                cutting-edge tech
              </span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transforming innovative ideas into{" "}
            <span className="text-indigo-400 font-medium">
              scalable solutions
            </span>{" "}
            for startups, SaaS, and AI-driven businesses worldwide.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 rounded-full text-white font-semibold text-lg shadow-lg transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              🚀 View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-semibold text-lg bg-white/5 backdrop-blur-sm hover:bg-cyan-400/10 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ✉️ Get In Touch
            </motion.button>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              { icon: Mail, href: "mailto:john@example.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-cyan-400 hover:bg-cyan-400/20 transition-all duration-300"
                aria-label={label}
              >
                <Icon
                  size={24}
                  className="text-neutral-300 hover:text-cyan-400 transition-colors duration-300"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Down Icon */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          whileHover={{ scale: 1.1 }}
          aria-label="Scroll to about section"
        >
          <ArrowDown
            size={32}
            className="text-neutral-400 hover:text-cyan-400 transition-colors duration-300"
          />
        </motion.button>
      </div>
    </section>
  );
}
