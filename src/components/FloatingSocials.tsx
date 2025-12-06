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

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 600);
  }, []);

  return (
    <div
      className={cn(
        "fixed right-0 top-1/2 z-50 flex flex-col transition-all duration-700 ease-out",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
      style={{ transform: isVisible ? 'translateY(-100%)' : 'translateY(-100%) translateX(100%)' }}
    >
      {socials.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-center w-10 h-10",
            "bg-card/80 backdrop-blur-sm border-l border-t border-b border-border/40",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent/50 transition-all duration-300",
            "hover:shadow-[0_0_15px_hsl(var(--foreground)/0.08)]",
            index === 0 && "rounded-tl-lg",
            index === socials.length - 1 && "rounded-bl-lg border-b"
          )}
          style={{
            transitionDelay: `${index * 80}ms`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
          }}
          aria-label={social.label}
        >
          <social.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};
