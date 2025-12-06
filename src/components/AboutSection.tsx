import { Code2, Palette, Layers, Zap, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const skills = [
  { icon: Code2, label: 'Development', description: 'React, TypeScript, Node.js' },
  { icon: Palette, label: 'Design', description: 'UI/UX, Figma, Motion' },
  { icon: Layers, label: 'Architecture', description: 'System Design, APIs' },
  { icon: Zap, label: 'Performance', description: 'Optimization, Testing' },
  { icon: Globe, label: 'Web3', description: 'Blockchain, Contracts' },
  { icon: Sparkles, label: 'AI/ML', description: 'LLMs, Computer Vision' },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio Content */}
          <div data-aos="fade-right">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
              BRINGING IDEAS<br />TO LIFE
            </h2>
            <div className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate developer and designer with over 5 years of experience 
                creating digital products that matter. My journey started with curiosity 
                about how things work on the web.
              </p>
              <p>
                I believe in the power of clean code, thoughtful design, and the magic 
                that happens when technology meets creativity. Every project is an 
                opportunity to push boundaries.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              {[
                { value: '50+', label: 'Projects' },
                { value: '5+', label: 'Years' },
                { value: '30+', label: 'Clients' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 100}
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div data-aos="fade-left" data-aos-delay="150">
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill.label}
                  className={cn("glass-card p-4 hover-lift group cursor-default")}
                  data-aos="fade-up"
                  data-aos-delay={200 + index * 80}
                >
                  <skill.icon className="w-5 h-5 text-gray-500 group-hover:text-foreground transition-colors duration-300" />
                  <h3 className="font-bold text-foreground mt-3 text-sm tracking-tight">
                    {skill.label}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-1 tracking-wide">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
