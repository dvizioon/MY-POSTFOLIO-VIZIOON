
"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export default function HeroSection() {
  const t = useTranslations();

  const scrollToProjects = () => {
    const projectsElement = document.getElementById("projects"); // Changed ID to match ProjectsSection
    if (projectsElement) {
      projectsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const nextSection = document.querySelector('#timeline'); // Fallback to timeline or other section
      nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-transparent text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-4 md:mb-6">
          {t.hero.title}
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-foreground/80 max-w-xl md:max-w-3xl mx-auto mb-6 md:mb-8">
          {t.hero.subtitle}
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-md md:text-lg px-6 py-3 md:px-8 md:py-6 shadow-lg transform transition-transform hover:scale-105"
          onClick={scrollToProjects}
        >
          {t.hero.ctaButton} <ArrowDown className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </section>
  );
}
