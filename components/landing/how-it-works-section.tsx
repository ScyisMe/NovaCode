"use client";

import { useEffect, useRef, useState, useMemo } from "react";

// === Syntax highlighting (same palette as developers-section) ===
type TokenType =
  | "comment" | "keyword" | "string" | "number" | "type"
  | "function" | "punctuation" | "operator" | "property" | "plain";

interface Token { type: TokenType; value: string; }

const tokenColors: Record<TokenType, string> = {
  comment:     "text-[#8a8a8a] italic",
  keyword:     "text-[#8839ef]",
  string:      "text-[#40a02b]",
  number:      "text-[#d36f09]",
  type:        "text-[#1e66f5]",
  function:    "text-[#d24dff]",
  punctuation: "text-[#6c6f85]",
  operator:    "text-[#ea76cb]",
  property:    "text-[#2e3440]",
  plain:       "",
};

function tokenizeJS(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const keywords = new Set([
    "import","export","default","from","const","let","var",
    "function","return","if","else","for","while","class",
    "new","this","true","false","null","undefined","typeof",
    "async","await",
  ]);

  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) {
    const lead = line.length - trimmed.length;
    if (lead > 0) tokens.push({ type: "plain", value: line.slice(0, lead) });
    tokens.push({ type: "comment", value: trimmed });
    return tokens;
  }

  while (i < line.length) {
    if (line[i] === " " || line[i] === "\t") {
      let s = i;
      while (i < line.length && (line[i] === " " || line[i] === "\t")) i++;
      tokens.push({ type: "plain", value: line.slice(s, i) });
      continue;
    }
    if (line[i] === "'" || line[i] === '"') {
      const q = line[i]; let s = i; i++;
      while (i < line.length && line[i] !== q) { if (line[i] === "\\") i++; i++; }
      if (i < line.length) i++;
      tokens.push({ type: "string", value: line.slice(s, i) });
      continue;
    }
    if (/[0-9]/.test(line[i])) {
      let s = i;
      while (i < line.length && /[0-9.]/.test(line[i])) i++;
      tokens.push({ type: "number", value: line.slice(s, i) });
      continue;
    }
    if (/[a-zA-Z_$]/.test(line[i])) {
      let s = i;
      while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) i++;
      const w = line.slice(s, i);
      if (keywords.has(w)) tokens.push({ type: "keyword", value: w });
      else if (i < line.length && line[i] === "(") tokens.push({ type: "function", value: w });
      else tokens.push({ type: "property", value: w });
      continue;
    }
    if ("{}()[].:;,=>/".includes(line[i])) {
      if (line[i] === "=" && i + 1 < line.length && line[i + 1] === ">") {
        tokens.push({ type: "operator", value: "=>" }); i += 2;
      } else {
        tokens.push({ type: "punctuation", value: line[i] }); i++;
      }
      continue;
    }
    // Unicode & special chars (✓, etc.)
    tokens.push({ type: "plain", value: line[i] }); i++;
  }
  return tokens;
}

// === Steps data ===
const steps = [
  {
    number: "01",
    title: "Аналіз та планування",
    description: "Глибоко аналізуємо ваші бізнес-потреби, визначаємо технічні вимоги та формуємо дорожню карту проєкту.",
    code: `// Аналіз вимог проєкту
const project = await novacode.analyze({
  business: 'your-requirements',
  stack: 'modern',
  timeline: '2-4 weeks'
})

// Формування ТЗ
project.createSpec()`,
  },
  {
    number: "02",
    title: "Розробка та тестування",
    description: "Agile-розробка з двотижневими спринтами, код-рев'ю, автоматичне тестування та CI/CD пайплайни.",
    code: `// Запуск розробки
novacode.sprint({
  methodology: 'agile',
  testing: 'automated',
  ci_cd: true,
  codeReview: 'mandatory'
})

// 95%+ покриття тестами`,
  },
  {
    number: "03",
    title: "Деплой та підтримка",
    description: "Безшовний запуск у продакшен з моніторингом 24/7 та технічною підтримкою.",
    code: `// Деплой у продакшен
await novacode.deploy({
  target: 'production',
  monitoring: '24/7',
  support: 'dedicated'
})

// ✓ Запущено у 5 регіонах`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const highlightedLines = useMemo(() => {
    return steps[activeStep].code.split("\n").map((line) => tokenizeJS(line));
  }, [activeStep]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
      
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
            <span className="w-8 h-px bg-primary/30" />
            Процес роботи
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display font-bold tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Три кроки до
            <br />
            <span className="text-gradient">вашого продукту.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-primary/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className={`font-mono text-2xl font-bold transition-colors duration-300 ${activeStep === index ? 'text-primary' : 'text-muted-foreground/30'}`}>{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display font-bold mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-primary/20 overflow-hidden rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent w-0 rounded-full"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="rounded-2xl overflow-hidden bg-[#f8f9fc] border border-[#e2e4ea] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-[#e2e4ea] bg-[#f1f2f6] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">novacode.config.ts</span>
              </div>

              {/* Code content with syntax highlighting */}
              <div className="p-8 font-mono text-[13px] leading-7 min-h-[280px] overflow-x-auto">
                <pre>
                  {highlightedLines.map((lineTokens, lineIndex) => {
                    let charOffset = 0;
                    return (
                      <div
                        key={`${activeStep}-line-${lineIndex}`}
                        className="hiw-code-line"
                        style={{ animationDelay: `${lineIndex * 60}ms` }}
                      >
                        {/* Line number */}
                        <span className="inline-block w-8 mr-4 text-right text-[#c0c4cc] select-none text-xs">
                          {lineIndex + 1}
                        </span>
                        {lineTokens.map((token, tokenIndex) => {
                          const delay = lineIndex * 50 + tokenIndex * 20;
                          charOffset += token.value.length;
                          return (
                            <span
                              key={`${activeStep}-${lineIndex}-${tokenIndex}`}
                              className={`hiw-code-token ${tokenColors[token.type]}`}
                              style={{ animationDelay: `${delay}ms` }}
                            >
                              {token.value.replace(/ /g, "\u00A0")}
                            </span>
                          );
                        })}
                        {lineTokens.length === 0 && <span>&nbsp;</span>}
                      </div>
                    );
                  })}
                </pre>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-[#e2e4ea] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">Готово до продакшену</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .hiw-code-line {
          opacity: 0;
          transform: translateX(-6px);
          animation: hiwLineReveal 0.35s ease-out forwards;
        }
        
        @keyframes hiwLineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .hiw-code-token {
          opacity: 0;
          animation: hiwTokenReveal 0.25s ease-out forwards;
        }
        
        @keyframes hiwTokenReveal {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

