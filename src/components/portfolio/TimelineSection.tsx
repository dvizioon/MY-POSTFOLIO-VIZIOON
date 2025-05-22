
"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { timelineEventsData } from "@/data/timelineEvents";
import type { LucideIconComponent } from "@/types/timeline";
import { useTranslations } from "@/hooks/useTranslations";
import * as LucideIcons from 'lucide-react';
import { cn } from "@/lib/utils";

const getIcon = (iconName?: keyof typeof LucideIcons): LucideIconComponent | null => {
  if (!iconName) return null;
  const IconComponent = LucideIcons[iconName] as LucideIconComponent | undefined;
  return IconComponent || LucideIcons.CalendarDays;
};

export default function TimelineSection() {
  const t = useTranslations();
  const timelineTranslations = t.timeline || {};
  const eventsTranslations = timelineTranslations.events || {};
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Define a CSS variable for the space from center to card edge in desktop
  // Half icon width (w-8 -> 2rem / 2 = 1rem) + desired gap (e.g., 1rem) = 2rem
  const timelineCenterSpace = "2rem"; // theme(spacing.8)

  return (
    <section id="timeline" className="py-16 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {timelineTranslations.title || "My Journey"}
        </h2>
        <p className="text-md text-muted-foreground mt-2 px-2">
          {timelineTranslations.subtitle || "A brief history of my milestones and experiences."}
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ '--timeline-center-space': timelineCenterSpace } as React.CSSProperties}>
        {/* Central Line */}
        <div className="absolute top-0 bottom-0 w-px bg-border/90
                        left-4 md:left-1/2 md:-translate-x-1/2"
             aria-hidden="true"></div>

        {timelineEventsData.map((event, index) => {
          const IconComponent = getIcon(event.iconName);
          const eventLocaleData = eventsTranslations[event.id as keyof typeof eventsTranslations] || {};
          const dateText = eventLocaleData.date || event.dateKey;
          const titleText = eventLocaleData.title || event.titleKey;
          const descriptionText = eventLocaleData.description || event.descriptionKey;

          const isEven = index % 2 === 0;

          return (
            <div
              key={event.id}
              className={cn(
                "relative mb-12 md:mb-16 flex w-full items-start",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Icon Container - Positioned absolutely relative to the central line */}
              <div className={cn(
                "absolute transform -translate-y-1/2 z-10",
                "top-1/2", // Centers vertically relative to the parent event div
                "left-4 -translate-x-1/2", // Mobile: icon center is 1rem from left edge
                "md:left-1/2 md:-translate-x-1/2" // Desktop: icon center is at 50% of parent
              )}>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                    event.iconBgColor || 'bg-primary'
                  )}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
                </div>
              </div>

              {/* Card Wrapper Div */}
              <div
                ref={el => itemRefs.current[index] = el}
                className={cn(
                  "w-full md:w-[calc(50%_-_var(--timeline-center-space))]", // Desktop: Card occupies 50% minus the center space
                  "ml-16 md:ml-0", // Mobile: ml-16 (4rem). Desktop: ml-0 as flex order handles it.
                                  // (Icon is at left-4 (1rem), icon width w-8 (2rem) -> icon right edge is at 2rem. ml-16 gives 2rem gap)
                  "timeline-card-animate",
                  isEven ? "md:timeline-card-left" : "md:timeline-card-right"
                )}
              >
                <Card className={cn(
                  "shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm w-full min-h-[220px] flex flex-col tilt-card border-2 border-transparent hover:border-primary/20"
                )}>
                  <CardHeader className="pb-3 pt-5 px-5">
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">{dateText}</p>
                    <CardTitle className="text-lg md:text-xl text-primary">{titleText}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-5 px-5 flex-grow flex flex-col">
                    <CardDescription className="text-sm text-card-foreground/80 mb-4 leading-relaxed">
                      {descriptionText}
                    </CardDescription>
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {event.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs px-2.5 py-1 bg-secondary/20 border border-secondary/40 text-secondary-foreground hover:bg-secondary/30 hover:border-secondary/60 transition-colors cursor-default"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Spacer Div for Desktop - occupies the space on the other side of the icon */}
              <div className="hidden md:block md:w-[var(--timeline-center-space)]"></div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
