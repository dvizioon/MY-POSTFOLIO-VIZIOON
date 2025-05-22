
"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react"; // Import all icons
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useState } from "react";
import type { SkillCategory, SkillCategoryIconName } from "@/types/skills";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// Helper function to get the icon component from its name string
const getIconComponent = (iconName: SkillCategoryIconName): LucideIcons.LucideIcon | null => {
  const IconComponent = LucideIcons[iconName] as LucideIcons.LucideIcon | undefined;
  return IconComponent || LucideIcons.Package; // Fallback icon
};


export default function SkillsSection() {
  const t = useTranslations();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/skills');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SkillCategory[] = await response.json();
        setSkillCategories(data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError(t.skills.fetchError || "Could not load skills. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, [t.skills.fetchError]); // Dependency t.skills.fetchError ensures error message updates with language change

  if (isLoading) {
    return (
      <section id="skills" className="py-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.skills.title}</h2>
          <p className="text-md text-muted-foreground mt-2 px-2">{t.skills.loading}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-3 md:gap-4 pb-3 md:pb-4 pt-4 px-4 md:pt-5 md:px-5">
                <Skeleton className="h-6 w-6 rounded-full bg-muted" />
                <Skeleton className="h-6 w-3/5 bg-muted" />
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5 md:gap-2 p-4 md:p-5 pt-0">
                {[...Array(5)].map((_, skillIndex) => (
                  <Skeleton key={skillIndex} className="h-6 w-20 rounded-full bg-muted" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.skills.title}</h2>
          <p className="text-md text-destructive mt-2 px-2">{error}</p>
        </div>
      </section>
    );
  }
  
  if (!skillCategories || skillCategories.length === 0) {
    return (
     <section id="skills" className="py-16">
       <div className="text-center mb-12 md:mb-16">
         <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.skills.title}</h2>
         <p className="text-md text-muted-foreground mt-2 px-2">{t.skills.noSkills}</p>
       </div>
     </section>
   );
 }

  return (
    <section id="skills" className="py-16">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.skills.title}</h2>
        <p className="text-md text-muted-foreground mt-2 px-2">{t.skills.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {skillCategories.map((categoryItem) => {
          const IconComponent = getIconComponent(categoryItem.iconName);
          // Resolve translated category title
          const categoryTitle = categoryItem.titleKey.split('.').reduce((o, k) => (o && o[k]) ? o[k] : categoryItem.id, t as any) || categoryItem.id;

          return (
            <Card key={categoryItem.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-3 md:gap-4 pb-3 md:pb-4 pt-4 px-4 md:pt-5 md:px-5">
                {IconComponent && <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
                <CardTitle className="text-lg md:text-xl text-primary">{categoryTitle}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5 md:gap-2 p-4 md:p-5 pt-0">
                {categoryItem.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs md:text-sm px-2.5 py-1 md:px-3 bg-secondary/20 border-secondary/50 text-secondary-foreground hover:bg-secondary/40">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
