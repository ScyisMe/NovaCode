"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "Frontend",
    lang: "tsx",
    code: `// Next.js + TypeScript
import { NovaUI } from '@novacode/ui'

export default function App() {
  return (
    <NovaUI theme="dark">
      <Dashboard />
      <Analytics />
    </NovaUI>
  )
}`,
  },
  {
    label: "Backend",
    lang: "ts",
    code: `// Node.js API with validation
import { createAPI } from '@novacode/api'

const api = createAPI({
  auth: 'jwt',
  rateLimit: true,
  logging: 'structured'
})

api.listen(3000)`,
  },
  {
    label: "DevOps",
    lang: "yaml",
    code: `# Docker + Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: novacode-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate`,
  },
];

// === Syntax highlighting token types ===
type TokenType =
  | "comment"
  | "keyword"
  | "string"
  | "number"
  | "type"
  | "function"
  | "tag"
  | "attr"
  | "punctuation"
  | "operator"
  | "property"
  | "plain";

interface Token {
  type: TokenType;
  value: string;
}

// Simple tokenizer for JS/TS/TSX
function tokenizeJS(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  const keywords = new Set([
    "import", "export", "default", "from", "const", "let", "var",
    "function", "return", "if", "else", "for", "while", "class",
    "new", "this", "true", "false", "null", "undefined", "typeof",
    "async", "await",
  ]);

  // Check for comment line
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) {
    const leadingSpaces = line.length - trimmed.length;
    if (leadingSpaces > 0) {
      tokens.push({ type: "plain", value: line.slice(0, leadingSpaces) });
    }
    tokens.push({ type: "comment", value: trimmed });
    return tokens;
  }

  while (i < line.length) {
    // Whitespace
    if (line[i] === " " || line[i] === "\t") {
      let start = i;
      while (i < line.length && (line[i] === " " || line[i] === "\t")) i++;
      tokens.push({ type: "plain", value: line.slice(start, i) });
      continue;
    }

    // Strings (single or double quote)
    if (line[i] === "'" || line[i] === '"') {
      const quote = line[i];
      let start = i;
      i++;
      while (i < line.length && line[i] !== quote) {
        if (line[i] === "\\") i++;
        i++;
      }
      if (i < line.length) i++;
      tokens.push({ type: "string", value: line.slice(start, i) });
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i])) {
      let start = i;
      while (i < line.length && /[0-9.]/.test(line[i])) i++;
      tokens.push({ type: "number", value: line.slice(start, i) });
      continue;
    }

    // JSX tags like <Component or </Component or />
    if (line[i] === "<") {
      let start = i;
      i++;
      if (i < line.length && line[i] === "/") i++;
      // Read tag name
      let tagStart = i;
      while (i < line.length && /[a-zA-Z0-9]/.test(line[i])) i++;
      const tagName = line.slice(tagStart, i);
      if (tagName.length > 0) {
        tokens.push({ type: "punctuation", value: line.slice(start, tagStart) });
        const isComponent = tagName[0] === tagName[0].toUpperCase();
        tokens.push({ type: isComponent ? "type" : "tag", value: tagName });
        // Read attributes until >
        while (i < line.length && line[i] !== ">") {
          if (line[i] === " ") {
            tokens.push({ type: "plain", value: " " });
            i++;
            continue;
          }
          if (line[i] === "=") {
            tokens.push({ type: "operator", value: "=" });
            i++;
            continue;
          }
          if (line[i] === '"' || line[i] === "'") {
            const q = line[i];
            let s = i;
            i++;
            while (i < line.length && line[i] !== q) i++;
            if (i < line.length) i++;
            tokens.push({ type: "string", value: line.slice(s, i) });
            continue;
          }
          if (line[i] === "/") {
            tokens.push({ type: "punctuation", value: "/" });
            i++;
            continue;
          }
          // attribute name
          let attrStart = i;
          while (i < line.length && /[a-zA-Z0-9\-]/.test(line[i])) i++;
          if (i > attrStart) {
            tokens.push({ type: "attr", value: line.slice(attrStart, i) });
          } else {
            tokens.push({ type: "plain", value: line[i] });
            i++;
          }
        }
        if (i < line.length && line[i] === ">") {
          tokens.push({ type: "punctuation", value: ">" });
          i++;
        }
        continue;
      } else {
        tokens.push({ type: "punctuation", value: line.slice(start, i) });
        continue;
      }
    }

    // Identifiers & keywords
    if (/[a-zA-Z_$]/.test(line[i])) {
      let start = i;
      while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) i++;
      const word = line.slice(start, i);
      if (keywords.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
        tokens.push({ type: "type", value: word });
      } else if (i < line.length && line[i] === "(") {
        tokens.push({ type: "function", value: word });
      } else {
        tokens.push({ type: "property", value: word });
      }
      continue;
    }

    // Operators & punctuation
    if ("{}()[].:;,=>/".includes(line[i])) {
      if (line[i] === "=" && i + 1 < line.length && line[i + 1] === ">") {
        tokens.push({ type: "operator", value: "=>" });
        i += 2;
      } else {
        tokens.push({ type: "punctuation", value: line[i] });
        i++;
      }
      continue;
    }

    // Fallback
    tokens.push({ type: "plain", value: line[i] });
    i++;
  }

  return tokens;
}

