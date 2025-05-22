
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/types/project';
import { type DvizioonAgentInput, type DvizioonAgentOutput, askDvizioonAgent } from '@/ai/flows/dvizioon-agent-flow';
import { useLanguageContext } from '@/contexts/LanguageContext';

import Header from '@/components/layout/Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import ProjectsSection from './ProjectsSection';
import TimelineSection from './TimelineSection';
import { Separator } from '@/components/ui/separator';
import ChatWidget from '@/components/chat/ChatWidget';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ImagePreviewModal from '@/components/portfolio/ImagePreviewModal';
import ProjectPreviewModal from '@/components/portfolio/ProjectPreviewModal';
import PaletteInfoModal from '@/components/portfolio/PaletteInfoModal';
import ThreeCanvas from '@/components/three/ThreeCanvas';
import { useTranslations } from '@/hooks/useTranslations';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  isLoading?: boolean;
}

export default function PortfolioClientPage() {
  const t = useTranslations();
  const { locale } = useLanguageContext();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectFetchError, setProjectFetchError] = useState<string | null>(null);

  const [imageToPreview, setImageToPreview] = useState<Project | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [projectLinkForModal, setProjectLinkForModal] = useState<string | undefined>(undefined);
  const [projectTitleForModal, setProjectTitleForModal] = useState<string | undefined>(undefined);
  const [isProjectPreviewModalOpen, setIsProjectPreviewModalOpen] = useState(false);

  const [isPaletteInfoModalOpen, setIsPaletteInfoModalOpen] = useState(false);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>(undefined);
  const [chatWidgetKey, setChatWidgetKey] = useState('chat-key-0');

  const handleOpenPaletteInfoModal = () => setIsPaletteInfoModalOpen(true);
  const handleClosePaletteInfoModal = () => setIsPaletteInfoModalOpen(false);

  const fetchAgentResponse = useCallback(async (userMessageText: string) => {
    const loadingMessageId = Date.now().toString() + '-loading';
    setChatMessages(prev => [...prev, { id: loadingMessageId, sender: 'agent', text: t.chatWidget.agentTyping || "Thinking...", isLoading: true }]);

    try {
      const agentInput: DvizioonAgentInput = {
        userMessage: userMessageText,
        currentLanguage: locale,
      };
      const response: DvizioonAgentOutput = await askDvizioonAgent(agentInput);
      setChatMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId 
        ? { ...msg, text: response.agentResponse, isLoading: false, id: Date.now().toString() + '-agent' } // Update existing to final
        : msg
      ));
    } catch (error) {
      console.error("Error calling Vizioon agent:", error);
      const errorMessageText = t.chatWidget.errorMessage || "Sorry, I had trouble connecting. Please try again later.";
      setChatMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId 
        ? { ...msg, text: errorMessageText, isLoading: false, id: Date.now().toString() + '-error' } // Update existing to final error
        : msg
      ));
    }
  }, [locale, t.chatWidget.agentTyping, t.chatWidget.errorMessage, askDvizioonAgent]);

  const handleSendMessage = useCallback(async (userMessageText: string) => {
    if (!userMessageText.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text: userMessageText,
    };
    setChatMessages(prev => [...prev, userMessage]);
    await fetchAgentResponse(userMessageText);
  }, [fetchAgentResponse]);

  const handleChatOpenChange = (open: boolean) => {
    setIsChatWidgetOpen(open);
    if (!open) {
      setChatInitialMessage(undefined); // Clear initial message if chat is closed
    } else if (open && chatMessages.length === 0 && !chatInitialMessage && t.chatWidget.initialGreeting) {
      // Add initial greeting if chat is opened plainly and messages are empty
      setChatMessages([{ id: Date.now().toString() + '-greeting', sender: 'agent', text: t.chatWidget.initialGreeting }]);
    }
  };

  const handleAskAI = useCallback((project: Project) => {
    const initialMsgText = t.projectsSection.askAgentAriaLabel.replace('{projectTitle}', project.title);
    setChatInitialMessage(initialMsgText); // This will be picked up by ChatWidget's useEffect or handled here
    
    // Ensure chat messages are clear or this message is the first if chat was closed
    const userMessage: Message = {
      id: Date.now().toString() + '-user-initial',
      sender: 'user',
      text: initialMsgText,
    };
    // Add the user's initial question about the project
    setChatMessages(prev => [userMessage]); // Start fresh or add, depending on desired UX
    fetchAgentResponse(initialMsgText); // Then fetch agent response
    
    setIsChatWidgetOpen(true); // Open the chat
    setChatWidgetKey(prev => `chat-key-${parseInt(prev.split('-')[2] || '0') + 1}`);
  }, [t.projectsSection.askAgentAriaLabel, fetchAgentResponse, t.chatWidget.initialGreeting]);


  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      setProjectFetchError(null);
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjectFetchError(t.projectsSection.fetchError || "Failed to load projects. Please try again later.");
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [t.projectsSection.fetchError]);

  const handleViewImage = (project: Project) => {
    setImageToPreview(project);
    setIsImageModalOpen(true);
  };
  const handleCloseImageModal = () => setIsImageModalOpen(false);

  const handleViewProjectLink = (project: Project) => {
    if (project.link) {
      setProjectLinkForModal(project.link);
      setProjectTitleForModal(project.title);
      setIsProjectPreviewModalOpen(true);
    }
  };
  const handleCloseProjectPreviewModal = () => setIsProjectPreviewModalOpen(false);

  useEffect(() => {
    const shouldOverrideCursor = isImageModalOpen || isChatWidgetOpen || isProjectPreviewModalOpen || isPaletteInfoModalOpen;
    if (typeof document !== 'undefined') {
      if (shouldOverrideCursor) {
        document.body.classList.add('cursor-default-override');
      } else {
        document.body.classList.remove('cursor-default-override');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('cursor-default-override');
      }
    };
  }, [isImageModalOpen, isChatWidgetOpen, isProjectPreviewModalOpen, isPaletteInfoModalOpen]);

  return (
    <>
      <ThreeCanvas />
      <Header onOpenPaletteInfoModal={handleOpenPaletteInfoModal} />
      <div className="flex-grow flex flex-col w-full items-center relative z-10">
        <HeroSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 md:space-y-16">
          <ProjectsSection
            projects={projects}
            onViewImage={handleViewImage}
            onAskAI={handleAskAI}
            onViewProjectLink={handleViewProjectLink}
            isLoading={isLoadingProjects}
            error={projectFetchError}
          />
          <Separator className="my-12 md:my-16 bg-border/50" />
          <TimelineSection />
          <Separator className="my-12 md:my-16 bg-border/50" />
          <AboutSection />
          <Separator className="my-12 md:my-16 bg-border/50" />
          <SkillsSection />
          <Separator className="my-12 md:my-16 bg-border/50" />
          <ContactSection />
        </div>

        {isImageModalOpen && imageToPreview && (
          <ImagePreviewModal
            imageUrl={imageToPreview.imageUrl}
            altText={imageToPreview.title}
            isOpen={isImageModalOpen}
            onClose={handleCloseImageModal}
          />
        )}

        {isProjectPreviewModalOpen && projectLinkForModal && projectTitleForModal && (
          <ProjectPreviewModal
            projectUrl={projectLinkForModal}
            projectTitle={projectTitleForModal}
            isOpen={isProjectPreviewModalOpen}
            onClose={handleCloseProjectPreviewModal}
          />
        )}

        <PaletteInfoModal
          isOpen={isPaletteInfoModalOpen}
          onClose={handleClosePaletteInfoModal}
        />

        <ChatWidget
          key={chatWidgetKey}
          isOpen={isChatWidgetOpen}
          onOpenChange={handleChatOpenChange}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          initialMessage={chatInitialMessage}
        />
        <ScrollToTopButton />
      </div>
    </>
  );
}

    