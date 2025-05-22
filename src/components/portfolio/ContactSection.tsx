
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Send, User, MessageSquare } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslations } from "@/hooks/useTranslations";

export default function ContactSection() {
  const t = useTranslations();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted (simulated):", { name, email, message }); 

    toast({
      title: t.contact.toastSuccessTitle,
      description: t.contact.toastSuccessDescription,
      variant: "default",
    });

    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">{t.contact.title}</h2>
        <p className="text-md text-muted-foreground mt-2 px-2">{t.contact.subtitle}</p>
      </div>
      <Card className="max-w-3xl mx-auto shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="p-5 md:p-6">
          <CardTitle className="text-xl md:text-2xl text-primary">{t.contact.formTitle}</CardTitle>
          <CardDescription>{t.contact.formDescription}</CardDescription>
        </CardHeader>
        <CardContent className="p-5 md:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="name" className="text-foreground/80 flex items-center text-sm">
                  <User className="mr-2 h-4 w-4 text-primary" /> {t.contact.nameLabel}
                </Label>
                <Input 
                  id="name" 
                  placeholder={t.contact.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="bg-input/50 focus:bg-input/70 pl-3 text-sm"
                />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="email" className="text-foreground/80 flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-primary" /> {t.contact.emailLabel}
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={t.contact.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="bg-input/50 focus:bg-input/70 pl-3 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="message" className="text-foreground/80 flex items-center text-sm">
                <MessageSquare className="mr-2 h-4 w-4 text-primary" /> {t.contact.messageLabel}
              </Label>
              <Textarea 
                id="message" 
                placeholder={t.contact.messagePlaceholder}
                rows={4} // Slightly reduced rows
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required 
                className="bg-input/50 focus:bg-input/70 pl-3 text-sm"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-5 py-2.5" disabled={isSubmitting}>
                {isSubmitting ? t.contact.sendingButton : <>{t.contact.sendMessageButton} <Send className="ml-2 h-4 w-4" /></>}
              </Button>
            </div>
          </form>
          <div className="mt-8 md:mt-10 pt-6 border-t border-border">
            <h3 className="text-md md:text-lg font-semibold text-center text-foreground/90 mb-4">{t.contact.socialTitle}</h3>
            <div className="flex justify-center space-x-5 md:space-x-6">
              <a href="mailto:danielmartinsjob@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t.contact.emailAriaLabel}>
                <Mail className="h-7 w-7 md:h-8 md:w-8" />
                <span className="sr-only">Email</span>
              </a>
              <a href="https://linkedin.com/in/danielestevao" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t.contact.linkedinAriaLabel}>
                <Linkedin className="h-7 w-7 md:h-8 md:w-8" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com/dvizioon" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t.contact.githubAriaLabel}>
                <Github className="h-7 w-7 md:h-8 md:w-8" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
