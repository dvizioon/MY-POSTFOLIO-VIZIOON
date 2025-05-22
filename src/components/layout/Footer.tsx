
"use client"; 

import { useTranslations } from "@/hooks/useTranslations";
import { useState, useEffect } from "react";

export default function Footer() {
  const t = useTranslations();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This ensures new Date() is only called on the client after hydration
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="py-6 px-6 border-t border-border bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>{t.footer.copyright.replace('{year}', currentYear.toString())}</p>
        <p>{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}

