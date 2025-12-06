"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Step = 'name' | 'email' | 'message' | 'done';

const initialMessages = [
  { id: 1, from: 'them', text: "Hey! I'd love to hear from you.", time: '10:30' },
  { id: 2, from: 'them', text: "What's your name?", time: '10:30' },
];

export const ContactSection = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<Step>('name');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlaceholder = () => {
    switch (step) {
      case 'name': return 'Your name...';
      case 'email': return 'Your email...';
      case 'message': return 'Your message...';
      default: return '';
    }
  };

  const getNextPrompt = (currentStep: Step, value: string) => {
    switch (currentStep) {
      case 'name':
        return `Nice to meet you, ${value}! What's your email?`;
      case 'email':
        return "Perfect! Now, what would you like to talk about?";
      case 'message':
        return "Thanks for reaching out! I'll get back to you soon. ✓";
      default:
        return '';
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || step === 'done') return;

    const newTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });

    setMessages(prev => [...prev, {
      id: Date.now(),
      from: 'me',
      text: inputValue,
      time: newTime
    }]);

    const newFormData = { ...formData, [step]: inputValue };
    setFormData(newFormData);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getNextPrompt(step, inputValue);
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'them',
        text: response,
        time: newTime
      }]);

      if (step === 'name') setStep('email');
      else if (step === 'email') setStep('message');
      else if (step === 'message') {
        setStep('done');
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setFormData({ name: '', email: '', message: '' });
    setStep('name');
    setInputValue('');
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      {/* Section Header */}
      <div className="pb-12">
        <div className="text-center" data-aos="fade-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
            SAY HELLO
          </h2>
          <p className="text-xs text-muted-foreground/60 mt-4 max-w-xs mx-auto">
            Drop me a message and I'll get back to you soon
          </p>
        </div>
      </div>

      {/* Phone Container - centered and fully visible */}
      <div className="flex justify-center">
        {/* Android Phone Frame - scaled to fit */}
        <div
          className="relative w-[280px] sm:w-[320px] md:w-[340px]"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ height: '580px' }}
        >
          {/* Phone outer frame */}
          <div className="relative h-full rounded-[2.5rem] border-[12px] border-foreground/90 bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
            {/* Phone inner bezel */}
            <div className="relative h-full rounded-[2rem] overflow-hidden bg-card/50 flex flex-col">
              {/* Status bar with hole punch camera */}
              <div className="relative h-10 bg-card/80 flex items-center justify-center px-5 shrink-0">
                {/* Hole punch camera - centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground/20 border-2 border-foreground/30">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/50" />
                </div>
                {/* Time */}
                <span className="text-[10px] text-muted-foreground absolute left-5">
                  {currentTime}
                </span>
                {/* Status icons */}
                <div className="flex items-center gap-2 absolute right-5">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-2 bg-muted-foreground/60 rounded-sm" />
                    <div className="w-0.5 h-2.5 bg-muted-foreground/60 rounded-sm" />
                    <div className="w-0.5 h-3 bg-muted-foreground/60 rounded-sm" />
                    <div className="w-0.5 h-3.5 bg-muted-foreground/40 rounded-sm" />
                  </div>
                  <span className="text-[9px] text-muted-foreground ml-1">100%</span>
                </div>
              </div>

              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-border/30 bg-card/50 flex items-center gap-4 shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                  <span className="text-xs text-foreground/70">JD</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">John Doe</p>
                  <p className="text-[9px] text-muted-foreground">online</p>
                </div>
                {step === 'done' && (
                  <button
                    onClick={resetChat}
                    className="text-[9px] text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded border border-border/30"
                  >
                    new
                  </button>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-background/30">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.from === 'me' ? "justify-end" : "justify-start"
                    )}
                    data-aos="fade-up"
                    data-aos-delay={index < 2 ? 200 + index * 50 : 0}
                    data-aos-duration="400"
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-2.5 rounded-2xl",
                        msg.from === 'me'
                          ? "bg-foreground/90 text-background rounded-br-sm"
                          : "bg-accent/40 text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={cn(
                          "text-[9px] mt-1 text-right",
                          msg.from === 'me' ? "text-background/40" : "text-muted-foreground/60"
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-accent/40 rounded-2xl rounded-bl-sm px-5 py-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-4 border-t border-border/30 bg-card/40 shrink-0">
                {step !== 'done' ? (
                  <div className="flex items-center gap-3">
                    <input
                      type={step === 'email' ? 'email' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={getPlaceholder()}
                      className={cn(
                        "flex-1 px-5 py-3 rounded-full text-sm",
                        "bg-background/40 border border-border/40",
                        "text-foreground placeholder:text-muted-foreground/40",
                        "focus:outline-none focus:border-foreground/20",
                        "transition-all duration-200"
                      )}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        "transition-all duration-200",
                        inputValue.trim()
                          ? "bg-foreground/90 text-background hover:bg-foreground"
                          : "bg-muted/50 text-muted-foreground/40 cursor-not-allowed"
                      )}
                    >
                      <span className="text-sm">↑</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-[10px] text-center text-muted-foreground/50 py-2.5">
                    message delivered ✓
                  </p>
                )}
              </div>

              {/* Navigation bar */}
              <div className="h-8 bg-card/60 flex items-center justify-center shrink-0">
                <div className="w-28 h-1.5 rounded-full bg-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
