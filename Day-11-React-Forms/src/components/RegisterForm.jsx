import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Eye, EyeOff, Loader2, Lock, Mail, MapPin, Phone, RotateCcw, User } from "lucide-react";
import InputField from "./InputField.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import SuccessModal from "./SuccessModal.jsx";
import {
  ADDRESS_LIMIT, COURSES, FIELD_ORDER, getPasswordStrength, initialForm, validateAll, validateField,
} from "../utils/validation.js";

const DRAFT_KEY = "lumio-register-draft";

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
    return saved ? { ...initialForm, ...saved } : initialForm;
  } catch {
    return initialForm;
  }
}

export default function RegisterForm({ notify }) {
  const [form, setForm] = useState(loadDraft);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState({ name: "", course: "" });

  // Draft saving (passwords are never stored)
  useEffect(() => {
    const { password, confirmPassword, ...safe } = form;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(safe)); } catch { /* storage unavailable */ }
  }, [form]);

  const strength = getPasswordStrength(form.password);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const next = { ...form, [name]: type === "checkbox" ? checked : value };
    setForm(next);
    if (touched[name] || submittedOnce(touched)) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, next[name], next) }));
    }
    // keep confirm-password in sync while editing password
    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: validateField("confirmPassword", next.confirmPassword, next) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name], form) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateAll(form);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((k) => [k, true])));
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(firstInvalid === "gender" ? "gender-male" : firstInvalid)?.focus();
      notify("Please fix the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted({ name: form.fullName, course: form.course });
      setShowModal(true);
      notify("Registration successful!", "success");
      resetForm(true);
    }, 1600);
  };

  const resetForm = (silent) => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setShowPw(false);
    setShowCpw(false);
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    if (silent !== true) notify("Form cleared.", "info");
  };

  const eyeBtn = (shown, toggle) => (
    <button type="button" onClick={toggle} aria-label={shown ? "Hide password" : "Show password"} className="rounded-full p-1.5 text-muted transition hover:text-fg">
      {shown ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  const common = (name) => ({ name, value: form[name], onChange: handleChange, onBlur: handleBlur, error: errors[name] });

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold">Create your student account</h3>
          <p className="mt-1 text-sm text-muted">Takes about two minutes. Your progress is saved as you type.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField {...common("fullName")} label="Full name" icon={User} placeholder="Aarav Sharma" autoComplete="name" className="sm:col-span-2" />
          <InputField {...common("email")} label="Email address" type="email" icon={Mail} placeholder="you@example.com" autoComplete="email" />
          <InputField {...common("phone")} label="Phone number" type="tel" icon={Phone} placeholder="9876543210" inputMode="numeric" maxLength={10} autoComplete="tel" />
          <InputField {...common("dob")} label="Date of birth" type="date" icon={Calendar} max={today} />

          <div>
            <span className="mb-1.5 block text-sm font-bold">Gender</span>
            <div className="flex gap-2" role="radiogroup" aria-label="Gender">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className={`flex-1 cursor-pointer rounded-2xl border px-2 py-3 text-center text-sm font-medium transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--brand2)] ${form.gender === g ? "border-transparent bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white shadow-lg" : "border-line bg-[var(--card)] hover:border-[var(--brand)]"}`}>
                  <input
                    id={`gender-${g.toLowerCase()}`} type="radio" name="gender" value={g}
                    checked={form.gender === g} onChange={handleChange} onBlur={handleBlur} className="sr-only"
                  />
                  {g}
                </label>
              ))}
            </div>
            <ErrorMessage id="gender-error" message={errors.gender} />
          </div>

          <InputField {...common("course")} as="select" label="Course" icon={BookOpen} className="sm:col-span-2">
            <option value="">Select a course</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </InputField>

          <div className="sm:col-span-2">
            <InputField {...common("address")} as="textarea" rows={3} label="Address" icon={MapPin} placeholder="House no., street, city, state, PIN" maxLength={ADDRESS_LIMIT} />
            <p className={`mt-1 text-right text-xs ${form.address.length > ADDRESS_LIMIT - 20 ? "font-bold text-orange-500" : "text-muted"}`}>
              {form.address.length}/{ADDRESS_LIMIT}
            </p>
          </div>

          <div>
            <InputField {...common("password")} label="Password" type={showPw ? "text" : "password"} icon={Lock} placeholder="At least 8 characters" autoComplete="new-password" rightSlot={eyeBtn(showPw, () => setShowPw(!showPw))} />
            {form.password && (
              <div className="mt-2" aria-live="polite">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.span key={i} className="h-1.5 flex-1 rounded-full bg-line" animate={{ backgroundColor: i <= strength.score ? strength.color : undefined }} />
                  ))}
                </div>
                <p className="mt-1 text-xs font-bold" style={{ color: strength.color }}>{strength.label}</p>
              </div>
            )}
          </div>
          <InputField {...common("confirmPassword")} label="Confirm password" type={showCpw ? "text" : "password"} icon={Lock} placeholder="Repeat your password" autoComplete="new-password" rightSlot={eyeBtn(showCpw, () => setShowCpw(!showCpw))} />
        </div>

        <div className="mt-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input id="terms" type="checkbox" name="terms" checked={form.terms} onChange={handleChange} onBlur={handleBlur} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--brand)]" />
            <span>I agree to the <a href="#top" className="font-bold underline">Terms &amp; Conditions</a> and <a href="#top" className="font-bold underline">Privacy Policy</a>.</span>
          </label>
          <ErrorMessage id="terms-error" message={errors.terms} />
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={submitting} className="btn btn-primary flex-1">
            {submitting ? <><Loader2 size={18} className="animate-spin" /> Creating account…</> : "Create account"}
          </button>
          <button type="button" onClick={() => resetForm()} className="btn btn-ghost">
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </form>
      <SuccessModal open={showModal} name={submitted.name || "there"} course={submitted.course} onClose={() => setShowModal(false)} />
    </>
  );
}

// After a failed submit every field is marked touched, so errors update live on every keystroke.
function submittedOnce(touched) {
  return Object.keys(touched).length === FIELD_ORDER.length;
}
