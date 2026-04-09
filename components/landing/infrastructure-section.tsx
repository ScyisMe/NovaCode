"use client";

import { useEffect, useState, useRef } from "react";

const techStack = [
  { name: "React / Next.js", category: "Frontend", status: "primary" },
  { name: "Node.js", category: "Backend", status: "primary" },
  { name: "TypeScript", category: "Language", status: "primary" },
  { name: "Python", category: "AI / Backend", status: "primary" },
  { name: "PostgreSQL", category: "Database", status: "active" },
  { name: "AWS / GCP", category: "Cloud", status: "active" },
  { name: "Docker / K8s", category: "DevOps", status: "active" },
  { name: "Redis", category: "Cache", status: "active" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="technologies" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-accent/[0.02] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
              <span className="w-8 h-px bg-primary/30" />
              Технології
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-8">
              Сучасний
              <br />
              <span className="text-gradient">стек технологій.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Використовуємо найсучасніші та перевірені технології для створення 
              масштабованих, безпечних та продуктивних рішень.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-2">30+</div>
                <div className="text-sm text-muted-foreground">Технологій</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-2">&lt;100ms</div>
                <div className="text-sm text-muted-foreground">Відповідь API</div>
              </div>
            </div>
          </div>

          {/* Right: Tech stack list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Tech Stack</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Production ready
                </span>
              </div>

              {/* Technologies */}
              <div>
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`px-6 py-5 border-b border-primary/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-primary/[0.05]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-primary shadow-[0_0_8px_var(--nova-blue)]" : tech.status === 'primary' ? "bg-primary/40" : "bg-muted-foreground/30"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.category}</div>
                      </div>
                    </div>
                    <span className={`font-mono text-xs px-2 py-1 rounded ${
                      tech.status === 'primary' ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                    }`}>
                      {tech.status === 'primary' ? 'core' : 'active'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
