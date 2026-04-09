"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Захист даних",
    description: "Впроваджуємо AES-256 шифрування, TLS 1.3 та захист від DDoS-атак на всіх рівнях.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Lock,
    title: "Безпечна розробка",
    description: "OWASP Top 10 аудит, статичний аналіз коду, автоматичне сканування вразливостей.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Eye,
    title: "Моніторинг 24/7",
    description: "Проактивний моніторинг, алерти в реальному часі, автоматичне масштабування та відновлення.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: FileCheck,
    title: "Відповідність стандартам",
    description: "Допомагаємо з GDPR, PCI DSS, ISO 27001 та SOC 2 сертифікацією для вашого бізнесу.",
    color: "from-emerald-500 to-green-500",
  },
];

const certifications = ["ISO 27001", "SOC 2", "GDPR", "PCI DSS", "OWASP"];

export function SecuritySection() {
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
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
              <span className="w-8 h-px bg-primary/30" />
              Безпека
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-8">
              Безпека —
              <br />
              <span className="text-gradient">наш пріоритет.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Кожен рядок коду проходить ретельну перевірку. Ми впроваджуємо 
              найкращі практики безпеки на кожному етапі розробки.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-4 py-2 glass-card rounded-lg text-sm font-mono text-primary/80 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`glass-card rounded-xl p-6 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-1 group-hover:text-gradient transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
