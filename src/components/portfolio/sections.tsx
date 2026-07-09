import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Github,
  Linkedin,
  ChevronDown,
  Award,
  Briefcase,
  Wrench,
  Rocket,
  Star,
  ExternalLink,
  Calendar,
  Quote,
  MessageSquare,
  ShieldCheck,
  Bug,
  Code2,
  Cpu,
  Database,
  Layers,
  Zap,
} from "lucide-react";
import {
  profile,
  stats,
  skillGroups,
  experience,
  projects,
  certifications,
  achievements,
  tools,
  testimonials,
  blog,
  services,
  faqs,
  repos,
} from "@/lib/portfolio-data";
import { useCounter, useTypewriter } from "./effects";
const profileImageSrc = "/images/aslah.png";

/* -------------------------- Shared -------------------------- */

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Sparkles className="h-3 w-3 text-[#22d3ee]" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-sm sm:text-base text-muted-foreground">{desc}</p>
      )}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  href,
  variant = "primary",
  download,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "outline";
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[filter,box-shadow] duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] text-white shadow-[0_18px_40px_-15px_rgba(124,58,237,0.6)] hover:brightness-110"
      : variant === "outline"
        ? "glass hover:glow-ring"
        : "text-foreground/90 hover:text-foreground";
  return (
    <a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}

/* --------------------------- Hero --------------------------- */

