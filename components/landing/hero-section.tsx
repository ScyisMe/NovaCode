"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["створюємо", "розробляємо", "масштабуємо", "запускаємо"];

const stats = [
  { value: "200+", label: "реалізованих проєктів", company: "З 2018 РОКУ" },
  { value: "50+", label: "задоволених клієнтів", company: "ENTERPRISE" },
  { value: "99.9%", label: "аптайм продуктів", company: "SLA" },
  { value: "24/7", label: "технічна підтримка", company: "SUPPORT" },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[80px] animate-float" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[80px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--nova-indigo)]/5 blur-[80px] animate-pulse-glow" />
      </div>

      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-30 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-15"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 40%, transparent 90%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 40%, transparent 90%, black 100%)'
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-primary/20"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-primary/20"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/80 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            <Sparkles className="w-4 h-4" />
            IT-рішення нового покоління
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 className={`text-[clamp(2.5rem,10vw,8rem)] font-display font-bold leading-[1.1] tracking-tight transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="block">Ми</span>
            <span className="block overflow-hidden h-[1.1em] my-1">
              <span className="vertical-rotator text-gradient">
                {[...words, words[0]].map((word, index) => (
                  <span key={index} className="inline-block h-[1.1em] leading-none shrink-0">
                    {word}
                  </span>
                ))}
              </span>
            </span>
            <span className="block text-foreground/40 mt-1">майбутнє.</span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            NovaCode — команда досвідчених розробників та інженерів, 
            яка перетворює бізнес-ідеї на потужні цифрові продукти.
          </p>
          
          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group glow-blue cursor-pointer"
              onClick={() => scrollTo("contact")}
            >
              Обговорити проєкт
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 cursor-pointer"
              onClick={() => scrollTo("portfolio")}
            >
              Наші кейси
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats marquee - seamless loop */}
      <div className={`absolute bottom-12 left-0 right-0 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="marquee-wrapper">
          <div className="marquee-track gap-16">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-16 shrink-0 pr-16">
                {stats.map((stat) => (
                  <div key={`${stat.company}-${setIdx}`} className="flex items-baseline gap-4 shrink-0">
                    <span className="text-4xl lg:text-5xl font-display font-bold text-gradient">{stat.value}</span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {stat.label}
                      <span className="block font-mono text-xs mt-1 text-primary/50">{stat.company}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
