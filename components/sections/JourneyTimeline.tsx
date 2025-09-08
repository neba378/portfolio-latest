"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const journeyData = [
  {
    year: "2022",
    title: "Computer Science Journey Begins",
    description:
      "Started Bachelor's in Computer Science at Adama Science and Technology University",
    color: "#ff6b6b",
  },
  {
    year: "2024",
    title: "A2SV Competitive Programming",
    description:
      "Joined Africa To Silicon Valley program, mastering algorithms and data structures",
    color: "#4ecdc4",
  },
  {
    year: "2024",
    title: "Professional Work Experience",
    description:
      "Software Engineer Intern at Eskalate, leading Clean Architecture transition",
    color: "#45b7d1",
  },
  {
    year: "2024",
    title: "Hackathon Victory",
    description:
      "Second Place at A2SV Internal Hackathon with AI-driven chat support system",
    color: "#96ceb4",
  },
  {
    year: "2024",
    title: "Leadership & Innovation",
    description:
      "Vice President of CS Club, mentoring students and driving technical excellence",
    color: "#feca57",
  },
];

export default function JourneyTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow the path of innovation and growth through my career
            milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 rounded-full" />

          <div className="space-y-16">
            {journeyData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                }
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center gap-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-1 p-8 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}40, ${item.color}80)`,
                      boxShadow: `0 0 30px ${item.color}40`,
                    }}
                  >
                    {item.year}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Timeline Node */}
                <div
                  className="w-6 h-6 rounded-full border-4 border-white z-10"
                  style={{ backgroundColor: item.color }}
                />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
