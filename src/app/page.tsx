"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FloatingNavbar } from '@/components/FloatingNavbar';
import { FloatingSocials } from '@/components/FloatingSocials';
import { StarBackground } from '@/components/StarBackground';
import { HeroSection } from '@/components/HeroSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { AboutSection } from '@/components/AboutSection';
import { TimelineSection } from '@/components/TimelineSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SplashScreen } from '@/components/SplashScreen';

const Index = () => {
  const [splashShown, setSplashShown] = useState(false); 

  useEffect(() => {
    const isPostSplashState = window.history.state?.postSplash;
    if (!isPostSplashState) {
      setSplashShown(false);
    }

    window.scrollTo(0, 0);

    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 80,
      delay: 0,
      anchorPlacement: 'top-bottom',
    });

    // Handle back navigation
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.postSplash) {
        setSplashShown(true);
      } else {
        setSplashShown(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (splashShown) {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 0);
      setTimeout(() => window.scrollTo(0, 0), 100);
      setTimeout(() => window.scrollTo(0, 0), 200);
    }
  }, [splashShown]);

  const handleSplashComplete = () => {
    setSplashShown(true);
    window.history.replaceState({ postSplash: true }, '', window.location.pathname);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {!splashShown && <SplashScreen onComplete={handleSplashComplete} />}
      {splashShown && (
        <>
          <StarBackground />
          <FloatingNavbar />
          <FloatingSocials />
          <ThemeToggle />
          <main>
            <HeroSection />
            <TechStackSection />
            <ProjectsCarousel />
            <AboutSection />
            <TimelineSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
