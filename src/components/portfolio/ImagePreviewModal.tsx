
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Removed DialogClose
import NextImage from "next/image";
// import { Button } from "../ui/button"; // Not needed if using default close
// import { X } from "lucide-react"; // Not needed if using default close
import { useTranslations } from "@/hooks/useTranslations";

interface ImagePreviewModalProps {
  imageUrl: string;
  altText: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImagePreviewModal({ imageUrl, altText, isOpen, onClose }: ImagePreviewModalProps) {
  const t = useTranslations();
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* DialogContent from ShadCN already includes a DialogPrimitive.Close with X icon */}
      <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] p-0 overflow-hidden">
        <DialogHeader className="p-4 flex flex-row justify-between items-center border-b">
          <DialogTitle className="text-lg text-primary truncate">{t.imagePreviewModal.titlePrefix} {altText}</DialogTitle>
          {/* Custom close button removed to rely on default ShadCN DialogContent close */}
        </DialogHeader>
        <div className="p-4 flex justify-center items-center bg-background/50">
          <NextImage
            src={imageUrl}
            alt={altText}
            width={1200} 
            height={800} 
            className="rounded-md object-contain max-h-[70vh] w-auto"
            data-ai-hint="showcase image" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
