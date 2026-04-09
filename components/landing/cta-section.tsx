"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { AnimatedTetrahedron } from "./animated-tetrahedron";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative glass-card rounded-3xl overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99,102,241,0.15), transparent 40%)`
            }}
          />

          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
          
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1">
                <h2 className="text-4xl lg:text-7xl font-display font-bold tracking-tight mb-8 leading-[0.95]">
                  Готові до
                  <br />
                  <span className="text-gradient">співпраці?</span>
                </h2>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  Розкажіть нам про ваш проєкт — ми підготуємо технічну пропозицію 
                  та оцінку безкоштовно протягом 48 годин.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 h-14 text-base rounded-full group glow-blue cursor-pointer"
                  >
                    <a href="mailto:hello@novacode.dev?subject=Запит на консультацію">
                      Замовити консультацію
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="h-14 px-8 text-base rounded-full border-primary/20 hover:bg-primary/5 cursor-pointer"
                  >
                    <a href="https://t.me/novacode_dev" target="_blank" rel="noopener noreferrer">
                      Написати в Telegram
                    </a>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-6 text-sm text-muted-foreground font-mono">
                  <a href="mailto:hello@novacode.dev" className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" />
                    hello@novacode.dev
                  </a>
                  <a href="tel:+380991234567" className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                    <Phone className="w-4 h-4" />
                    +380 99 123 45 67
                  </a>
                </div>
              </div>

              {/* Right animation */}
              <div className="hidden lg:flex items-center justify-center w-[400px] h-[400px] -mr-8">
                <AnimatedTetrahedron />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
