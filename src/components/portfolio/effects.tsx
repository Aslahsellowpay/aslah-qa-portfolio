import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4]"
    />
  );
}

export function MouseGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      setEnabled(false);
      return;
    }
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-[background] duration-100"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.18), transparent 55%)`,
      }}
    />
  );
}

export function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(79,70,229,0.25),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(6,182,212,0.18),transparent_60%),linear-gradient(180deg,#050816,#0b1120_60%,#050816)]" />
      <div className="absolute -left-32 top-32 h-[520px] w-[520px] rounded-full bg-[#4f46e5] opacity-25 blur-[120px] animate-blob" />
      <div className="absolute right-[-120px] top-[40%] h-[480px] w-[480px] rounded-full bg-[#7c3aed] opacity-25 blur-[120px] animate-blob [animation-delay:-6s]" />
      <div className="absolute left-[30%] bottom-[-160px] h-[560px] w-[560px] rounded-full bg-[#06b6d4] opacity-20 blur-[130px] animate-blob [animation-delay:-12s]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
    </div>
  );
}

export function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const timeout = setTimeout(
      () => {
        if (!del) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDel(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDel(false);
            setI((n) => n + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, del, i, words, speed, pause]);
  return text;
}

export function useCounter(target: number, duration = 1600, start = true) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return v;
}