
"use client";

import { useState, useRef, useEffect, type FormEvent, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, UserCircle } from 'lucide-react';
import { checkAgentLiveness, type AgentStatusOutput } from '@/ai/flows/agent-status-flow';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'; // Ensure this is imported
import { useLanguageContext } from '@/contexts/LanguageContext';


interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  isLoading?: boolean;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  messages: Message[];
  onSendMessage: (messageText: string) => void;
  initialMessage?: string;
}

export default function ChatWidget({ 
  isOpen, 
  onOpenChange, 
  messages,
  onSendMessage,
  initialMessage
}: ChatWidgetProps) {
  const t = useTranslations();
  const { locale } = useLanguageContext();
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  
  const [agentStatus, setAgentStatus] = useState<'online' | 'offline' | 'connecting'>('connecting');
  const [agentVersion] = useState('1.0'); 
  const statusCheckedRef = useRef(false);
  const initialGreetingSentRef = useRef(false); // To track if initial greeting was added to messages

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    const performAgentStatusCheck = async () => {
      setAgentStatus('connecting');
      try {
        const liveness: AgentStatusOutput = await checkAgentLiveness();
        if (liveness.status === 'ok') {
          setAgentStatus('online');
        } else {
          setAgentStatus('offline');
        }
      } catch (error) {
        console.error("Agent liveness check failed:", error);
        setAgentStatus('offline');
      }
    };

    if (isOpen && !statusCheckedRef.current) { 
      performAgentStatusCheck();
      statusCheckedRef.current = true;
    }
    if (!isOpen) { 
        statusCheckedRef.current = false; // Reset for next open
        // initialGreetingSentRef is reset by PortfolioClientPage logic if needed
    }
  }, [isOpen]);

  // Effect to handle initial greeting IF chat is opened plainly (no initialMessage from prop) AND messages are empty
   useEffect(() => {
    const greetingText = t.chatWidget?.initialGreeting;

    if (isOpen && !initialMessage && messages.length === 0 && !initialGreetingSentRef.current && greetingText) {
      // Directly add the agent's greeting to the messages array via parent's onSendMessage
      // To make it appear *from* the agent, we can't use onSendMessage directly as that creates a user message first.
      // Instead, PortfolioClientPage should handle this.
      // For now, to make it work within the widget if it's responsible for its own greeting:
      // This requires a way to add a message *as* the agent.
      // Let's adjust PortfolioClientPage to handle this initial greeting.
      // For this iteration, we'll assume parent will add it.
      // We'll set the ref true here to prevent repeated attempts *within this widget's logic*
      // if the parent doesn't add it immediately.
      // The parent (PortfolioClientPage) will now be responsible for adding this greeting to `chatMessages`.
      initialGreetingSentRef.current = true; 
    }
    if (!isOpen) {
        initialGreetingSentRef.current = false; // Reset when chat closes
    }
  }, [isOpen, initialMessage, messages, t.chatWidget?.initialGreeting]);


  const handleFormSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const userMessageText = inputValue.trim();
    if (!userMessageText) return;

    if (agentStatus !== 'online') {
        alert(t.chatWidget.agentOfflineError || "Agent is offline. Please try again later.");
        return;
    }
    
    onSendMessage(userMessageText);
    setInputValue(''); 
  };
  
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'agent' && lastMessage.isLoading) {
        setIsAgentTyping(true);
      } else {
        setIsAgentTyping(false);
      }
    } else {
      setIsAgentTyping(false);
    }
    scrollToBottom();
  }, [messages, scrollToBottom]);
  

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            className="chat-widget-button fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 p-0 group
                        bg-primary hover:bg-primary/90 text-primary-foreground
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        transform transition-all hover:scale-105 active:scale-95 overflow-visible"
            aria-label={t.chatWidget.openChatLabel}
          >
            <Image
              src="/dvizioon-logo-avatar.png"
              alt={t.header.logoAlt}
              width={60} 
              height={60} 
              className="object-contain transition-transform duration-300 group-hover:scale-110 rounded-full"
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col p-0">
          <SheetHeader className="p-4 border-b border-border space-y-1.5">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Bot className="h-6 w-6 text-primary" />
              <SheetTitle className="text-lg">{t.chatWidget.title}</SheetTitle>
            </div>
             <div className="text-xs text-muted-foreground flex flex-col items-center sm:items-end sm:flex-row sm:justify-end gap-x-1.5 gap-y-0.5 pt-0.5">
                <div className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full inline-block ${
                        agentStatus === 'online' ? 'bg-green-500' :
                        agentStatus === 'offline' ? 'bg-red-500' :
                        'bg-yellow-500 animate-pulse'
                    }`}></span>
                    <span className="capitalize">
                        {
                        agentStatus === 'online' ? t.chatWidget.statusOnline :
                        agentStatus === 'offline' ? t.chatWidget.statusOffline :
                        t.chatWidget.statusConnecting
                        }
                    </span>
                </div>
                <span className="hidden sm:inline-block mx-0.5 text-muted-foreground/50">|</span>
                <span>{t.chatWidget.agentVersionLabel} {agentVersion}</span>
            </div>
          </SheetHeader>
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message flex items-end gap-2 ${
                    msg.sender === 'user' ? 'user justify-end' : 'agent justify-start'
                  }`}
                >
                  {msg.sender === 'agent' && <Bot className="h-6 w-6 text-primary self-start shrink-0" />}
                  <div
                    className={`p-3 rounded-lg max-w-[85%] break-words
                      ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none'
                                              : 'bg-card text-card-foreground rounded-bl-none border border-border/50'}
                      ${msg.isLoading ? 'animate-pulse' : ''}
                    `}
                  >
                    {/* --- START: REACT-MARKDOWN RENDERING (Enabled) --- */}
                    {/* Ensure react-markdown is installed: npm install react-markdown */}
                    {/* If you still get "Module not found" after install, ensure server is restarted. */}
                    {msg.sender === 'agent' && !msg.isLoading ? (
                      <div className="prose prose-sm dark:prose-invert max-w-full prose-p:my-1 prose-ul:my-1 prose-ol:my-1">
                        <ReactMarkdown
                          components={{
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      // Fallback for user messages or when agent message is loading
                      msg.text.split('\n').map((line, i) => <p key={i} className="m-0 p-0">{line}</p>)
                    )}
                    {/* --- END: REACT-MARKDOWN RENDERING (Enabled) --- */}
                  </div>
                  {msg.sender === 'user' && <UserCircle className="h-6 w-6 text-muted-foreground self-start shrink-0" />}
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="p-4 border-t border-border bg-background">
            <form onSubmit={handleFormSubmit} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder={t.chatWidget.inputPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-input focus:bg-input/70"
                disabled={isAgentTyping || agentStatus === 'connecting'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleFormSubmit();
                  }
                }}
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isAgentTyping || !inputValue.trim() || agentStatus !== 'online'}>
                <Send className="h-5 w-5" />
                <span className="sr-only">{t.chatWidget.sendButtonLabel}</span>
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

    