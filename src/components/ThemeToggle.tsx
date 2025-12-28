"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle('light', !initialDark);
    setTimeout(() => setIsVisible(true), 1000);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('light', !newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-700 ease-out",
        "right-0 top-[calc(50%-116px)]",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <button
        onClick={toggleTheme}
        className={cn(
          "group flex items-center justify-center w-10 h-14 rounded-tl-xl",
          "bg-card/80 backdrop-blur-sm border-l border-t border-border/40",
          "hover:bg-accent/50 transition-all duration-300 cursor-pointer",
        )}
        aria-label="Toggle theme"
      >

        <div className="relative w-5 h-10 rounded-full bg-muted/60 border border-border/50 transition-colors duration-300">
          <div 
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
              isDark ? "top-0.5 bg-foreground" : "top-[22px] bg-muted-foreground"
            )}
          >
            {isDark ? <Moon size={10} className="text-background" /> : <Sun size={10} className="text-background" />}
          </div>
        </div>
      </button>
    </div>
  );
};