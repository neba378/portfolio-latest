"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
  X,
  Clock,
  Trophy,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#home", color: "#FF6B9D" },
  { icon: User, label: "About", href: "#about", color: "#4ECDC4" },
  { icon: Code, label: "Skills", href: "#skills", color: "#45B7D1" },
  { icon: Clock, label: "Journey", href: "#journey", color: "#96CEB4" },
  { icon: Briefcase, label: "Projects", href: "#projects", color: "#FECA57" },
  {
    icon: Trophy,
    label: "Achievements",
    href: "#achievements",
    color: "#FF9F43",
  },
  { icon: Mail, label: "Contact", href: "#contact", color: "#6C5CE7" },
];

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="relative">
        {/* Main Navigation Orb */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            boxShadow:
              "0 0 30px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </motion.div>
        </motion.button>

        {/* Floating Navigation Items */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute left-0 bottom-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: 240, height: 240, pointerEvents: "none" }}
            >
              {navItems.map((item, index) => {
                // Spread icons in a circle around the orb, but slightly above and to the right for bottom left placement
                const angle = index * (360 / navItems.length) - 45;
                const radius = 90;
                const x = Math.cos((angle * Math.PI) / 180) * radius + 48;
                const y = Math.sin((angle * Math.PI) / 180) * radius + 48;
                const isActive = activeSection === item.href.substring(1);

                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 group"
                    style={{
                      left: x,
                      top: y,
                      backgroundColor: item.color + "20",
                      borderColor: item.color + "40",
                      boxShadow: `0 0 20px ${item.color}40`,
                      pointerEvents: "auto",
                    }}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      backgroundColor: isActive
                        ? item.color + "40"
                        : item.color + "20",
                    }}
                    exit={{ scale: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon
                      size={18}
                      style={{ color: item.color }}
                      className="group-hover:scale-110 transition-transform"
                    />

                    {/* Tooltip */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
