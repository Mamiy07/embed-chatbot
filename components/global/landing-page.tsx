"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Terminal,
  Zap,
  Lock,
  Palette,
  Globe,
  BarChart,
  History,
  ChevronDown,
  Menu,
  X,
  Copy,
  ArrowRight,
  Send,
  Check,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Utility for consistent smooth easing ---
const EASE = [0.22, 1, 0.36, 1] as const;

// --- Mock Data ---
const FEATURES = [
  {
    icon: Zap,
    title: "Zero Config Setup",
    description:
      "Works out of the box. No complex providers or context to wrap.",
  },
  {
    icon: Lock,
    title: "API Key Privacy",
    description: "Keys are encrypted at rest and never logged or exposed.",
  },
  {
    icon: Palette,
    title: "Fully Themeable",
    description:
      "Match your brand perfectly with CSS variables or Tailwind classes.",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description:
      "Auto-detects user language and translates responses instantly.",
  },
];

const FAQS = [
  {
    question: "Which AI models do you support?",
    answer:
      "We currently support OpenAI, Anthropic , Gemini . You can switch models instantly in your dashboard.",
  },
  {
    question: "Is my API key secure?",
    answer:
      "Absolutely. Your keys are encrypted using AES-256 before being stored. We proxy all requests, so your key is never exposed to the client.",
  },
  {
    question: "Does it work with App Router?",
    answer:
      "Yes, EmbedAI is built specifically for Next.js App Router and is fully compatible with React Server Components.",
  },
  {
    question: "How do I train the chatbot?",
    answer:
      "You can give description about your business in the dashboard , the more details you provide.",
  },
];

