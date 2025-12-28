"use client";

import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const socials = [
  { icon: Github, href: process.env.GITHUB_URL!, label: 'GitHub' },
  { icon: Linkedin, href: process.env.LINKEDIN_URL!, label: 'LinkedIn' },
  { icon: Mail, href: process.env.EMAIL_URL!, label: 'Email' },
];

export const FloatingSocials = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 600);
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col transition-all duration-700 ease-out",
        "right-0 top-[calc(50%-60px)]",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      {socials.map((social, index) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-center w-10 h-10",
            "bg-card/80 backdrop-blur-sm border-l border-t border-border/40",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-accent/50 transition-all duration-300",
            index === socials.length - 1 && "rounded-bl-xl border-b"
          )}
          style={{ transitionDelay: `${index * 80}ms` }}
          aria-label={social.label}
        >
          <social.icon size={18} />
        </a>
      ))}
    </div>
  );
};