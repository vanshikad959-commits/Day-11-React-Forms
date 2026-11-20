import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";

const links = [
  ["Features", "#features"], ["About", "#about"], ["Courses", "#services"],
  ["Stories", "#testimonials"], ["FAQ", "#faq"],
];

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-white shadow-lg">
            <Sparkles size={18} />
          </span>
          Lumio
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => <li key={h}><a className="nav-link" href={h}>{l}</a></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle dark mode" className="btn btn-ghost !p-2.5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={dark ? "m" : "s"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#register" className="btn btn-primary hidden !py-2.5 sm:inline-flex">Register</a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="btn btn-ghost !p-2.5 md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-4 md:hidden"
          >
            {[...links, ["Register", "#register"]].map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium hover:bg-white/10">{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
