import FloatingNavigation from "@/components/navigation/FloatingNavigation";
import HeroSection from "@/components/sections/HeroSection";
import FloatingIslands from "@/components/sections/FloatingIslands";
import InteractiveSkills from "@/components/sections/InteractiveSkills";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import ProjectGallery from "@/components/sections/ProjectGallery";
import AchievementsTrophy from "@/components/sections/AchievementsTrophy";
import ContactPortal from "@/components/sections/ContactPortal";
import BackgroundOrbs from "@/components/3d/BackgroundOrbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nebiyu Musbah Yesuf - Full-Stack & AI-Focused Software Engineer",
  description:
    "Versatile Software Engineer with 3+ years of experience specializing in AI agent integration, scalable microservices, and full-stack development. 900+ problems solved.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundOrbs />
      <FloatingNavigation />
      <HeroSection />
      <FloatingIslands />
      <InteractiveSkills />
      <JourneyTimeline />
      <ProjectGallery />
      <AchievementsTrophy />
      <ContactPortal />
    </main>
  );
}
