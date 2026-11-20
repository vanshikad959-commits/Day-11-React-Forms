import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import {
  Award, BarChart3, Briefcase, Cloud, Code2, GraduationCap, Layers, Palette, Plus, Quote,
  Rocket, ShieldCheck, Smartphone, Star, Users, Video, Zap, Flame, ArrowRight, PlayCircle,
} from "lucide-react";

export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

function Heading({ title, sub }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-3xl font-extrabold sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-muted">{sub}</p>
    </Reveal>
  );
}

const Section = ({ id, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6">{children}</section>
);

/* ---------- Hero ---------- */
const float = (d, y = 14) => ({ animate: { y: [0, -y, 0] }, transition: { duration: 5 + d, repeat: Infinity, ease: "easeInOut", delay: d } });

export function Hero() {
  return (
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
      <div>
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> New batches start every Monday
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-6 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
          <span className="gradient-text">Learn with mentors.</span><br />Build things that ship.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-6 max-w-xl text-lg text-muted">
          Live classes, real projects and one-to-one code reviews from engineers who work in the industry. Register once and start your first lesson today.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-9 flex flex-wrap gap-4">
          <a href="#register" className="btn btn-primary">Create free account <ArrowRight size={18} /></a>
          <a href="#services" className="btn btn-ghost"><PlayCircle size={18} /> Explore courses</a>
        </motion.div>
      </div>

      {/* floating 3D-style stack */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9 }}
        className="relative mx-auto h-[420px] w-full max-w-md" style={{ perspective: 1200 }}>
        <motion.div {...float(0)} className="absolute inset-x-6 top-6 rounded-[2rem] p-6 shadow-2xl"
          style={{ transform: "rotateY(-14deg) rotateX(8deg)", background: "linear-gradient(135deg,#6d4aff,#00c2ff 60%,#ff5fa2)" }}>
          <div className="flex items-center justify-between text-white">
            <span className="font-display text-lg font-bold">Full Stack Web</span><Code2 />
          </div>
          <div className="mt-5 space-y-2 font-mono text-xs text-white/90">
            <p>&lt;Course level="beginner" /&gt;</p><p className="pl-4">useState(<b>"ready"</b>)</p><p>&lt;Mentor live /&gt;</p>
          </div>
          <div className="mt-6 h-2 rounded-full bg-white/25"><div className="h-2 w-2/3 rounded-full bg-white" /></div>
          <p className="mt-2 text-xs text-white/90">Week 6 of 9</p>
        </motion.div>
        <motion.div {...float(1.2, 18)} className="glass absolute -left-2 bottom-16 flex items-center gap-3 rounded-2xl p-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/15 text-orange-500"><Flame /></span>
          <div><p className="text-sm text-muted">Learning streak</p><p className="font-display text-lg font-bold">12 days</p></div>
        </motion.div>
        <motion.div {...float(2.1, 12)} className="glass absolute -right-2 bottom-2 flex items-center gap-3 rounded-2xl p-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500"><Award /></span>
          <div><p className="text-sm text-muted">Certificate</p><p className="font-display text-lg font-bold">Unlocked</p></div>
        </motion.div>
        <motion.div {...float(0.6, 10)} className="glass absolute -top-2 right-0 grid h-14 w-14 place-items-center rounded-2xl text-[var(--brand)]"><Zap /></motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Features ---------- */
const features = [
  { icon: Video, title: "Live mentor sessions", text: "Small batches, real-time doubts and recordings for every class." },
  { icon: Layers, title: "Project-first lessons", text: "Every module ends with something you can add to your portfolio." },
  { icon: ShieldCheck, title: "Code reviews", text: "Get line-by-line feedback on your pull requests within 24 hours." },
  { icon: BarChart3, title: "Progress tracking", text: "See streaks, scores and what to revise next at a glance." },
];
export function Features() {
  return (
    <Section id="features">
      <Heading title="Everything you need to actually finish a course" sub="Learning works when someone is checking your work and the next step is obvious." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-white shadow-lg"><Icon size={22} /></span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- About ---------- */
export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-extrabold sm:text-5xl">Built by engineers who remember being students</h2>
          <p className="mt-5 text-lg text-muted">Lumio started as a weekend study group. Today it's a community where every learner gets a mentor, a plan and a reason to keep going.</p>
          <ul className="mt-6 space-y-3">
            {["Curriculum updated every quarter with hiring managers", "Pay-after-placement support for eligible students", "Lifetime access to recordings and community"].map((t) => (
              <li key={t} className="flex items-start gap-3"><Star className="mt-1 shrink-0 text-[var(--brand)]" size={18} />{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass relative overflow-hidden rounded-[2rem] p-8">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[var(--brand3)] opacity-30 blur-3xl" />
            <Quote className="text-[var(--brand)]" size={32} />
            <p className="mt-4 font-display text-2xl font-bold leading-snug">“A great course tells you what to learn. A great mentor tells you what to skip.”</p>
            <p className="mt-5 text-muted">Founding principle, Lumio Learning</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- Services ---------- */
const services = [
  { icon: Code2, title: "Full Stack Web Development", meta: "9 weeks · React, Node, SQL", c: "from-violet-500 to-indigo-500" },
  { icon: BarChart3, title: "Data Science with Python", meta: "10 weeks · Pandas, ML", c: "from-cyan-500 to-blue-500" },
  { icon: Palette, title: "UI/UX Design", meta: "6 weeks · Figma, research", c: "from-pink-500 to-rose-500" },
  { icon: Cloud, title: "Cloud Computing (AWS)", meta: "8 weeks · EC2, S3, IAM", c: "from-amber-500 to-orange-500" },
  { icon: ShieldCheck, title: "Cybersecurity Essentials", meta: "8 weeks · Networks, labs", c: "from-emerald-500 to-teal-500" },
  { icon: Smartphone, title: "Mobile App Development", meta: "8 weeks · React Native", c: "from-fuchsia-500 to-purple-500" },
];
export function Services() {
  return (
    <Section id="services">
      <Heading title="Pick a path, we'll plan the route" sub="Six career tracks. Each one runs live with a mentor and ends in a project you can show." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, meta, c }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.08}>
            <a href="#register" className="glass card-hover group block h-full rounded-3xl p-6">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c} text-white shadow-lg transition group-hover:rotate-6 group-hover:scale-110`}><Icon size={26} /></span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-1 text-muted">{meta}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-[var(--brand)]">Reserve a seat <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Stats ---------- */
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}
export function Stats() {
  const stats = [
    { icon: Users, to: 25000, suffix: "+", label: "Students taught" },
    { icon: Briefcase, to: 92, suffix: "%", label: "Placed within 6 months" },
    { icon: GraduationCap, to: 120, suffix: "+", label: "Industry mentors" },
    { icon: Rocket, to: 4800, suffix: "+", label: "Projects shipped" },
  ];
  return (
    <Section id="stats">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] p-8 text-white sm:p-12" style={{ background: "linear-gradient(120deg,#4b2fd6,#6d4aff 45%,#0ea5e9)" }}>
          <div className="absolute -left-10 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, to, suffix, label }) => (
              <div key={label}>
                <Icon className="mb-3 opacity-80" />
                <p className="font-display text-4xl font-extrabold sm:text-5xl"><Counter to={to} suffix={suffix} /></p>
                <p className="mt-1 text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
const reviews = [
  { name: "Ananya Verma", role: "Frontend Developer", text: "The code reviews were the difference. I stopped guessing and started writing code I could defend in interviews." },
  { name: "Rohit Mehra", role: "Data Analyst", text: "I'd tried self-study twice. Having a mentor and a weekly deadline finally made it stick." },
  { name: "Sneha Iyer", role: "UI/UX Designer", text: "I shipped a full case study in six weeks, and it's the project that got me my first offer." },
];
export function Testimonials() {
  return (
    <Section id="testimonials">
      <Heading title="Students who made the switch" sub="Sample stories shown for design purposes." />
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.1}>
            <figure className="glass card-hover flex h-full flex-col rounded-3xl p-6">
              <div className="mb-4 flex gap-1 text-amber-400">{[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
              <blockquote className="flex-1 text-lg">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand3)] font-bold text-white">{r.name[0]}</span>
                <span><b className="block">{r.name}</b><span className="text-sm text-muted">{r.role}</span></span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  ["Do I need prior experience?", "No. Every track starts from the basics, and your mentor adjusts the pace to your batch."],
  ["How long does registration take?", "About two minutes. We save your draft in the browser, so you can come back and finish."],
  ["Can I switch courses after registering?", "Yes, within the first week of your batch at no cost."],
  ["Will I get a certificate?", "Yes. You receive a verified certificate once you complete the final project."],
];
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq">
      <Heading title="Questions, answered" sub="Can't find yours? Reach us from the footer." />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.05}>
            <div className="glass overflow-hidden rounded-2xl">
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-display font-bold">
                {q}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-[var(--brand)]"><Plus /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
