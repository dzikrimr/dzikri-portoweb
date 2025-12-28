"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getExperiences } from '@/app/actions';
import { Experience } from '@/db/schema';

export const TimelineSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    getExperiences().then(setExperiences);
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
            EXPERIENCE
          </h2>
        </div>


        <div data-aos="fade-up" data-aos-delay="150">
          <div className="rounded-xl border border-border bg-card/50 overflow-hidden">

            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card/80">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="text-[10px] text-muted-foreground tracking-wider flex-1 text-center">
                career.log
              </span>
              <div className="w-12" />
            </div>


            <div className="p-4 md:p-6 space-y-1">
              {experiences.map((exp, index) => (
                <div

                  key={exp.id || `${exp.year}-${index}`} 
                  data-aos="fade-left"
                  data-aos-delay={200 + index * 100}
                >

                  <div
                    className={cn(
                      "group rounded-lg cursor-pointer transition-all duration-300",
                      index === activeIndex 
                        ? "bg-accent/40" 
                        : "hover:bg-accent/20",
                      index !== activeIndex && "opacity-60"
                    )}
                    onClick={() => handleCardClick(index)}
                  >

                    <div className="px-4 py-3 flex items-start gap-3">
                      <span className="text-muted-foreground text-xs shrink-0 select-none pt-0.5">
                        <span className="text-foreground/50">$</span>
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs text-foreground">
                            career --{exp.command}
                          </code>
                          <span className="text-[10px] text-muted-foreground/70">
                            {exp.year}
                          </span>
                          
                          {index === activeIndex && expandedIndex !== index && (
                            <span className="w-1.5 h-3.5 bg-foreground/70 animate-pulse" />
                          )}
                        </div>
                        
                        <div className="mt-1.5 text-xs text-muted-foreground">
                          <span className="text-foreground/70">{exp.title}</span>
                          <span className="mx-2 opacity-40">@</span>
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <span 
                        className={cn(
                          "text-xs text-muted-foreground/50 transition-transform duration-200 pt-0.5",
                          expandedIndex === index && "rotate-90"
                        )}
                      >
                        ▸
                      </span>
                    </div>


                    <div 
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        expandedIndex === index 
                          ? "grid-rows-[1fr] opacity-100" 
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 pl-10">
                          <div className="flex items-center gap-2 mb-3 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                            <span>// output</span>
                            <div className="flex-1 h-px bg-border/50" />
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            {exp.description}
                          </p>

                          <div className="space-y-1.5 mb-4">
                            {exp.output.map((line, i) => (
                              <div 

                                key={`output-${index}-${i}`}
                                className="flex items-start gap-2 text-xs"
                              >
                                <span className="text-muted-foreground/50">→</span>
                                <span className="text-foreground/80">{line}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {exp.skills.map((skill, i) => (
                              <span

                                key={`skill-${index}-${i}`}
                                className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-accent text-foreground/70 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="mt-3 text-[10px] text-muted-foreground/60">
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


              <div className="px-4 py-2 flex items-center gap-3 opacity-40" data-aos="fade-left" data-aos-delay="700">
                <span className="text-xs text-foreground/50">$</span>
                <span className="w-1.5 h-3.5 bg-foreground animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};