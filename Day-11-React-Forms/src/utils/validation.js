export const COURSES = [
  "Full Stack Web Development", "Data Science with Python", "UI/UX Design",
  "Cloud Computing (AWS)", "Cybersecurity Essentials", "Mobile App Development",
];

export const initialForm = {
  fullName: "", email: "", phone: "", dob: "", gender: "", course: "",
  address: "", password: "", confirmPassword: "", terms: false,
};

export const FIELD_ORDER = Object.keys(initialForm);
export const ADDRESS_LIMIT = 200;

export function validateField(name, value, form = {}) {
  const v = typeof value === "string" ? value.trim() : value;
  switch (name) {
    case "fullName":
      if (!v) return "Enter your full name.";
      if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(v)) return "Use letters only, at least 2 characters.";
      return "";
    case "email":
      if (!v) return "Enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, like name@example.com.";
      return "";
    case "phone":
      if (!v) return "Enter your phone number.";
      if (!/^[6-9]\d{9}$/.test(v)) return "Enter a 10-digit mobile number starting with 6–9.";
      return "";
    case "dob": {
      if (!v) return "Select your date of birth.";
      const d = new Date(v), today = new Date();
      if (d > today) return "Date of birth can't be in the future.";
      let age = today.getFullYear() - d.getFullYear();
      const m = today.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
      if (age < 13) return "You must be at least 13 years old to register.";
      return "";
    }
    case "gender":
      return v ? "" : "Select a gender option.";
    case "course":
      return v ? "" : "Choose the course you want to join.";
    case "address":
      if (!v) return "Enter your address.";
      if (v.length < 10) return "Add a few more details (at least 10 characters).";
      return "";
    case "password":
      if (!value) return "Create a password.";
      if (value.length < 8) return "Use at least 8 characters.";
      return "";
    case "confirmPassword":
      if (!value) return "Re-enter your password.";
      if (value !== form.password) return "Passwords don't match.";
      return "";
    case "terms":
      return value ? "" : "Accept the Terms & Conditions to continue.";
    default:
      return "";
  }
}

export function validateAll(form) {
  const errors = {};
  FIELD_ORDER.forEach((k) => {
    const err = validateField(k, form[k], form);
    if (err) errors[k] = err;
  });
  return errors;
}

export function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "Too weak", color: "#ef4444" }, { label: "Weak", color: "#f97316" },
    { label: "Fair", color: "#eab308" }, { label: "Good", color: "#22c55e" },
    { label: "Strong", color: "#06b6d4" },
  ];
  return { score, ...map[score] };
}
