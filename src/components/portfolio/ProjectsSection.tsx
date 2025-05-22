"use client";

import { useState, useCallback } from 'react';
import type { Project } from '@/types/project';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Bot, ExternalLink, Code2, AppWindow, AlertCircle } from "lucide-react";
import { useTranslations } from '@/hooks/useTranslations';
import ProjectCardParticles from './ProjectCardParticles';

interface ProjectsSectionProps {
  projects: Project[];
  onViewImage: (project: Project) => void;
  onAskAI: (project: Project) => void;
  onViewProjectLink: (project: Project) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function ProjectsSection({ projects, onViewImage, onAskAI, onViewProjectLink, isLoading, error }: ProjectsSectionProps) {
  const t = useTranslations();
  const [currentProjectForCode, setCurrentProjectForCode] = useState<Project | null>(null);
  const [alertProjectTitle, setAlertProjectTitle] = useState<string>("");
  const [showNoLinkAlert, setShowNoLinkAlert] = useState(false);

  const handlePreviewProject = (project: Project) => {
    if (project.link) {
      onViewProjectLink(project);
    } else {
      setAlertProjectTitle(project.title);
      setShowNoLinkAlert(true);
    }
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.projectsSection.title}</h2>
          <p className="text-md text-muted-foreground mt-2">{t.projectsSection.loading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="shadow-xl bg-card/80 backdrop-blur-sm flex flex-col animate-pulse">
              <CardHeader className="p-4">
                <div className="relative aspect-[16/10] w-full mb-3 bg-muted rounded-t-md"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </CardContent>
              <CardFooter className="p-4 pt-2 flex flex-col sm:flex-row gap-2 items-stretch">
                <div className="h-10 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.projectsSection.title}</h2>
          <p className="text-md text-destructive mt-2">{error}</p>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.projectsSection.title}</h2>
          <p className="text-md text-muted-foreground mt-2">{t.projectsSection.noProjects}</p>
        </div>
      </section>
    );
  }

  const previewButtonText = t.projectsSection.previewProjectButton || "Preview Project";
  const goToSiteButtonText = t.projectsSection.goToSiteButton || "Go to Site";
  const viewCodeButtonText = t.projectsSection.viewCodeButton || "View Code";
  const askAgentButtonText = t.projectsSection.askAgentButton || "Ask Agent";

  return (
    <TooltipProvider>
      <section id="projects" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.projectsSection.title}</h2>
          <p className="text-md text-muted-foreground mt-2">{t.projectsSection.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="shadow-xl bg-card/80 backdrop-blur-sm tilt-card flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <CardHeader className="p-4">
                <div className="relative aspect-[16/10] w-full mb-3 rounded-md overflow-hidden group">
                  <NextImage
                    src={project.imageUrl || 'https://placehold.co/600x400.png'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    data-ai-hint={project.dataAiHint}
                    priority={project.id === '1' || project.id === '2'}
                  />
                  <div className="absolute inset-0 bg-primary/30 z-10 pointer-events-none"></div>
                  <ProjectCardParticles className="absolute w-full  h-full"  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white hover:text-primary rounded-full h-9 w-9 z-30 transition-all duration-200 opacity-90 hover:opacity-100 hover:scale-110"
                        onClick={() => onViewImage(project)}
                        aria-label={t.projectsSection.viewImageAriaLabel?.replace('{projectTitle}', project.title) || `View ${project.title} image`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.projectsSection.viewImageAriaLabel?.replace('{projectTitle}', project.title) || `View ${project.title} image`}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardTitle className="text-xl text-primary group-hover:text-primary/90 transition-colors duration-200 line-clamp-2">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <CardDescription className="text-sm text-card-foreground/80 line-clamp-3 mb-3 leading-relaxed">
                  {project.description}
                </CardDescription>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map(tech => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs px-2 py-0.5 bg-secondary/20 border-secondary/30 text-secondary-foreground hover:bg-secondary/30 transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5 text-muted-foreground border-muted-foreground/30"
                      >
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-2 flex flex-col gap-2 items-stretch">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handlePreviewProject(project)}
                        variant="outline"
                        className="flex-grow border-primary/50 hover:border-primary text-primary hover:bg-primary/10 text-xs sm:text-sm transition-all duration-200 hover:shadow-md"
                      >
                        <AppWindow className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4 shrink-0" />
                        <span className="truncate">{previewButtonText}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{previewButtonText}</p></TooltipContent>
                  </Tooltip>
                  {project.link && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-grow border-primary/50 hover:border-primary text-primary hover:bg-primary/10 text-xs sm:text-sm transition-all duration-200 hover:shadow-md"
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4 shrink-0" />
                            <span className="truncate">{goToSiteButtonText}</span>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>{goToSiteButtonText}</p></TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.repositoryUrl && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-grow border-muted-foreground/30 hover:border-muted-foreground text-muted-foreground hover:bg-muted/20 text-xs sm:text-sm transition-all duration-200 hover:shadow-md"
                          onClick={() => setCurrentProjectForCode(project)}
                          aria-label={t.projectsSection.viewCodeAriaLabel?.replace('{projectTitle}', project.title) || `View ${project.title} code`}
                        >
                          <Code2 className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4 shrink-0" />
                          <span className="truncate">{viewCodeButtonText}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>{viewCodeButtonText}</p></TooltipContent>
                    </Tooltip>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => onAskAI(project)}
                        className="flex-grow border-secondary/50 hover:border-secondary text-secondary hover:bg-secondary/10 text-xs sm:text-sm transition-all duration-200 hover:shadow-md"
                        aria-label={t.projectsSection.askAgentAriaLabel?.replace('{projectTitle}', project.title) || `Ask agent about ${project.title}`}
                      >
                        <Bot className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4 shrink-0" />
                        <span className="truncate">{askAgentButtonText}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{askAgentButtonText}</p></TooltipContent>
                  </Tooltip>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <AlertDialog open={showNoLinkAlert} onOpenChange={setShowNoLinkAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                {t.projectsSection.noPreviewModalTitle || "Preview Not Available"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {(t.projectsSection.noPreviewModalDescription || "There is no live preview available for the project: {projectTitle}.").replace('{projectTitle}', alertProjectTitle)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowNoLinkAlert(false)}>
                {t.projectsSection.noPreviewModalOkButton || "OK"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {currentProjectForCode && currentProjectForCode.repositoryUrl && (
          <AlertDialog open={!!currentProjectForCode} onOpenChange={(isOpen) => { if (!isOpen) setCurrentProjectForCode(null); }}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t.projectsSection.codeLinkModalTitle || "View Source Code"}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.projectsSection.codeLinkModalDescription || "Click the button below to go to the project's repository."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCurrentProjectForCode(null)}>{t.projectsSection.codeLinkModalCancelButton || "Cancel"}</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <a href={currentProjectForCode.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    {t.projectsSection.codeLinkModalButton || "Go to Repository"}
                  </a>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </section>
    </TooltipProvider>
  );
}
