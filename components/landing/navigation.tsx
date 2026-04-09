"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { name: "Послуги", href: "#services" },
  { name: "Як ми працюємо", href: "#how-it-works" },
  { name: "Технології", href: "#technologies" },
  { name: "Портфоліо", href: "#portfolio" },
  { name: "Ціни", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/70 backdrop-blur-2xl border border-primary/10 rounded-2xl shadow-[0_8px_32px_rgba(99,102,241,0.08)] max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${isScrolled ? "h-14" : "h-20"}`}>
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group">
            <div className={`flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 ${isScrolled ? "w-7 h-7" : "w-8 h-8"}`}>
              <Code2 className={`text-primary transition-all duration-500 ${isScrolled ? "w-4 h-4" : "w-5 h-5"}`} />
            </div>
            <span className={`font-display font-bold tracking-tight transition-all duration-500 ${isScrolled ? "text-lg" : "text-xl"}`}>
              Nova<span className="text-gradient">Code</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className={`text-foreground/60 hover:text-foreground transition-all duration-500 cursor-pointer ${isScrolled ? "text-xs" : "text-sm"}`}
            >
              Контакти
            </button>
            <Button
              size="sm"
              onClick={() => scrollTo("contact")}
              className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-500 glow-blue cursor-pointer ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
            >
              Замовити проєкт
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-4xl font-display font-bold text-foreground hover:text-primary transition-all duration-500 cursor-pointer ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className={`flex gap-4 pt-8 border-t border-primary/10 transition-all duration-500 ${
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button 
              variant="outline" 
              className="flex-1 rounded-full h-14 text-base border-primary/20 cursor-pointer"
              onClick={() => scrollTo("contact")}
            >
              Контакти
            </Button>
            <Button 
              className="flex-1 bg-primary text-primary-foreground rounded-full h-14 text-base glow-blue cursor-pointer"
              onClick={() => scrollTo("contact")}
            >
              Замовити проєкт
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
