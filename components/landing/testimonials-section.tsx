"use client";

import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    quote: "NovaCode повністю перебудували нашу інфраструктуру. Швидкість роботи зросла в 10 разів, а стабільність — на рівні enterprise.",
    author: "Олександр Петренко",
    role: "CTO",
    company: "FinTech Solutions",
    metric: "10x швидкість",
  },
  {
    quote: "Команда NovaCode — це справжні професіонали. Вони не просто виконують ТЗ, а пропонують рішення, яких ми самі не бачили.",
    author: "Марія Коваленко",
    role: "Product Owner",
    company: "EduPlatform",
    metric: "3 місяці до MVP",
  },
  {
    quote: "Завдяки NovaCode ми автоматизували 80% рутинних процесів. ROI перевищив очікування вже через 2 місяці.",
    author: "Дмитро Шевченко",
    role: "CEO",
    company: "LogisTech",
    metric: "80% автоматизації",
  },
  {
    quote: "AI-рішення від NovaCode допомогли нам збільшити конверсію на 40%. Рекомендую усім, хто шукає надійного техпартнера.",
    author: "Анна Бондаренко",
    role: "CMO",
    company: "RetailPro",
    metric: "+40% конверсії",
  },
];

const companies = ["FinTech Solutions", "EduPlatform", "LogisTech", "RetailPro", "MedTech UA", "AgriSoft", "CyberGuard", "DataVerse"];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "fading-out" | "fading-in">("visible");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const FADE_DURATION = 250; // ms for fade-out and fade-in
  const SLIDE_INTERVAL = 7000;

  const transitionTo = (idx: number) => {
    if (idx === activeIndex || phase !== "visible") return;

    // Clear any pending transitions
    if (transitionRef.current) clearTimeout(transitionRef.current);

    setActiveIndex(idx);
    setPhase("fading-out");

    // After fade-out completes, swap content and fade in
    transitionRef.current = setTimeout(() => {
      setDisplayIndex(idx);
      setPhase("fading-in");

      // After fade-in completes, mark as visible
      transitionRef.current = setTimeout(() => {
        setPhase("visible");
      }, FADE_DURATION);
    }, FADE_DURATION);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonials.length;

        setPhase("fading-out");

        if (transitionRef.current) clearTimeout(transitionRef.current);
        transitionRef.current = setTimeout(() => {
          setDisplayIndex(next);
          setPhase("fading-in");

          transitionRef.current = setTimeout(() => {
            setPhase("visible");
          }, FADE_DURATION);
        }, FADE_DURATION);

        return next;
      });
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    transitionTo(idx);
    startTimer();
  };

  const displayedTestimonial = testimonials[displayIndex];

  // CSS transition styles based on phase
  const contentStyle: React.CSSProperties = {
    transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    opacity: phase === "fading-out" ? 0 : 1,
    transform: phase === "fading-out" ? "translateY(-12px)" : phase === "fading-in" ? "translateY(0)" : "translateY(0)",
    filter: phase === "fading-out" ? "blur(4px)" : "blur(0)",
  };

  const metricStyle: React.CSSProperties = {
    transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) 60ms, transform ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) 60ms`,
    opacity: phase === "fading-out" ? 0 : 1,
    transform: phase === "fading-out" ? "translateY(-8px) scale(0.98)" : "translateY(0) scale(1)",
  };

  return (
    <section className="relative py-32 lg:py-40 lg:pb-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-primary/60 uppercase">
            Відгуки клієнтів
          </span>
          <div className="flex-1 h-px bg-primary/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main Quote */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 min-h-[300px]">
          <div className="lg:col-span-8">
            <blockquote style={contentStyle}>
              <p className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-foreground">
                &ldquo;{displayedTestimonial.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-12 flex items-center gap-6" style={{
              ...contentStyle,
              transitionDelay: phase === "fading-out" ? "0ms" : "80ms",
            }}>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/10 flex items-center justify-center">
                <span className="font-display text-xl font-bold text-gradient">
                  {displayedTestimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-lg font-display font-bold text-foreground">{displayedTestimonial.author}</p>
                <p className="text-muted-foreground">
                  {displayedTestimonial.role}, {displayedTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="glass-card rounded-2xl p-8" style={metricStyle}>
              <span className="font-mono text-xs tracking-widest text-primary/60 uppercase block mb-4">
                Результат
              </span>
              <p className="font-display font-bold text-3xl md:text-4xl text-gradient">
                {displayedTestimonial.metric}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Відгук ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "w-8 bg-gradient-to-r from-primary to-accent"
                      : "w-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-24 pt-12 border-t border-primary/10">
          <p className="font-mono text-xs tracking-widest text-primary/40 uppercase mb-8 text-center">
            Нам довіряють провідні компанії
          </p>
        </div>
      </div>
      
      {/* Seamless company marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track gap-16">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0 pr-16">
              {companies.map((company) => (
                <span
                  key={`${setIdx}-${company}`}
                  className="font-display font-bold text-xl md:text-2xl text-foreground/15 whitespace-nowrap hover:text-primary/60 transition-all duration-300 cursor-default"
                >
                  {company}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