export function Hero() {
  const typed = useTypewriter(profile.typewriter);
  return (
    <section className="relative min-h-[100svh] pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">
                Available · {profile.status}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.02] sm:text-6xl md:text-7xl">
              Hi, I'm <span className="text-gradient animate-gradient bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4]">Aslah Khan</span>
              <br />
              <span className="text-foreground/85">a </span>
              <span className="text-gradient bg-gradient-to-r from-[#06b6d4] to-[#22d3ee]">{typed}</span>
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 animate-pulse bg-[#22d3ee]" />
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {profile.headline}. Based in {profile.location} — shipping
              resilient FinTech and enterprise SaaS with a relentless eye for
              detail.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                Download Resume
              </MagneticButton>
              <MagneticButton href="#contact" variant="outline">
                Hire Me <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton href={`mailto:${profile.email}`} variant="ghost">
                <Mail className="h-4 w-4" /> Contact
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4">
                  <div className="text-gradient bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] font-display text-2xl font-black">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#4f46e5]/40 via-[#7c3aed]/30 to-[#06b6d4]/30 blur-3xl" />
            <div className="glass-strong glow-ring relative h-full w-full overflow-hidden rounded-[2rem] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#0b1120] to-[#111827]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.6),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.5),transparent_60%)]"
                />
                <img
                  src={profileImageSrc}
                  alt={`${profile.name} — ${profile.role}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050816] via-[#050816]/70 to-transparent p-6">
                  <div className="font-display text-xl font-bold">{profile.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{profile.role}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    {["Selenium", "Postman", "Java", "SQL", "Jira"].map((t) => (
                      <span key={t} className="rounded-full glass px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden animate-float rounded-2xl glass-strong p-3 sm:block">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                99% Test Accuracy
              </div>
            </div>
            <div className="absolute -right-4 top-8 hidden animate-float rounded-2xl glass-strong p-3 sm:block [animation-delay:-3s]">
              <div className="flex items-center gap-2 text-xs">
                <Bug className="h-4 w-4 text-[#22d3ee]" />
                500+ bugs squashed
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col items-center gap-1 text-xs text-muted-foreground">
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

/* --------------------------- About --------------------------- */

function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const num = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const c = useCounter(num, 1400, inView);
  return (
    <div ref={ref} className="glass rounded-2xl p-5 transition hover:glow-ring">
      <div className="text-gradient bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] font-display text-3xl font-black">
        {c}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="About" title="Quality is a mindset, not a step." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[#4f46e5]/40 to-[#06b6d4]/40 blur-3xl" />
              <div className="glass-strong h-full w-full overflow-hidden rounded-3xl p-2">
                <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#111827] to-[#0b1120]">
                  <img
                    src={profileImageSrc}
                    alt={profile.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050816]/70 via-transparent to-[#06b6d4]/10" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
                    <Cpu className="h-3.5 w-3.5 text-[#22d3ee]" /> Test. Break. Ship.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="font-display text-2xl font-bold">
                A QA engineer who thinks like a user and a developer.
              </h3>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                {profile.summary}
              </p>
              <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  ["Location", profile.location],
                  ["Status", profile.status],
                  ["Nationality", profile.nationality],
                  ["Languages", profile.languages.join(", ")],
                ].map(([k, v]) => (
                  <li key={k} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats.map((s) => (
                  <StatCard key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Skills --------------------------- */

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4]"
        />
      </div>
    </div>
  );
}

export function Skills() {
  const icons = [Bug, Zap, Code2, Layers];
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Skills"
          title="The stack that ships resilient software."
          desc="Battle-tested tools and methodologies I use every sprint to keep quality high and releases boring."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, gi) => {
            const Icon = icons[gi % icons.length];
            return (
              <Reveal key={g.title} delay={gi * 0.05}>
                <div className="group glass gradient-border relative overflow-hidden rounded-3xl p-6 transition hover:glow-ring">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#4f46e5]/30 to-[#06b6d4]/30">
                      <Icon className="h-5 w-5 text-[#22d3ee]" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    {g.items.map((s, i) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.05} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Experience --------------------------- */

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title="Three years shipping FinTech-grade quality."
        />
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] sm:left-1/2" />
          <div className="space-y-12">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={e.company}>
                  <div className="relative grid gap-6 sm:grid-cols-2">
                    <div className={`hidden sm:block ${left ? "" : "order-2"}`} />
                    <div className={left ? "sm:pl-10" : "sm:order-1 sm:pr-10 sm:text-right"}>
                      <div className="absolute left-4 top-2 grid h-4 w-4 -translate-x-1/2 place-items-center sm:left-1/2">
                        <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] shadow-[0_0_0_4px_rgba(124,58,237,0.25)]" />
                      </div>
                      <div className="glass rounded-3xl p-6 transition hover:glow-ring">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {e.period}
                        </div>
                        <h3 className="mt-2 font-display text-xl font-bold">{e.role}</h3>
                        <div className="text-sm text-[#22d3ee]">
                          {e.company} · <span className="text-muted-foreground">{e.location}</span>
                        </div>
                        <ul className={`mt-4 space-y-2 text-sm text-muted-foreground ${left ? "" : "sm:text-right"}`}>
                          {e.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22d3ee]" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Projects --------------------------- */

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 6 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });
  return (
    <Reveal delay={i * 0.05}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="group glass-strong relative overflow-hidden rounded-3xl p-1 transition-transform duration-300"
      >
        <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#0b1120] to-[#111827]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.55),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.55),transparent_60%)]" />
            <div className="absolute inset-0 [background:linear-gradient(180deg,transparent,rgba(0,0,0,0.55))]" />
            <div className="relative flex h-full flex-col items-start justify-end p-6">
              <h3 className="font-display text-3xl font-black text-gradient bg-gradient-to-r from-white to-[#22d3ee]">
                {p.name}
              </h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">{p.overview}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#22d3ee]">Features</div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Rocket className="mt-0.5 h-3.5 w-3.5 text-[#7c3aed]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#22d3ee]">Testing done</div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {p.testing.map((f) => (
                    <li key={f} className="flex gap-2">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full glass px-2.5 py-1 text-[11px]">{t}</span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {p.metrics.map((m) => (
                <div key={m.k} className="glass rounded-xl px-3 py-2 text-center">
                  <div className="text-gradient bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] font-display text-lg font-black">{m.v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Products I helped ship with confidence."
          desc="A snapshot of the FinTech and SaaS platforms where my testing kept releases green and users happy."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Certifications --------------------------- */

export function Certifications() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Certifications" title="Learning that keeps compounding." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="glass gradient-border rounded-3xl p-6 transition hover:glow-ring">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#4f46e5]/30 to-[#06b6d4]/30">
                    <Award className="h-5 w-5 text-[#22d3ee]" />
                  </span>
                  <div className="text-xs text-muted-foreground">{c.year}</div>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Achievements --------------------------- */

export function Achievements() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Achievements" title="Numbers that back the work." />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {achievements.map((a, i) => (
            <Reveal key={a.v} delay={i * 0.04}>
              <div className="glass rounded-2xl p-5 text-center transition hover:glow-ring">
                <div className="text-gradient bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] font-display text-2xl font-black">
                  {a.k}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {a.v}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Tools Marquee --------------------------- */

export function Tools() {
  const row = [...tools, ...tools];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Toolbox" title="The tools I reach for every day." />
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3">
          {row.map((t, i) => (
            <div
              key={`${t}-${i}`}
              className="glass flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"
            >
              <Wrench className="h-4 w-4 text-[#22d3ee]" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Testimonials --------------------------- */

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title="What teammates and clients say."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="glass gradient-border relative rounded-3xl p-7 transition hover:glow-ring">
                <Quote className="absolute right-6 top-6 h-6 w-6 text-[#7c3aed]/50" />
                <p className="text-sm text-foreground/90 sm:text-base">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] font-display font-bold text-white">
                    {t.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Blog --------------------------- */

export function Blog() {
  return (
    <section id="blog" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Writing" title="Notes from the QA trenches." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blog.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.04}>
              <article className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl transition hover:glow-ring">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 opacity-90 [background:radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.6),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.6),transparent_60%)]" />
                  <div className="relative flex h-full items-end p-5">
                    <span className="rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-widest">
                      {b.tag}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug">{b.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{b.read}</span>
                    <span className="inline-flex items-center gap-1 text-[#22d3ee]">
                      Read <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- GitHub --------------------------- */

export function GitHubSection() {
  const cells = Array.from({ length: 7 * 26 });
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Open Source"
          title="Building in the open."
          desc="A snapshot of my recent activity and repos I keep sharpening."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Github className="h-4 w-4" />
                  <span className="font-medium">@aslahkhan</span>
                </div>
                <div className="text-xs text-muted-foreground">Last 6 months</div>
              </div>
              <div className="mt-6 grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1">
                {cells.map((_, i) => {
                  const seed = (i * 9301 + 49297) % 233280;
                  const v = seed / 233280;
                  const level = v > 0.85 ? 4 : v > 0.65 ? 3 : v > 0.4 ? 2 : v > 0.2 ? 1 : 0;
                  const bg = [
                    "bg-white/5",
                    "bg-[#4f46e5]/30",
                    "bg-[#7c3aed]/50",
                    "bg-[#06b6d4]/70",
                    "bg-[#22d3ee]",
                  ][level];
                  return <div key={i} className={`aspect-square rounded-[3px] ${bg}`} />;
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  {["bg-white/5", "bg-[#4f46e5]/30", "bg-[#7c3aed]/50", "bg-[#06b6d4]/70", "bg-[#22d3ee]"].map(
                    (c) => (
                      <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
                    ),
                  )}
                </div>
                <span>More</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  ["842", "Contributions"],
                  ["48", "Repositories"],
                  ["126", "Stars earned"],
                ].map(([k, v]) => (
                  <div key={v} className="glass rounded-2xl p-3">
                    <div className="font-display text-lg font-black text-gradient bg-gradient-to-r from-[#4f46e5] to-[#22d3ee]">
                      {k}
                    </div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {repos.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.05}>
                <a
                  href="#"
                  className="group glass flex items-start gap-4 rounded-2xl p-5 transition hover:glow-ring"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#4f46e5]/30 to-[#06b6d4]/30">
                    <Github className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="truncate font-medium">{r.name}</div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-foreground" />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{r.desc}</div>
                    <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
                        {r.lang}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" /> {r.stars}
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Services --------------------------- */

export function Services() {
  const icons = [ShieldCheck, Zap, Layers, Briefcase, MessageSquare, Bug, Database];
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Services" title="How I can help your team." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="glass group h-full rounded-3xl p-6 transition hover:glow-ring">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#06b6d4] text-white shadow-[0_15px_30px_-10px_rgba(6,182,212,0.55)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FAQ --------------------------- */

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-sm text-muted-foreground">{a}</div>
      </motion.div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="FAQ" title="Frequently asked." />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <FaqItem q={f.q} a={f.a} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Contact --------------------------- */

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something that actually works."
          desc="Available for full-time roles in the UAE and remote QA engagements worldwide."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_.85fr]">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="glass gradient-border rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <input required className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-muted-foreground/60 focus:border-[#22d3ee]" placeholder="Your name" />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <input required type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#22d3ee]" placeholder="you@company.com" />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Company</span>
                  <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#22d3ee]" placeholder="Company name" />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Phone</span>
                  <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#22d3ee]" placeholder="+971 …" />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="text-muted-foreground">Message</span>
                <textarea required rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#22d3ee]" placeholder="Tell me about your product and QA needs…" />
              </label>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_-15px_rgba(124,58,237,0.6)] transition hover:brightness-110"
                >
                  Send Message <ArrowRight className="h-4 w-4" />
                </button>
                <a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm hover:glow-ring">
                  <Download className="h-4 w-4" /> Resume
                </a>
                {sent && (
                  <span className="text-sm text-emerald-400">Thanks — I'll get back within 24h.</span>
                )}
              </div>
            </form>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="space-y-4">
              <div className="glass rounded-3xl p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Direct</div>
                <div className="mt-4 space-y-3 text-sm">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-[#22d3ee]">
                    <Mail className="h-4 w-4" /> {profile.email}
                  </a>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[#22d3ee]">
                    <Phone className="h-4 w-4" /> {profile.phone}
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <a href={profile.linkedin} className="grid h-10 w-10 place-items-center rounded-full glass hover:glow-ring" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                  <a href={profile.github} className="grid h-10 w-10 place-items-center rounded-full glass hover:glow-ring" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                  <a href={`mailto:${profile.email}`} className="grid h-10 w-10 place-items-center rounded-full glass hover:glow-ring" aria-label="Email"><Mail className="h-4 w-4" /></a>
                </div>
              </div>
              <div className="glass relative overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/3]">
                  <iframe
                    title="Dubai, UAE"
                    src="https://www.google.com/maps?q=Dubai%2C%20UAE&output=embed"
                    className="absolute inset-0 h-full w-full grayscale contrast-125"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1120]/60 via-transparent to-transparent" />
                </div>
                <div className="flex items-center gap-2 p-4 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-[#22d3ee]" /> Dubai, United Arab Emirates
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
