"use client";

import { useEffect, useRef, useState } from "react";
import { Code, Cloud, Brain, Shield, Smartphone, BarChart3 } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Веб та мобільна розробка",
    description: "Створюємо сучасні веб-додатки, SPA, PWA та нативні мобільні застосунки на React, Next.js, Flutter та Swift.",
    icon: Smartphone,
    color: "from-indigo-500 to-blue-400",
  },
  {
    number: "02",
    title: "Хмарна інфраструктура",
    description: "Проєктуємо та впроваджуємо хмарні рішення на AWS, GCP та Azure. DevOps, CI/CD, Kubernetes та мікросервісна архітектура.",
    icon: Cloud,
    color: "from-teal-500 to-cyan-400",
  },
  {
    number: "03",
    title: "AI та машинне навчання",
    description: "Інтеграція штучного інтелекту у ваші бізнес-процеси. NLP, комп'ютерний зір, рекомендаційні системи та чат-боти.",
    icon: Brain,
    color: "from-violet-500 to-indigo-400",
  },
  {
    number: "04",
    title: "Кібербезпека",
    description: "Комплексний аудит безпеки, пентестінг, впровадження Zero Trust архітектури та SOC 2 сертифікація.",
    icon: Shield,
    color: "from-emerald-500 to-green-400",
  },
  {
    number: "05",
    title: "Enterprise-рішення",
    description: "Розробка корпоративних систем: ERP, CRM, автоматизація процесів, інтеграція legacy-систем.",
    icon: Code,
    color: "from-amber-500 to-orange-400",
  },
  {
    number: "06",
    title: "Аналітика та BI",
    description: "Побудова дата-платформ, дашбордів реального часу, ETL-процесів та предиктивної аналітики.",
    icon: BarChart3,
    color: "from-rose-500 to-pink-400",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      className={`group relative transition-all duration-700 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="glass-card rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:scale-[1.02] h-full">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className="w-6 h-6 text-white" />
        </div>

        {/* Number */}
        <span className="font-mono text-xs text-primary/40 block mb-3">{feature.number}</span>
        
        {/* Content */}
        <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 group-hover:text-gradient transition-all duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
            <span className="w-8 h-px bg-primary/30" />
            Наші послуги
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Повний спектр
            <br />
            <span className="text-gradient">IT-послуг.</span>
          </h2>
          <p className={`mt-6 text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Від ідеї до продакшену — ми закриваємо всі технічні потреби вашого бізнесу.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
