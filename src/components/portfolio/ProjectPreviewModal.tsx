
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react"; // X icon removed as it's not used
import { useTranslations } from "@/hooks/useTranslations";

interface ProjectPreviewModalProps {
  projectUrl: string;
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectPreviewModal({ projectUrl, projectTitle, isOpen, onClose }: ProjectPreviewModalProps) {
  const t = useTranslations().projectPreviewModal || {
    titlePrefix: "Previewing:",
    liveSiteLink: "Open live site",
    closeButtonAriaLabel: "Close project preview",
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] h-[80vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row justify-between items-center border-b shrink-0">
          <DialogTitle className="text-lg text-primary truncate">{t.titlePrefix} {projectTitle}</DialogTitle>
          <Button variant="outline" size="sm" asChild className="ml-auto mr-8">
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
              {/* Wrap icon and text in a span */}
              <span className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t.liveSiteLink}
              </span>
            </a>
          </Button>
          {/* The default X from DialogContent will be used. */}
        </DialogHeader>
        <div className="flex-grow bg-muted/20">
          <iframe
            src={projectUrl}
            title={projectTitle}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