// --- Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-[#080B10]/80 backdrop-blur-md border border-[#00FFA3]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-[#00FFA3]/10 flex items-center justify-center border border-[#00FFA3]/20 group-hover:border-[#00FFA3]/50 transition-colors">
            <Code className="w-5 h-5 text-[#00FFA3]" />
          </div>
          <span className="font-syne font-bold text-xl tracking-tight text-[#E6EDF3]">
            EmbedAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["GitHub", "Docs"].map((item) => (
            <Link
              key={item}
              
              href={item === "GitHub" ? "https://github.com/Mamiy07/embed-chatbot" : "/docs"}
              className="text-sm font-medium text-[#6B7A8D] hover:text-[#00FFA3] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={"/api/sign-up"}
            className="bg-[#00FFA3] text-[#080B10] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#00FFA3]/90 hover:shadow-[0_0_20px_rgba(0,255,163,0.3)] transition-all transform hover:scale-105 active:scale-95"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile Toggle — FIX #1: closing } was missing from ternary */}
        <button
          className="md:hidden text-[#E6EDF3]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#080B10] border-b border-[#1E2D3D] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {["Docs", "Pricing", "Examples", "GitHub"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-[#E6EDF3] py-2 border-b border-[#1E2D3D]/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <button className="w-full bg-[#00FFA3] text-[#080B10] py-3 rounded-lg font-bold mt-2">
                Start Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function ChatWidgetMock() {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages([{ role: "user", text: "What's your refund policy?" }]);
      setIsTyping(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "We offer a full 30-day refund policy, no questions asked. You can request it directly from your dashboard settings.",
        },
      ]);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "chat-input",
    ) as HTMLInputElement;
    if (!input.value.trim()) return;

    const userText = input.value;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    input.value = "";
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "That's a great question! As an AI demo, I can tell you that EmbedAI handles distinct contexts and custom knowledge bases seamlessly.",
        },
      ]);
    }, 1500);
  };

  
  return (
    // FIX #7: perspective must sit on a wrapping parent, not the animated element
    <div style={{ perspective: "1000px" }} className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="relative bg-[#0D1117] rounded-xl border border-[#00FFA3]/30 shadow-[0_0_50px_rgba(0,255,163,0.1)] overflow-hidden flex flex-col h-[500px]"
      >
        {/* Header */}
        <div className="bg-[#00FFA3] p-4 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#080B10]" />
          </div>
          <div>
            <h3 className="font-bold text-[#080B10] text-sm">
              EmbedAI Support
            </h3>
            <p className="text-[#080B10]/70 text-xs">Always online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-3 rounded-lg max-w-[85%] text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-[#1E2D3D] text-[#E6EDF3] ml-auto rounded-br-none"
                  : "bg-[#00FFA3]/10 border border-[#00FFA3]/20 text-[#E6EDF3] mr-auto rounded-bl-none",
              )}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-1 p-2">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: dot * 0.1,
                  }}
                  className="w-1.5 h-1.5 bg-[#00FFA3]/50 rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 border-t border-[#1E2D3D] bg-[#0D1117] shrink-0"
        >
          <div className="relative">
            <input
              name="chat-input"
              type="text"
              placeholder="Ask something..."
              className="w-full bg-[#080B10] border border-[#1E2D3D] rounded-full px-4 py-2.5 text-sm text-[#E6EDF3] focus:outline-none focus:border-[#00FFA3] transition-colors pr-10"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 w-8 h-8 bg-[#00FFA3] rounded-full flex items-center justify-center text-[#080B10] hover:bg-[#00FFA3]/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// --- Main Page Component ---

export default function LandingPage() {
  // FIX #6: initialise to -1 so no FAQ item is open by default
  const [activeStep, setActiveStep] = useState(-1);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm i @mamiy/chatbot");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };


  return (
    <div className="min-h-screen font-sans bg-[#080B10] text-[#E6EDF3] selection:bg-[#00FFA3]/30 selection:text-[#00FFA3] overflow-x-hidden">
      <Navbar />

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1E2D3D 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <motion.div
          animate={{
            x: ["-20%", "20%"],
            y: ["-20%", "20%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#00FFA3]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: ["20%", "-20%"],
            y: ["20%", "-20%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-[20%] right-[0%] w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[120px]"
        />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FFA3]/10 border border-[#00FFA3]/20 text-[#00FFA3] text-xs font-mono mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFA3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFA3]" />
            </span>
            v1.1 is now live
          </motion.div>

          <h1 className="font-bold text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
            Embed AI Support. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-[#3B82F6]">
              Ship in One Line.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#6B7A8D] mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Add a fully branded AI chatbot to your Next.js app with a single
            component. Powered by your product knowledge. Ready in 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-10">
            <Link
              href="/api/sign-up"
              className="group relative px-8 py-4 bg-[#00FFA3] text-[#080B10] rounded-xl font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,255,163,0.4)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="https://github.com/Mamiy07/embed-chatbot"
              target="_blank"
              className="px-8 py-4 bg-transparent border border-[#1E2D3D] text-[#E6EDF3] rounded-xl font-medium text-lg hover:border-[#6B7A8D] hover:bg-[#1E2D3D]/30 transition-all"
            >
              View on GitHub
            </Link>
          </div>

          <div  className="inline-flex items-center gap-4 bg-[#0D1117] border border-[#1E2D3D] rounded-lg p-3 pr-6 font-mono text-sm group cursor-pointer hover:border-[#00FFA3]/50 transition-colors">
            <span className="text-[#6B7A8D]">$</span>
            <span className="text-[#E6EDF3]">npm i @mamiy/chatbot</span>
            {copied ? (
        <Check className="w-3.5 h-3.5 text-[#00FFA3] ml-2" />
      ) : (
        <Copy onClick={handleCopy} className="w-3.5 h-3.5 text-[#6B7A8D] ml-2 group-hover:text-[#00FFA3]" />
      )}
          </div>
        </div>

        <div className="flex-1 w-full max-w-md md:max-w-full">
          <ChatWidgetMock />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 py-10 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-bold text-4xl md:text-5xl mb-4">
            3 Steps. 1 Coffee.
          </h2>
          <p className="text-[#6B7A8D] text-lg">
            From sign up to shipping in under 5 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px border-t-2 border-dashed border-[#1E2D3D] z-0" />

          {[
            {
              title: "Enter API Key",
              desc: "Paste your OpenAI or Anthropic key. Securely encrypted.",
              step: "01",
            },
            {
              title: "Describe Product",
              desc: "Give it your name, docs, and tone of voice.",
              step: "02",
            },
            {
              title: "Copy Component",
              desc: "Drop the <Chatbot /> component into your app.",
              step: "03",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5, ease: EASE }}
              className="relative z-10 bg-[#0D1117] border border-[#1E2D3D] p-8 rounded-2xl hover:border-[#00FFA3]/30 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="absolute -top-6 -right-6 text-[120px] font-bold text-[#1E2D3D]/20 leading-none select-none group-hover:text-[#00FFA3]/5 transition-colors">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-[#1E2D3D] rounded-full flex items-center justify-center mb-6 text-[#E6EDF3] font-bold border border-[#1E2D3D] group-hover:border-[#00FFA3] group-hover:bg-[#00FFA3]/10 group-hover:text-[#00FFA3] transition-colors relative z-20">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#E6EDF3] group-hover:text-[#00FFA3] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#6B7A8D] leading-relaxed relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CODE INTEGRATION ── */}
      <section className="relative z-10 py-32 bg-[#050608] border-y border-[#1E2D3D]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Integration that doesn&apos;t insult your intelligence.
            </h2>
            <p className="text-[#6B7A8D] text-lg mb-8 leading-relaxed">
              No iframes. No clunky embeds. A real Next.js component that
              respects your design system, supports SSR, and is fully typed.
            </p>

            <div className="flex gap-3 flex-wrap">
              {["TypeScript Ready", "SSR Compatible", "Fully Typed Props"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="px-3 py-1 rounded-full bg-[#1E2D3D]/50 border border-[#1E2D3D] text-xs font-mono text-[#00FFA3]"
                  >
                    ✓ {badge}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFA3] to-[#3B82F6] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-[#0D1117] rounded-xl border border-[#1E2D3D] overflow-hidden">
              {/* Traffic-light bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2D3D] bg-[#080B10]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-xs text-[#6B7A8D] font-mono">app.tsx</div>
                <Copy className="w-4 h-4 text-[#6B7A8D] cursor-pointer hover:text-[#E6EDF3] transition-colors" />
              </div>

              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="block">
                    <span className="text-[#FF79C6]">import</span>{" "}
                    <span className="text-[#E6EDF3]">{`{ Chatbot }`}</span>{" "}
                    <span className="text-[#FF79C6]">from</span>{" "}
                    <span className="text-[#F1FA8C]">
                      &apos;@mamiy/chatbot&apos;
                    </span>
                  </code>
                  <code className="block mt-4">
                    <span className="text-[#FF79C6]">export default</span>{" "}
                    <span className="text-[#8BE9FD]">function</span>{" "}
                    <span className="text-[#50FA7B]">App</span>
                    <span className="text-[#E6EDF3]">() {"{"}</span>
                  </code>
                  <code className="block pl-4">
                    <span className="text-[#FF79C6]">return</span>
                    <span className="text-[#E6EDF3]"> (</span>
                  </code>
                  <code className="block pl-8 text-[#E6EDF3]">
                    &lt;<span className="text-[#FF79C6]">Chatbot</span>
                  </code>
                  <code className="block pl-12">
                    <span className="text-[#50FA7B]">businessId</span>
                    <span className="text-[#E6EDF3]">=</span>
                    <span className="text-[#F1FA8C]">
                      &quot;your-unique-id&quot;
                    </span>
                  </code>
                  
                  <code className="block pl-8 text-[#E6EDF3]">/&gt;</code>
                  <code className="block pl-4 text-[#E6EDF3]">)</code>
                  <code className="block text-[#E6EDF3]">{"}"}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section
        id="features"
        className="relative z-10 py-32 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl mb-4">Built for Production.</h2>
          <p className="text-[#6B7A8D]">
            Everything you need to scale support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ease: EASE }}
              className={cn(
                "bg-[#0D1117] border border-[#1E2D3D] p-6 rounded-xl hover:border-[#00FFA3]/30 transition-colors group",
                idx === 0 || idx === 3 ? "md:col-span-2" : "md:col-span-1",
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-[#1E2D3D]/50 flex items-center justify-center mb-4 text-[#00FFA3] group-hover:scale-110 transition-transform">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#E6EDF3]">
                {feature.title}
              </h3>
              <p className="text-[#6B7A8D] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="docs" className="relative z-10 py-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-bold text-3xl mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#1E2D3D] rounded-lg bg-[#0D1117] overflow-hidden"
            >
              <button
                onClick={() => setActiveStep(activeStep === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E2D3D]/30 transition-colors"
              >
                <span className="font-medium text-[#E6EDF3]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#6B7A8D] transition-transform duration-300 shrink-0",
                    activeStep === idx ? "rotate-180" : "",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeStep === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-[#6B7A8D] text-sm leading-relaxed border-t border-[#1E2D3D]/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00FFA3]/5 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative max-w-4xl mx-auto px-6"
        >
          <h2 className="font-bold text-5xl md:text-7xl mb-6 tracking-tight">
            Your users deserve <br />
            <span className="text-[#00FFA3]">instant answers.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-[#00FFA3] text-[#080B10] rounded-xl font-bold text-lg hover:bg-[#00FFA3]/90 hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] transition-all">
              Start Building Free
            </button>
            <button className="px-8 py-4 bg-[#1E2D3D]/50 text-[#E6EDF3] rounded-xl font-bold text-lg hover:bg-[#1E2D3D] transition-all">
              Read the Docs
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
    
    </div>
  );
}
