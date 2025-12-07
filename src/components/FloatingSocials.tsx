"use client";

import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
];

export const FloatingSocials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setTimeout(() => setIsVisible(true), 600);
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-700 ease-out",
        isMobile
          ? "bottom-4 left-1/2 flex-row -translate-x-1/2"
          : "right-0 top-1/2 flex-col",
        isVisible ? "translate-x-0 opacity-100" : isMobile ? "translate-y-full opacity-0" : "translate-x-full opacity-0"
      )}
      style={isMobile
        ? { transform: isVisible ? 'translateX(-50%)' : 'translateX(-50%) translateY(100%)' }
        : { transform: isVisible ? 'translateY(-100%)' : 'translateY(-100%) translateX(100%)' }
      }
    >
      {socials.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-center w-10 h-10",
            "bg-card/80 backdrop-blur-sm border border-border/40",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent/50 transition-all duration-300",
            "hover:shadow-[0_0_15px_hsl(var(--foreground)/0.08)]",
            isMobile
              ? [
                  index === 0 && "rounded-l-lg",
                  index === socials.length - 1 && "rounded-r-lg",
                  "border-r-0",
                  index < socials.length - 1 && "border-r"
                ]
              : [
                  "border-l border-t border-b",
                  index === 0 && "rounded-tl-lg",
                  index === socials.length - 1 && "rounded-bl-lg border-b"
                ]
          )}
          style={{
            transitionDelay: `${index * 80}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? 'translateX(0)'
              : isMobile ? 'translateY(20px)' : 'translateX(20px)',
          }}
          aria-label={social.label}
        >
          <social.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};
