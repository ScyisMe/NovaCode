"use client";

import { useEffect, useRef, useState } from "react";

export function AgentServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      id="services"
    >
      <div className="glass-card rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 border border-border/50 bg-background/80 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Left Content */}
        <div className="flex flex-col relative z-10 sticky top-24 self-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-foreground/5 backdrop-blur-md mb-8 w-fit text-primary font-medium text-xs tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,46,46,0.8)]" />
            Services
          </div>
          
          <h2 className="text-4xl sm:text-6xl lg:text-[5rem] font-display font-medium leading-[1.05] tracking-tight mb-8">
            End-to-End <br />
            AI Services
          </h2>
          
          <p className="text-foreground/60 text-base sm:text-lg max-w-sm leading-relaxed">
            We turn ambiguous AI ideas into production features your users trust—combining strategy, design, engineering, and rigorous evaluation.
          </p>
        </div>
        
        {/* Right Content - Service list (we show one as an example based on the image) */}
        <div className="flex flex-col relative z-10 space-y-8">
          
          <div className="glass-card rounded-[2rem] p-8 sm:p-10 border border-border/50 bg-foreground/5 backdrop-blur-xl group hover:border-foreground/20 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6 border-b border-border/50 pb-6">
              <h3 className="text-3xl font-display font-medium group-hover:text-primary transition-colors">AI Strategy <br /> & Mapping</h3>
              <span className="text-xs text-foreground/50 tracking-widest">(01)</span>
            </div>
            
            <p className="text-sm text-foreground/60 mb-8 leading-relaxed max-w-md">
              Identify high-ROI use cases and define a realistic, measurable AI roadmap.
            </p>
            
            <div className="flex flex-wrap gap-3">
               <span className="px-5 py-2.5 rounded-full border border-border/50 bg-foreground/5 text-xs text-foreground/80 hover:bg-foreground/10 transition-colors">Stakeholder discovery</span>
               <span className="px-5 py-2.5 rounded-full border border-border/50 bg-foreground/5 text-xs text-foreground/80 hover:bg-foreground/10 transition-colors">Value model & KPI definition</span>
               <span className="px-5 py-2.5 rounded-full border border-border/50 bg-foreground/5 text-xs text-foreground/80 hover:bg-foreground/10 transition-colors">Data readiness assessment</span>
            </div>
            
            {/* Expanded state visualization / icon */}
            <div className="mt-8 flex justify-end opacity-50 group-hover:opacity-100 transition-opacity">
               <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
                 <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </div>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
