
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import { Sprout, Palette } from "lucide-react"; 

interface PaletteInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaletteInfoModal({ isOpen, onClose }: PaletteInfoModalProps) {
  const t = useTranslations().paletteInfoModal || {
    title: "Curiosities", // Default fallback
    closeButton: "Close",
    spiralTitle: "The 3D Spiral",
    spiralDescription1: "The animated 3D spiral in the background symbolizes continuous growth, perpetual learning, and the interconnectedness of ideas within the vast universe of technology.",
    spiralDescription2: "Its dynamic movement and shifting colors reflect the ever-evolving nature of the digital world and my personal journey of exploration and development within it."
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl text-primary flex items-center gap-2">
            <Palette className="h-6 w-6" />
            {t.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 overflow-y-auto space-y-8 flex-grow pr-2 custom-scrollbar">
          <section aria-labelledby="spiral-title">
            <h3 id="spiral-title" className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary"/>
              {t.spiralTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{t.spiralDescription1}</p>
            <p className="text-sm text-muted-foreground">{t.spiralDescription2}</p>
          </section>
        </div>

        <div className="pt-4 border-t mt-auto">
          <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
            {t.closeButton}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
