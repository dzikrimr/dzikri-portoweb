"use client";

import { useEffect, useState } from 'react';
import GlitchText from '@/components/ui/glitchtext';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [glitch, setGlitch] = useState(false);
  const [tvOff, setTvOff] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGlitch(true), 1500);   
    const t2 = setTimeout(() => setTvOff(true), 2200);   
    const t3 = setTimeout(onComplete, 3400);              

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-black overflow-hidden origin-center
        ${tvOff ? 'tv-turn-off' : ''}
      `}
    >
      <GlitchText
        active={glitch}
        speed={0.6}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white select-none"
      >
        DSpace
      </GlitchText>
    </div>
  );
};