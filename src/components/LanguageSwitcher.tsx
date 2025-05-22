
"use client";

import { useLanguageContext, type Locale } from "@/contexts/LanguageContext"; // Corrected path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale, translations } = useLanguageContext();

  const handleValueChange = (value: string) => {
    setLocale(value as Locale);
  };

  return (
    <Select value={locale} onValueChange={handleValueChange}>
      <SelectTrigger 
        className="w-auto gap-2 border-muted-foreground/30 hover:border-muted-foreground/70 focus:ring-primary h-9 px-3" 
        aria-label={translations.languageSwitcher.ariaLabel}
      >
        <Globe className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        <SelectValue placeholder={translations.languageSwitcher.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">{translations.languageSwitcher.pt}</SelectItem>
        <SelectItem value="en">{translations.languageSwitcher.en}</SelectItem>
      </SelectContent>
    </Select>
  );
}