// Simple tokenizer for YAML
function tokenizeYAML(line: string): Token[] {
  const tokens: Token[] = [];
  const trimmed = line.trimStart();

  // Comment
  if (trimmed.startsWith("#")) {
    const leadingSpaces = line.length - trimmed.length;
    if (leadingSpaces > 0) tokens.push({ type: "plain", value: line.slice(0, leadingSpaces) });
    tokens.push({ type: "comment", value: trimmed });
    return tokens;
  }

  // Key: value
  const kvMatch = line.match(/^(\s*)([\w.\-/]+)(:)\s*(.*)?$/);
  if (kvMatch) {
    if (kvMatch[1]) tokens.push({ type: "plain", value: kvMatch[1] });
    tokens.push({ type: "property", value: kvMatch[2] });
    tokens.push({ type: "punctuation", value: kvMatch[3] });
    if (kvMatch[4] !== undefined && kvMatch[4].length > 0) {
      tokens.push({ type: "plain", value: " " });
      const val = kvMatch[4];
      if (/^\d+$/.test(val)) {
        tokens.push({ type: "number", value: val });
      } else if (val === "true" || val === "false") {
        tokens.push({ type: "keyword", value: val });
      } else {
        tokens.push({ type: "string", value: val });
      }
    }
    return tokens;
  }

  tokens.push({ type: "plain", value: line });
  return tokens;
}

function tokenizeLine(line: string, lang: string): Token[] {
  if (lang === "yaml") return tokenizeYAML(line);
  return tokenizeJS(line);
}

// Color classes for each token type — vibrant for light theme
const tokenColors: Record<TokenType, string> = {
  comment:     "text-[#8a8a8a] italic",           // gray
  keyword:     "text-[#8839ef]",                   // vivid purple
  string:      "text-[#40a02b]",                   // rich green
  number:      "text-[#d36f09]",                   // warm orange
  type:        "text-[#1e66f5]",                   // vibrant blue
  function:    "text-[#d24dff]",                   // magenta
  tag:         "text-[#e64553]",                   // red
  attr:        "text-[#df8e1d]",                   // amber 
  punctuation: "text-[#6c6f85]",                   // slate
  operator:    "text-[#ea76cb]",                   // pink
  property:    "text-[#2e3440]",                   // dark
  plain:       "",                                 // inherit
};

const features = [
  { 
    title: "Clean Architecture", 
    description: "SOLID принципи та чиста архітектура."
  },
  { 
    title: "100% TypeScript", 
    description: "Повна типізація для надійності коду."
  },
  { 
    title: "Автотестування", 
    description: "95%+ покриття unit та e2e тестами."
  },
  { 
    title: "Код-рев'ю", 
    description: "Кожен PR проходить рев'ю старших девів."
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-6px);
    animation: devLineReveal 0.35s ease-out forwards;
  }
  
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .dev-code-token {
    opacity: 0;
    animation: devTokenReveal 0.25s ease-out forwards;
  }
  
  @keyframes devTokenReveal {
    to {
      opacity: 1;
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  const highlightedLines = useMemo(() => {
    const example = codeExamples[activeTab];
    return example.code.split("\n").map((line) => tokenizeLine(line, example.lang));
  }, [activeTab]);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60 mb-6">
              <span className="w-8 h-px bg-primary/30" />
              Якість коду
            </span>
            <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-8">
              Код, яким
              <br />
              <span className="text-gradient">пишаємося.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Ми пишемо чистий, масштабований та підтримуваний код. 
              Кожен проєкт — це інженерний витвір, а не просто набір функцій.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-display font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Code block */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="rounded-2xl overflow-hidden bg-[#f8f9fc] border border-[#e2e4ea] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]">
              {/* Tabs */}
              <div className="flex items-center border-b border-[#e2e4ea] bg-[#f1f2f6]">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${
                      activeTab === idx
                        ? "text-primary bg-[#f8f9fc]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-[#d24dff]" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Code content with syntax highlighting */}
              <div className="p-8 font-mono text-[13px] leading-7 min-h-[260px] overflow-x-auto">
                <pre>
                  {highlightedLines.map((lineTokens, lineIndex) => {
                    let charOffset = 0;
                    return (
                      <div
                        key={`${activeTab}-line-${lineIndex}`}
                        className="dev-code-line"
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
                              key={`${activeTab}-${lineIndex}-${tokenIndex}`}
                              className={`dev-code-token ${tokenColors[token.type]}`}
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
            </div>
            
            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4 cursor-pointer">
                GitHub
              </a>
              <span className="text-primary/20">|</span>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Наш блог
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
