"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

const experiences = [
  {
    year: '2023',
    command: 'senior-developer',
    title: 'Senior Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    description: 'Leading frontend architecture and mentoring junior developers. Building scalable design systems and driving technical decisions across multiple product teams.',
    output: [
      'Led team of 8 engineers',
      'Shipped 12 major features',
      'Reduced load time by 40%',
    ],
    skills: ['React', 'TypeScript', 'System Design', 'Leadership'],
  },
  {
    year: '2022',
    command: 'lead-engineer',
    title: 'Lead Engineer',
    company: 'Digital Products Co.',
    location: 'New York, NY',
    description: 'Spearheaded product development for fintech solutions. Managed cross-functional teams and delivered enterprise-grade applications.',
    output: [
      'Managed $2M project budget',
      'Built payment processing system',
      'Achieved 99.9% uptime',
    ],
    skills: ['Node.js', 'AWS', 'PostgreSQL', 'Team Lead'],
  },
  {
    year: '2021',
    command: 'fullstack-dev',
    title: 'Full Stack Developer',
    company: 'Digital Agency Co.',
    location: 'Austin, TX',
    description: 'Built scalable applications for enterprise clients. Implemented CI/CD pipelines and optimized database performance for high-traffic systems.',
    output: [
      'Delivered 20+ client projects',
      'Automated deployment pipeline',
      'Improved API response by 60%',
    ],
    skills: ['Full Stack', 'Docker', 'CI/CD', 'MongoDB'],
  },
  {
    year: '2019',
    command: 'frontend-dev',
    title: 'Frontend Developer',
    company: 'Startup Labs',
    location: 'Remote',
    description: 'Developed user interfaces for early-stage products. Collaborated closely with designers to ship pixel-perfect, accessible experiences.',
    output: [
      'Built 5 MVPs from scratch',
      'Established component library',
      'Improved accessibility score to 98',
    ],
    skills: ['React', 'CSS', 'Figma', 'A11y'],
  },
  {
    year: '2018',
    command: 'init',
    title: 'Junior Developer',
    company: 'Web Solutions',
    location: 'Boston, MA',
    description: 'Started journey in web development and design. Learned fundamentals of modern JavaScript, responsive design, and version control.',
    output: [
      'Completed 100+ code reviews',
      'First production deployment',
      'Mentored by senior engineers',
    ],
    skills: ['JavaScript', 'HTML/CSS', 'Git', 'Agile'],
  },
];

export const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
            EXPERIENCE
          </h2>
        </div>

        {/* Terminal Window */}
        <div data-aos="fade-up" data-aos-delay="150">
          <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
            {/* Terminal Header */}
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

            {/* Terminal Body */}
            <div className="p-4 md:p-6 space-y-1">
              {experiences.map((exp, index) => (
                <div
                  key={exp.year}
                  data-aos="fade-left"
                  data-aos-delay={200 + index * 100}
                >
                  {/* Command Line Entry */}
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
                    {/* Main line */}
                    <div className="px-4 py-3 flex items-start gap-3">
                      {/* Prompt */}
                      <span className="text-muted-foreground text-xs shrink-0 select-none pt-0.5">
                        <span className="text-foreground/50">$</span>
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs text-foreground">
                            career --{exp.command}
                          </code>
                          <span className="text-[10px] text-muted-foreground/70">
                            {exp.year}
                          </span>
                          
                          {/* Blinking cursor on active non-expanded */}
                          {index === activeIndex && expandedIndex !== index && (
                            <span className="w-1.5 h-3.5 bg-foreground/70 animate-pulse" />
                          )}
                        </div>
                        
                        {/* Brief info */}
                        <div className="mt-1.5 text-xs text-muted-foreground">
                          <span className="text-foreground/70">{exp.title}</span>
                          <span className="mx-2 opacity-40">@</span>
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <span 
                        className={cn(
                          "text-xs text-muted-foreground/50 transition-transform duration-200 pt-0.5",
                          expandedIndex === index && "rotate-90"
                        )}
                      >
                        ▸
                      </span>
                    </div>

                    {/* Expanded Output Block */}
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
                          {/* Output header */}
                          <div className="flex items-center gap-2 mb-3 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                            <span>// output</span>
                            <div className="flex-1 h-px bg-border/50" />
                          </div>

                          {/* Description */}
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            {exp.description}
                          </p>

                          {/* Output lines */}
                          <div className="space-y-1.5 mb-4">
                            {exp.output.map((line, i) => (
                              <div 
                                key={i}
                                className="flex items-start gap-2 text-xs"
                              >
                                <span className="text-muted-foreground/50">→</span>
                                <span className="text-foreground/80">{line}</span>
                              </div>
                            ))}
                          </div>

                          {/* Skills tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-accent text-foreground/70 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Location */}
                          <div className="mt-3 text-[10px] text-muted-foreground/60">
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Current prompt line */}
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
