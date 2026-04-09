"use client";

import { ArrowUpRight, Code2 } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  "Послуги": [
    { name: "Веб-розробка", href: "#services" },
    { name: "Мобільна розробка", href: "#services" },
    { name: "AI рішення", href: "#services" },
    { name: "DevOps", href: "#services" },
  ],
  "Технології": [
    { name: "React / Next.js", href: "#technologies" },
    { name: "Node.js / Python", href: "#technologies" },
    { name: "Cloud (AWS/GCP)", href: "#technologies" },
    { name: "Kubernetes", href: "#technologies" },
  ],
  "Компанія": [
    { name: "Про нас", href: "#how-it-works" },
    { name: "Блог", href: "#portfolio" },
    { name: "Кар'єра", href: "#contact", badge: "Hiring" },
    { name: "Контакти", href: "#contact" },
  ],
  "Правове": [
    { name: "Приватність", href: "#" },
    { name: "Умови", href: "#" },
    { name: "Безпека", href: "#security" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", external: true },
  { name: "GitHub", href: "https://github.com", external: true },
  { name: "Telegram", href: "https://t.me/novacode_dev", external: true },
];

export function FooterSection() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (href === "#") return;
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-primary/10">
      <div className="absolute inset-0 h-64 opacity-10 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2.5 mb-6 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-display font-bold">
                  Nova<span className="text-gradient">Code</span>
                </span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Сучасна IT-компанія, що створює потужні цифрові продукти 
                для бізнесу будь-якого масштабу.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group cursor-pointer"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-display font-bold mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 cursor-pointer"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 NovaCode. Усі права захищені.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Усі системи працюють
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
