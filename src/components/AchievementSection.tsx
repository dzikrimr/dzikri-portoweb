"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

gsap.registerPlugin(ScrollTrigger);

// --- KONSTANTA UMUM ---
const INITIAL_TOP_OFFSET_PX = 64; 

// --- FUNGSI UTILITY ---
const formatDate = (dateString: string) => {
    if (dateString.toLowerCase() === 'ongoing') {
        return 'Sedang Berlangsung';
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString; 
    }
    return new Intl.DateTimeFormat('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }).format(date);
};

// --- DATA ACHIEVEMENT ---
const achievements = [
    { id: 1, title: "10+ Projects Completed", description: "Successfully delivered multiple web applications dan digital solutions.", date: "2023-12-15", image: project1, },
    { id: 2, title: "5 Technologies Mastered", description: "Deep expertise in React, Node.js, TypeScript, and modern web technologies.", date: "2023-07-20", image: project2, },
    { id: 3, title: "1000+ Lines of Code", description: "Written and maintained extensive codebases with clean, scalable architecture.", date: "2024-01-30", image: project3, },
    { id: 4, title: "Open Source Contributor", description: "Contributed to various open-source projects and developer communities.", date: "Ongoing", image: project1, },
];

export const AchievementSection = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [responsiveConstants, setResponsiveConstants] = useState({
        CARD_WIDTH: 320,
        CARD_HEIGHT: 200,
        CARD_GAP_Y: 400,
        isDesktop: true,
        FINAL_X_LEFT: -340,
        FINAL_X_RIGHT: 20
    });

    useEffect(() => {
        const calculateConstants = () => {
            const isDesktop = window.innerWidth >= 768;
            
            const CARD_WIDTH = isDesktop ? 320 : 150; 
            const CARD_HEIGHT = isDesktop ? 200 : 100; 
            const GAP_FROM_TRAIL = isDesktop ? 20 : 5; 
            const CARD_GAP_Y = isDesktop ? 400 : 250; 

            let FINAL_X_RIGHT;
            let FINAL_X_LEFT;

            if (isDesktop) {
                FINAL_X_RIGHT = GAP_FROM_TRAIL; // 20
                FINAL_X_LEFT = -(CARD_WIDTH + GAP_FROM_TRAIL); // -340
            } else {
                const MOBILE_OFFSET = 25; // Jarak tambahan dari garis tengah
                FINAL_X_RIGHT = CARD_WIDTH / 2 + MOBILE_OFFSET; // 75 + 40 = 115
                FINAL_X_LEFT = -(CARD_WIDTH + CARD_WIDTH / 2 + MOBILE_OFFSET); // -(150 + 75 + 40) = -265
                
                FINAL_X_RIGHT = MOBILE_OFFSET; // 40
                FINAL_X_LEFT = -(CARD_WIDTH + MOBILE_OFFSET); // -190
            }


            setResponsiveConstants({
                CARD_WIDTH,
                CARD_HEIGHT,
                CARD_GAP_Y,
                isDesktop,
                FINAL_X_LEFT,
                FINAL_X_RIGHT
            });
            return { CARD_GAP_Y, FINAL_X_RIGHT, FINAL_X_LEFT, isDesktop };
        };

        const { CARD_GAP_Y, FINAL_X_RIGHT, FINAL_X_LEFT, isDesktop } = calculateConstants();
        const section = sectionRef.current;
        const plane = planeRef.current;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        if (!section || !plane || cards.length === 0) return;

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        gsap.set(plane, { y: -100, opacity: 0 });
        
        cards.forEach((card, index) => {
            const finalX = index % 2 === 0 ? FINAL_X_LEFT : FINAL_X_RIGHT;
            // Set kartu ke posisi horizontal akhir dan opacity 0. 
            gsap.set(card, { opacity: 0, x: finalX, y: 0 }); 
        }); 

        const checkpoints = [
            { cardIndex: 0, side: 'left' },
            { cardIndex: 1, side: 'right' },
            { cardIndex: 2, side: 'left' },
            { cardIndex: 3, side: 'right' },
        ];
        
        const N = achievements.length;
        const CARD_VERTICAL_SEGMENT = CARD_GAP_Y; 
        
        // --- 1. PERHITUNGAN TIMING DAN JARAK Y ---
        
        const PLANE_IN_OUT_DURATION = 0.5; // Durasi Pesawat masuk/keluar
        const CARD_HOLD_DURATION = 1.0; // Waktu setiap kartu terlihat penuh
        const CARD_TRANSITION_DURATION = 0.4; // Durasi transisi opacity halus
        
        // Durasi total gerakan kontainer kartu (4 kartu x 1.0s)
        const totalCardsDuration = N * CARD_HOLD_DURATION; // 4.0s
        
        // Jarak Vertical Container (Y)
        const Y_move_distance = N * CARD_VERTICAL_SEGMENT; // 4 * CARD_GAP_Y
        
        // CHECKPOINT Y (Posisi Pesawat relatif terhadap section container. Plane berada di top-1/4)
        const CHECKPOINT_Y_PX = window.innerHeight * 0.25; 
        
        // Posisi vertikal pusat Card 0 (Relatif ke Container y: 0)
        const Y_initial_center = INITIAL_TOP_OFFSET_PX + CARD_VERTICAL_SEGMENT * 0.5;
        
        // Y translation yang dibutuhkan agar Card 0 berada tepat di bawah Plane
        const Y_start_container = -(Y_initial_center - CHECKPOINT_Y_PX);
        
        // Y translation yang dibutuhkan agar Card 3 selesai melewati Plane
        const Y_end_container = Y_start_container - Y_move_distance; 

        // Pin Scroll Length 
        const pinScrollLength = Y_move_distance * 4; 
        const totalTimelineDuration = PLANE_IN_OUT_DURATION + totalCardsDuration + PLANE_IN_OUT_DURATION; 


        // --- 2. KONFIGURASI SCROLLTRIGGER DENGAN PINNING ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: isDesktop ? "top 5%" : "top 5%",
                end: `+=${pinScrollLength}`, 
                scrub: 1,
                pin: section, 
            }
        });

        const cardContainer = document.querySelector('#card-container');

        // 3. ANIMASI PESAWAT MASUK
        tl.to(plane, { y: 0, opacity: 1, duration: PLANE_IN_OUT_DURATION, ease: "power2.out" }, 0); 

        // 4. ANIMASI CONTAINER Y (Gerakan vertikal utama)
        if (cardContainer) {
            // Kontainer bergerak dari posisi Card 0 di bawah Plane hingga Card 3 di bawah Plane
            tl.to(cardContainer, 
                { y: Y_end_container, duration: totalCardsDuration, ease: "none" }, 
                PLANE_IN_OUT_DURATION // Mulai setelah Pesawat masuk (0.5s)
            );
        }
        
        // 5. SINKRONISASI CARD VISIBILITY (Hanya Opacity)
        checkpoints.forEach((checkpoint, index) => {
            const card = cards[checkpoint.cardIndex];

            // Waktu ketika Card ini seharusnya mencapai titik CHECKPOINT
            const cardStartTime = PLANE_IN_OUT_DURATION + (index * CARD_HOLD_DURATION);
            
            // A. Card Muncul Penuh (Opacity 0 -> 1)
            tl.to(card, 
                { opacity: 1, duration: CARD_TRANSITION_DURATION, ease: "power2.out" }, 
                cardStartTime 
            );
            
            // B. Card Hilang (Opacity 1 -> 0)
            tl.to(card, 
                { opacity: 0, duration: CARD_TRANSITION_DURATION, ease: "power2.in" }, 
                // Hilang sebelum Durasi Tahan berakhir
                cardStartTime + CARD_HOLD_DURATION - CARD_TRANSITION_DURATION
            );
        });

        // 6. ANIMASI PESAWAT KELUAR
        const exitTime = totalTimelineDuration - PLANE_IN_OUT_DURATION; 
        tl.to(plane, { y: "+=100", opacity: 0, duration: PLANE_IN_OUT_DURATION, ease: "power2.in" }, exitTime);


        window.addEventListener('resize', calculateConstants);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', calculateConstants);
        };
    }, []); 

    const { CARD_WIDTH, CARD_HEIGHT, isDesktop } = responsiveConstants;

    return (
        <section id="achievements" ref={sectionRef} className="px-6 md:px-12 lg:px-20 py-12 md:py-18 pb-6 md:pb-12 lg:pb-18 relative min-h-screen">
            <div className="max-w-6xl mx-auto">
                
                {/* --- SECTION HEADER --- */}
                <div className="text-center pt-5 pb-16" data-aos="fade-up">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        Milestones
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
                        ACHIEVEMENTS
                    </h2>
                </div>

                {/* Animation Container - KONTENER PINNING UTAMA */}
                <div 
                    className="relative h-screen flex justify-center overflow-hidden"
                    style={{
                        // Masking gradient untuk efek fade in/out progresif kartu
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    }}
                >
                    
                    {/* Fighter Plane (STATIONARY DI TENGAH VISUAL) */}
                    <div
                        ref={planeRef}
                        className={`absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 z-30`}
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

                    {/* Card Container - INI YANG AKAN DI-TRANSLATE Y */}
                    <div id="card-container" className="relative w-full">
                        {achievements.map((achievement, index) => (
                            <div
                                key={achievement.id}
                                ref={el => { cardsRef.current[index] = el; }}
                                className="absolute"
                                style={{
                                    // Posisi Y dari setiap kartu
                                    top: `${INITIAL_TOP_OFFSET_PX + responsiveConstants.CARD_GAP_Y * (index + 0.5)}px`,
                                    left: '50%', 
                                    transform: 'translateY(100%)', 
                                }}
                            >
                                <Card
                                    className={`relative overflow-hidden shadow-lg border-2 border-primary/20 transition-all duration-300 ${!isDesktop ? 'cursor-pointer' : 'hover-lift'}`}
                                    style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
                                    onClick={!isDesktop ? () => setSelectedAchievement(achievement) : undefined}
                                >
                                    
                                    {/* --- MOBILE VIEW --- */}
                                    {!isDesktop ? (
                                        <CardContent className="p-3 h-full flex flex-col items-center justify-center text-center">
                                            <h3 className="text-sm font-bold text-foreground leading-snug">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                                                  {formatDate(achievement.date)}
                                            </p>
                                            <p className="text-xs text-primary/80 mt-1">Tap for details</p>
                                        </CardContent>
                                    ) : (
                                    /* --- DESKTOP VIEW --- */
                                        <>
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

                                            <CardContent 
                                                className="p-3 absolute bottom-0 w-full" 
                                                style={{ height: '50%' }}
                                            >
                                                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                      {formatDate(achievement.date)}
                                                </p>
                                                <h3 className="text-base font-semibold text-foreground leading-snug truncate">
                                                    {achievement.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                                    {achievement.description}
                                                </p>
                                            </CardContent>
                                        </>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div> {/* End #card-container */}

                </div> {/* End Animation Container */}
            </div>

            {/* --- MOBILE MODAL / DIALOG --- */}
            <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
                <DialogContent className="max-w-sm mx-auto p-0 border-none rounded-xl overflow-hidden glass-card">
                    {selectedAchievement && (
                        <>
                            <div className="relative w-full h-48 overflow-hidden">
                                <Image
                                    src={selectedAchievement.image}
                                    alt={selectedAchievement.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="opacity-70"
                                    unoptimized={true}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent flex flex-col justify-end p-4">
                                    <DialogTitle className="text-xl font-bold text-foreground">
                                        {selectedAchievement.title}
                                    </DialogTitle>
                                    <p className="text-sm text-primary/80 uppercase tracking-wider">
                                        {formatDate(selectedAchievement.date)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="p-4 pt-0">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedAchievement.description}
                                </p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};