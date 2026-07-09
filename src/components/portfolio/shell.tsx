import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const t = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
    setLight(t === "light");
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:glow-ring transition-all"
    >
      <Sun className={`absolute h-4 w-4 transition-all ${light ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${light ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
    </button>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 sm:px-5 transition-all ${scrolled ? "glass-strong" : "glass"}`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] text-sm font-black text-white">
              A
            </span>
            <span className="hidden sm:block font-display text-sm font-semibold tracking-tight">
              Aslah Khan<span className="text-muted-foreground">.qa</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6)] transition hover:brightness-110"
            >
              Hire Me
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 md:hidden"
            >
              <div className="glass-strong flex flex-col gap-1 rounded-3xl p-3">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm hover:bg-white/5"
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#4f46e5] to-[#06b6d4] text-white shadow-[0_20px_50px_-15px_rgba(6,182,212,0.6)]"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] font-black text-white">
                A
              </span>
              <span className="font-display text-lg font-semibold">Aslah Khan KT</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              QA Engineer crafting resilient FinTech and enterprise SaaS
              products from Dubai — one green build at a time.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={profile.github} aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full glass hover:glow-ring">
                <Github className="h-4 w-4" />
              </a>
              <a href={profile.linkedin} aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full glass hover:glow-ring">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full glass hover:glow-ring">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="font-display text-sm font-semibold">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-foreground">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-sm font-semibold">Reach out</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{profile.location}</li>
              <li><a className="hover:text-foreground" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><a className="hover:text-foreground" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {year} Aslah Khan KT. Crafted with attention to every edge case.</div>
          <div>Dubai, UAE · Immediate Joiner</div>
        </div>
      </div>
    </footer>
  );
}