"use client";

import { useEffect, useRef, useState } from "react";

export function TypographyHighlightSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 lg:py-48 max-w-[1200px] mx-auto px-6 lg:px-12 flex justify-end"
      id="about"
    >
      <h2 className={`text-3xl sm:text-5xl lg:text-[4rem] font-display font-medium leading-[1.2] tracking-tight max-w-[900px] text-right transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        We <span className="text-primary mix-blend-screen drop-shadow-[0_0_15px_rgba(255,46,46,0.6)]">design</span> and deploy <span className="text-primary mix-blend-screen drop-shadow-[0_0_15px_rgba(255,46,46,0.6)]">AI solutions</span> <br className="hidden lg:block"/> with people at the core, ensuring <br className="hidden lg:block"/> every <span className="text-primary mix-blend-screen drop-shadow-[0_0_15px_rgba(255,46,46,0.6)]">system enhances</span> <br className="hidden lg:block"/> real user experiences.
      </h2>
    </section>
  );
}
