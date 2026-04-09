"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function WorldwideSection() {
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
      className={`py-12 max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      id="works"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Large Card */}
        <div className="lg:col-span-7 glass-card rounded-[2.5rem] p-8 sm:p-12 border border-border/50 bg-background flex flex-col items-center text-center overflow-hidden relative min-h-[500px]">
          
          <div className="flex items-center gap-2 mb-6 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] sm:text-xs text-foreground/50 tracking-wider uppercase">Available for worldwide project</span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-display font-medium mb-8 z-10">
            Based in <span className="text-primary mix-blend-screen drop-shadow-[0_0_10px_rgba(255,46,46,0.5)]">Montréal, Canada</span>
          </h3>
          
          <Button variant="outline" className="rounded-full bg-foreground/5 border border-border/50 text-foreground hover:bg-foreground/10 px-8 py-5 h-auto text-sm z-10 w-fit pointer-events-auto shadow-2xl">
            Start a Project
          </Button>
          
          <div className="absolute bottom-0 left-0 right-0 h-[60%] sm:h-[55%] mt-auto w-full">
            {/* The team image */}
            <div className="relative w-[90%] mx-auto h-full rounded-t-[2rem] overflow-hidden border-t border-x border-border/50 opacity-90 mix-blend-normal">
              <Image 
                src="/images/red-team-office.png" 
                alt="Team working in red light" 
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
          
        </div>
        
        {/* Right Column Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Top Info Card */}
          <div className="glass-card flex-1 rounded-[2.5rem] p-8 sm:p-10 border border-border/50 bg-card/50 backdrop-blur-md flex flex-col justify-between">
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-sm">
              Trusted by 120+ clients across 4 industries - shipping AI from idea to production in 8-10 weeks.
            </p>
            
            <div className="flex items-end justify-between mt-12 gap-4 flex-wrap">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-foreground/40" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-6xl sm:text-7xl lg:text-[5.5rem] font-display font-medium leading-none tracking-tighter">
                120+
              </span>
            </div>
          </div>
          
          {/* Bottom Testimonial Card */}
          <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 border border-border/50 bg-card/50 backdrop-blur-md flex items-center gap-6 sm:gap-8 flex-col sm:flex-row">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-foreground/5 shrink-0 relative overflow-hidden">
               {/* Using a placeholder avatar since I didn't generate one */}
              <div className="absolute inset-0 bg-background flex items-center justify-center">
                 {/* Simulate Ava Collins avatar */}
                 <svg className="w-16 h-16 text-foreground/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                 </svg>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-3xl text-primary font-serif mb-2 leading-none">"</span>
              <p className="text-sm border-white leading-relaxed mb-6 font-medium">
                Good AI feels obvious—because the hard work is hidden.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">Ava Collins</span>
                <span className="text-[10px] text-foreground/50 border-l border-border/50 pl-2">AgentAI's Design Lead</span>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
