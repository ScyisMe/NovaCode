"use client";

import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Startup",
    description: "Для стартапів та невеликих проєктів",
    price: 2500,
    currency: "$",
    features: [
      "Лендінг або MVP",
      "До 3 місяців розробки",
      "UI/UX дизайн",
      "Базовий CI/CD",
      "1 місяць підтримки",
    ],
    cta: "Почати проєкт",
    popular: false,
  },
  {
    name: "Business",
    description: "Для зростаючого бізнесу",
    price: 8000,
    currency: "$",
    features: [
      "Повноцінний веб-додаток",
      "Мобільний додаток",
      "Хмарна інфраструктура",
      "AI-інтеграції",
      "DevOps та CI/CD",
      "Технічна підтримка 24/7",
      "Аудит та аналітика",
    ],
    cta: "Обговорити проєкт",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Для великого бізнесу",
    price: null,
    currency: "$",
    features: [
      "Все з плану Business",
      "Виділена команда",
      "On-premise рішення",
      "SLA 99.99%",
      "Аудит безпеки",
      "Кастомні інтеграції",
      "Пріоритетна підтримка",
      "Консультації архітектора",
    ],
    cta: "Зв'язатися",
    popular: false,
  },
];

export function PricingSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="relative py-32 lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-primary/60 uppercase block mb-6">
            Вартість послуг
          </span>
          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Відкрите
            <br />
            <span className="text-gradient">ціноутворення.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Гнучкі умови розробки для проєктів будь-якого масштабу. Працюємо без прихованих платежів за фіксованою моделлю або Rate Card.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative glass-card rounded-2xl p-8 lg:p-10 transition-all duration-300 ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-14 border-primary/30 ring-1 ring-primary/20 glow-blue" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-4 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-mono uppercase tracking-widest rounded-full">
                  Популярний
                </span>
              )}

              <div className="mb-8">
                <span className="font-mono text-xs text-primary/40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-bold text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-primary/10">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted-foreground text-xl">від</span>
                    <span className="font-display font-bold text-5xl lg:text-6xl text-gradient">
                      {plan.currency}{plan.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="font-display font-bold text-4xl text-gradient">Індивідуально</span>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToContact}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all group cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 glow-blue"
                    : "glass-card text-foreground hover:bg-primary/10"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Усі тарифи включають SSL, моніторинг та базовий захист від DDoS.{" "}
          <button
            type="button"
            onClick={scrollToContact}
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors cursor-pointer"
          >
            Порівняти всі можливості
          </button>
        </p>
      </div>
    </section>
  );
}
