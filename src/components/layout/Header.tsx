
"use client"; 

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher'; 
import { useTranslations } from '@/hooks/useTranslations';
import { Puzzle } from 'lucide-react'; // Added Puzzle icon
import { Button } from '@/components/ui/button'; // Added Button

interface HeaderProps {
  onOpenPaletteInfoModal?: () => void; // Optional prop to open palette info modal
}

export default function Header({ onOpenPaletteInfoModal }: HeaderProps) {
  const t = useTranslations();

  return (
    <>
      <header className="py-4 px-4 sm:px-6 border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 text-xl font-bold text-primary hover:opacity-80 transition-opacity" aria-label={t.header.homeLinkAriaLabel}>
            <Image 
              src="/dvizioon-logo-avatar.png" 
              alt={t.header.logoAlt}
              width={36} 
              height={36} 
              className="h-9 w-auto sm:h-10 rounded-sm"
              priority 
            />
            <span className="text-xl sm:text-2xl">{t.header.siteTitle}</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {onOpenPaletteInfoModal && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenPaletteInfoModal}
                className="w-9 h-9 hover:bg-accent hover:text-accent-foreground rounded-full"
                aria-label={t.header.paletteInfoAriaLabel}
                title={t.header.paletteInfoAriaLabel}
              >
                <Puzzle className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
