"use client";

import { useEffect, useState, useRef } from "react";

const integrations = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Fullstack" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI / ML" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "NoSQL" },
  { name: "Redis", category: "Cache" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "Orchestration" },
  { name: "AWS", category: "Cloud" },
  { name: "GCP", category: "Cloud" },
  { name: "Terraform", category: "IaC" },
  { name: "GraphQL", category: "API" },
  { name: "TypeScript", category: "Language" },
  { name: "Flutter", category: "Mobile" },
  { name: "TensorFlow", category: "ML" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
            <span className="w-8 h-px bg-primary/30" />
            Стек
            <span className="w-8 h-px bg-primary/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-6">
            Працюємо з
            <br />
            <span className="text-gradient">найкращими інструментами.</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Наша команда володіє 30+ технологіями для вирішення будь-якої задачі.
          </p>
        </div>
      </div>
      
      {/* Forward marquee */}
      <div className="marquee-wrapper mb-6">
        <div className="marquee-track gap-6">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrations.map((integration) => (
                <div
                  key={`${integration.name}-${setIndex}`}
                  className="shrink-0 px-8 py-6 glass-card rounded-xl transition-all duration-300 group cursor-default"
                >
                  <div className="text-lg font-medium group-hover:text-gradient transition-all whitespace-nowrap">
                    {integration.name}
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">{integration.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track-reverse gap-6">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...integrations].reverse().map((integration) => (
                <div
                  key={`${integration.name}-rev-${setIndex}`}
                  className="shrink-0 px-8 py-6 glass-card rounded-xl transition-all duration-300 group cursor-default"
                >
                  <div className="text-lg font-medium group-hover:text-gradient transition-all whitespace-nowrap">
                    {integration.name}
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">{integration.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
