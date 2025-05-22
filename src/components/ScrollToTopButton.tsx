
"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

export default function ScrollToTopButton() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="primary"
      size="icon"
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? 'opacity-100' : 'hidden'}`}
      aria-label={t.scrollToTop.ariaLabel}
      title={t.scrollToTop.title}
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
