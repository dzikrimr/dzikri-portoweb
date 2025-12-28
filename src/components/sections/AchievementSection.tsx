"use client";

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { 
    Trophy, Medal, Award, Crown, Rocket,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAchievements } from '@/app/actions';
import { Achievement as DBAchievement } from '@/db/schema';


type AchievementTier = 'gold' | 'silver' | 'bronze' | 'special' | 'default';

interface Achievement extends Omit<DBAchievement, 'tier'> {
    tier: AchievementTier;
}



const getTierStyles = (tier: AchievementTier) => {
    switch (tier) {
        case 'gold':
            return {
                icon: Trophy,
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/50",
                glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            };
        case 'silver':
            return {
                icon: Medal,
                color: "text-slate-300",
                bg: "bg-slate-300/10",
                border: "border-slate-300/50",
                glow: "shadow-[0_0_15px_rgba(203,213,225,0.3)]"
            };
        case 'bronze':
            return {
                icon: Award,
                color: "text-orange-400",
                bg: "bg-orange-400/10",
                border: "border-orange-400/50",
                glow: "shadow-[0_0_15px_rgba(251,146,60,0.3)]"
            };
        case 'special':
            return {
                icon: Crown,
                color: "text-purple-400",
                bg: "bg-purple-400/10",
                border: "border-purple-400/50",
                glow: "shadow-[0_0_15px_rgba(192,132,252,0.3)]"
            };
        default:
            return {
                icon: CheckCircle2,
                color: "text-primary",
                bg: "bg-primary/10",
                border: "border-primary/50",
                glow: "shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            };
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date);
};

export const AchievementSection = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [selectedAchievementId, setSelectedAchievementId] = useState<number | null>(null);
    const [imageLoading, setImageLoading] = useState<{[key: number]: boolean}>({});

    const handleImageLoad = (id: number) => {
        setImageLoading(prev => ({ ...prev, [id]: false }));
    };

    const handleImageLoadStart = (id: number) => {
        setImageLoading(prev => ({ ...prev, [id]: true }));
    };

    useEffect(() => {
        getAchievements().then((data) => {

            setAchievements(data as unknown as Achievement[]);
        });
    }, []);

    return (
        <section id="achievements" className="relative w-full py-20 md:py-24 min-h-[50vh] flex flex-col items-center overflow-visible">

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto w-full px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Rocket className="w-3 h-3 text-primary" />
                        <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                            Achievements
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                        FLIGHT LOGS
                    </h2>
                    <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
                        A chronological record of competitions across the galaxy.
                    </p>
                </div>


                <div className="relative pl-8 md:pl-0">

                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2" />

                    <div className="space-y-12">
                        {achievements.map((item, index) => {
                            const styles = getTierStyles(item.tier);
                            const isEven = index % 2 === 0;
                            
                            return (
                                <div 
                                    key={item.id} 
                                    className={cn(
                                        "relative flex flex-col md:flex-row items-center md:justify-between gap-8",
                                        isEven ? "md:flex-row-reverse" : ""
                                    )}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >

                                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                                        <div className={cn(
                                            "w-12 h-12 rounded-full border-2 bg-background flex items-center justify-center transition-transform duration-300 hover:scale-110",
                                            styles.border,
                                            styles.glow
                                        )}>
                                            <styles.icon className={cn("w-5 h-5", styles.color)} />
                                        </div>
                                    </div>


                                    <div className={cn(
                                        "w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0",
                                        isEven ? "md:text-right" : "md:text-left"
                                    )}>
                                        <div 
                                            className="group relative bg-card/40 backdrop-blur-sm border border-border hover:border-primary/50 p-5 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card/60"
                                            onClick={() => {
                                                setSelectedAchievement(item);
                                                setSelectedAchievementId(item.id);
                                            }}
                                        >

                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                            
                                            <div className={cn(
                                                "relative flex flex-col gap-2",
                                                isEven ? "md:items-end" : "md:items-start"
                                            )}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={cn(
                                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                                                        styles.bg,
                                                        styles.color,
                                                        styles.border
                                                    )}>
                                                        {item.rank}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDate(item.date)}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-primary/80 font-medium">
                                                    {item.event}
                                                </p>
                                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="hidden md:block w-[calc(50%-3rem)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Dialog open={selectedAchievementId !== null} onOpenChange={(open) => {
                if (!open) {
                    setSelectedAchievement(null);
                    setSelectedAchievementId(null);
                }
            }}>
                <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-xl border-primary/20 text-foreground">
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center mb-4">
                            {selectedAchievement && (() => {
                                const styles = getTierStyles(selectedAchievement.tier);
                                return (
                                    <div className={cn(
                                        "w-16 h-16 rounded-full border-2 bg-background flex items-center justify-center mb-3",
                                        styles.border,
                                        styles.glow
                                    )}>
                                        <styles.icon className={cn("w-8 h-8", styles.color)} />
                                    </div>
                                );
                            })()}
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                {selectedAchievement?.title}
                            </DialogTitle>
                            <p className="text-sm text-primary font-medium mt-1">
                                {selectedAchievement?.rank}
                            </p>
                        </div>
                    </DialogHeader>
                    
                    {selectedAchievement && (
                        <div className="space-y-4">
                            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                                {imageLoading[selectedAchievement.id] && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-pulse bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 bg-[length:200%_100%] animate-shimmer rounded-lg w-full h-full"></div>
                                    </div>
                                )}
                                <Image 
                                    src={selectedAchievement.image} 
                                    alt={selectedAchievement.title}
                                    fill
                                    className="object-contain transition-opacity duration-300"
                                    style={{ opacity: imageLoading[selectedAchievement.id] ? 0 : 1 }}
                                    onLoad={() => handleImageLoad(selectedAchievement.id)}
                                    onLoadStart={() => handleImageLoadStart(selectedAchievement.id)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs text-muted-foreground border-b border-border/50 pb-2">
                                    <span>Event: {selectedAchievement.event}</span>
                                    <span>{formatDate(selectedAchievement.date)}</span>
                                </div>
                                <DialogDescription className="text-foreground/90 leading-relaxed pt-2">
                                    {selectedAchievement.description}
                                </DialogDescription>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};




