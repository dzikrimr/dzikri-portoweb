"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const CARD_WIDTH = isMobile ? 280 : 320;
const CARD_HEIGHT = isMobile ? 160 : 200;
const GAP_FROM_TRAIL = isMobile ? 15 : 20;
const CARD_GAP_Y = isMobile ? 300 : 400;
const INITIAL_TOP_OFFSET = 16;
const FINAL_X_RIGHT = GAP_FROM_TRAIL;
const FINAL_X_LEFT = -(CARD_WIDTH + GAP_FROM_TRAIL);

const achievements = [
  {
    id: 1,
    title: "10+ Projects Completed",
    description: "Successfully delivered multiple web applications dan digital solutions.",
    image: project1, 
  },
  {
    id: 2,
    title: "5 Technologies Mastered",
    description: "Deep expertise in React, Node.js, TypeScript, and modern web technologies.",
    image: project2,
  },
  {
    id: 3,
    title: "1000+ Lines of Code",
    description: "Written and maintained extensive codebases with clean, scalable architecture.",
    image: project3, 
  },
  {
    id: 4,
    title: "Open Source Contributor",
    description: "Contributed to various open-source projects and developer communities.",
    image: project1,
  },
];

export const AchievementSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const plane = planeRef.current;
    const trail = trailRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !plane || !trail || !cards.length) return;

    gsap.set(plane, { y: -100, opacity: 0 });
    gsap.set(trail, { height: '0%' });
    cards.forEach(card => gsap.set(card, { opacity: 0, x: 0, y: 0 })); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "bottom top", 
        scrub: 1,
        pin: false,
      }
    });

    // 1. Initial Fade In Pesawat
    tl.to(plane, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, 0); 

    const checkpoints = [
      { cardIndex: 0, side: 'left' },
      { cardIndex: 1, side: 'right' },
      { cardIndex: 2, side: 'left' },
      { cardIndex: 3, side: 'right' },
    ];

    checkpoints.forEach((checkpoint, index) => {
      const checkpointLabel = `checkpoint${index}`;
      const moveDistance = CARD_GAP_Y; 

      // 2. Gerakkan Pesawat dan Trail
      tl.addLabel(checkpointLabel); 

      tl.to(plane, { y: `+=${moveDistance}`, duration: 1, ease: "none" }, checkpointLabel);
      tl.to(trail, { height: `+=${moveDistance}`, duration: 1, ease: "none" }, checkpointLabel);

      // 3. Animasi Card 
      const card = cards[checkpoint.cardIndex];
      
      let finalX;

      if (checkpoint.side === 'left') {
          finalX = FINAL_X_LEFT; 
      } else {
          finalX = FINAL_X_RIGHT;
      }
      
      tl.fromTo(card, 
        {
            opacity: 0,
            x: finalX,
            y: 0 
        },
        {
            opacity: 1,
            x: finalX,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        },
        `${checkpointLabel}+=0.3` 
      );
    });

    tl.to(plane, { y: `+=${CARD_GAP_Y / 4}`, duration: 0.5, ease: "none" });
    tl.to(trail, { height: `+=${CARD_GAP_Y / 4}`, duration: 0.5, ease: "none" }, "<");


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="section-padding relative min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center pt-10 pb-16" data-aos="fade-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Milestones
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
            ACHIEVEMENTS
          </h2>
        </div>

        {/* Animation Container */}
        <div className="relative h-[200vh] flex justify-center">
          {/* Vertical Trail Line */}
          <div
            ref={trailRef}
            className={`absolute left-1/2 top-[${INITIAL_TOP_OFFSET * 4}px] w-0.5 bg-foreground transform -translate-x-1/2 z-0`}
            style={{ height: '0px' }}
          />

          {/* Fighter Plane */}
          <div
            ref={planeRef}
            className={`absolute left-1/2 top-[${INITIAL_TOP_OFFSET * 4}px] transform -translate-x-1/2 z-10`}
          >
            <svg 
                height="32px"
                width="32px" 
                viewBox="0 0 486.357 486.357" 
                className="text-foreground drop-shadow-lg"
                style={{ transform: 'rotate(180deg)' }} 
            >
                <g>
                    <g>
                        <path 
                            style={{ fill: 'currentColor' }} 
                            d="M465.093,325.805L361.079,295.9c-60.225-28.011-71.312-74.88-73.23-87.39v-86.894
                            c0-11.599-4.674-22.093-12.201-29.767l-12.949-46.097c0-15.274-4.251-27.653-19.525-27.653s-19.517,12.388-19.517,27.662
                            l-13.176,46.374c-7.381,7.649-11.973,18.013-11.973,29.49v83.659c0,0-3.682,58.404-74.157,90.886l0,0L21.272,325.805
                            c0,0-19.85,25.524-21.272,62.387l96.129,10.088l-10.697,50.34c-1.861,8.787,3.739,17.42,12.526,19.281
                            c1.138,0.244,2.276,0.358,3.39,0.358c7.511,0,14.258-5.243,15.891-12.876l11.413-53.689l33.49,3.512
                            c3.097-18.541,8.763-34.644,16.834-43.285c-1.878,4.641-3.642,10.153-5.235,16.347c-2.081,8.12-3.829,17.444-5.08,27.621
                            c-1.276,10.38-2.04,21.589-2.04,33.352h51.576c0-9.868-0.545-19.379-1.496-28.312c-0.423-3.934-0.935-7.706-1.504-11.396
                            c-1.398-9.112-3.211-17.411-5.284-24.638c-1.553-5.406-3.235-10.21-4.999-14.282c7.925,7.421,13.689,21.817,17.143,38.92
                            c0.797,3.942,1.463,8.007,2.008,12.168l19.127,2.008l18.582-1.951c0.545-4.186,1.219-8.275,2.016-12.225
                            c3.251-16.127,8.559-29.872,15.802-37.611c-1.878,4.641-3.642,10.153-5.235,16.347c-1.642,6.397-3.073,13.55-4.219,21.264
                            c-0.553,3.723-1.065,7.535-1.471,11.502c-0.91,8.909-1.439,18.379-1.439,28.206h51.576c0-11.73-0.788-22.898-2.105-33.246
                            c-1.479-11.665-3.633-22.199-6.186-31.1c-1.553-5.406-3.235-10.21-4.999-14.282c8.795,8.234,14.924,25.077,18.192,44.642
                            l31.88-3.349l11.356,53.47c1.626,7.641,8.372,12.876,15.891,12.876c1.122,0,2.252-0.114,3.39-0.358
                            c8.787-1.861,14.396-10.494,12.526-19.281l-10.648-50.113l98.258-10.315C484.943,351.329,465.093,325.805,465.093,325.805z"/>
                    </g>
                </g>
            </svg>
          </div>

          {/* Achievement Cards */}
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="absolute"
              style={{
                top: `${(INITIAL_TOP_OFFSET * 4) + CARD_GAP_Y * (index + 0.5)}px`, 
                left: '50%', 
                transform: 'translateY(-50%)', 
              }}
            >
              <Card 
                className="hover-lift overflow-hidden shadow-lg border-2 border-primary/20"
                style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
              >
                <div className="relative w-full" style={{ height: '50%' }}>
                  <Image
                    key={achievement.id} 
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="opacity-70"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                </div>

                <CardContent className="p-3 absolute bottom-0 w-full" style={{ height: '50%' }}>
                  <h3 className="text-base font-semibold text-foreground leading-snug truncate">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
