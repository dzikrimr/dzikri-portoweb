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
import { AchievementSection } from '@/components/AchievementSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileMenu } from '@/components/MobileMenu';

const Index = () => {
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <StarBackground />
      <FloatingNavbar />
      <div className="hidden md:block">
        <FloatingSocials />
        <ThemeToggle />
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
      <main>
        <HeroSection />
        <TechStackSection />
        <ProjectsCarousel />
        <AboutSection />
        <TimelineSection />
        <AchievementSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
