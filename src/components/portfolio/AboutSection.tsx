
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "@/hooks/useTranslations";
import { Github, Linkedin, Mail } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations();
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.about.title}</h2>
        <p className="text-md text-muted-foreground mt-2 px-2">{t.about.subtitle}</p>
      </div>
      <Card className="max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm tilt-card overflow-hidden">
        <div className="md:flex md:items-center">
          <div className="md:w-1/3 p-6 md:p-8 flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/50 shadow-lg mb-4">
              <AvatarImage src="/dvizioon-logo-avatar.png" alt={t.about.imageAlt} data-ai-hint="professional portrait" />
              <AvatarFallback>{t.about.greeting.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl md:text-3xl font-bold text-primary text-center md:text-left mb-1">{t.about.greeting}</CardTitle>
            <p className="text-md md:text-lg text-muted-foreground font-medium text-center md:text-left">{t.about.role}</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="mailto:danielmartinsjob@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t.contact.emailAriaLabel}>
                <Mail className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/danielestevao" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t.contact.linkedinAriaLabel}>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/dvizioon" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t.contact.githubAriaLabel}>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="p-6 md:p-8 md:w-2/3">
            <CardContent className="p-0 text-foreground/90 space-y-4 md:space-y-5 text-sm md:text-base leading-relaxed">
              <p className="text-lg text-foreground/95">{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
              <p>{t.about.bio3}</p>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
}
