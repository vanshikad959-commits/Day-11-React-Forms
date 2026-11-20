import { Github, Linkedin, Sparkles, Twitter } from "lucide-react";

export default function Footer() {
  const cols = {
    Learn: ["Courses", "Mentors", "Certificates", "Pricing"],
    Company: ["About", "Careers", "Blog", "Contact"],
    Support: ["Help centre", "Terms", "Privacy", "Refunds"],
  };
  return (
    <footer className="mt-12 px-3 pb-6 sm:px-6">
      <div className="glass mx-auto max-w-6xl rounded-[2rem] p-8 sm:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 font-display text-xl font-extrabold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand2)] text-white"><Sparkles size={18} /></span>
              Lumio
            </a>
            <p className="mt-4 max-w-xs text-muted">Live, mentor-led courses for students who want skills employers actually hire for.</p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#top" aria-label="Social link" className="btn btn-ghost !p-2.5 hover:-translate-y-1"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([h, items]) => (
            <div key={h}>
              <h4 className="mb-4 font-display font-bold">{h}</h4>
              <ul className="space-y-2.5 text-muted">
                {items.map((i) => <li key={i}><a href="#top" className="transition hover:text-fg">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">© {new Date().getFullYear()} Lumio Learning. Built for the Apex Lark Full Stack Internship, Day 11.</p>
      </div>
    </footer>
  );
}
