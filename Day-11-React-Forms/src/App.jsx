import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import { About, FAQ, Features, Hero, Reveal, Services, Stats, Testimonials } from "./components/Sections.jsx";

const toastIcon = { success: CheckCircle2, error: XCircle, info: Info };
const toastColor = { success: "text-emerald-500", error: "text-red-500", info: "text-[var(--brand2)]" };

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("lumio-theme");
      if (saved) return saved === "dark";
    } catch { /* ignore */ }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("lumio-theme", dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);

  const notify = useCallback((message, type = "info") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const Icon = toast ? toastIcon[toast.type] : null;

  return (
    <>
      <Navbar dark={dark} toggleTheme={() => setDark((d) => !d)} />
      <main>
        <Hero />
        <Features />
        <About />
        <Services />
        <section id="register" className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-extrabold sm:text-5xl">Your seat is <span className="gradient-text">one form away</span></h2>
            <p className="mt-5 text-lg text-muted">Fill in your details and pick a track. We'll confirm your batch and send your first lesson by email.</p>
            <ul className="mt-6 space-y-3 text-muted">
              <li>✓ Free to register, no card needed</li>
              <li>✓ Switch courses in your first week</li>
              <li>✓ Your draft saves automatically</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}><RegisterForm notify={notify} /></Reveal>
        </section>
        <Stats />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />

      <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-[120] -translate-x-1/2">
        <AnimatePresence>
          {toast && (
            <motion.div key={toast.id} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
              className="glass pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-3 font-medium">
              <Icon size={20} className={toastColor[toast.type]} /> {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
