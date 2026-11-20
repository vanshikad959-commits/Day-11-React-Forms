# Day 11 – React Forms, Validation & State Management

**Apex Lark Full Stack Development Internship**

A premium student registration experience for **Lumio**, a fictional online learning platform. It is a full landing page (hero, features, about, courses, stats, testimonials, FAQ, footer) with a validated registration form at its centre.

## Tech stack
React 18 (Vite) · Tailwind CSS 3 · Framer Motion · Lucide React · JavaScript (ES6+)

## Run locally
```bash
npm install
npm run dev
```

## Folder structure
```
src/
├── components/   Navbar, RegisterForm, InputField, ErrorMessage, SuccessModal, Footer, Sections
├── utils/        validation.js (reusable validators + password strength)
├── styles/       style.css
├── App.jsx
└── main.jsx
```

## Registration form
Fields: Full Name, Email, Phone, Date of Birth, Gender, Course, Address, Password, Confirm Password, Terms checkbox, Submit and Reset.

All state (values, errors, touched fields, password visibility, submitting, modal) is handled with `useState`.

**Validation (inline, real-time):** required fields · email format · 10-digit phone (starts 6–9) · password ≥ 8 characters · matching passwords · DOB not in the future and age ≥ 13 · terms accepted. Submission is blocked until everything passes.

## Extra features (9)
1. Dark / light mode (remembers your choice)
2. Fully responsive layout
3. Responsive navbar with mobile menu
4. Address character counter
5. Password strength indicator
6. Auto-focus on the first invalid field
7. Submit spinner
8. Toast notifications
9. Local Storage draft saving (passwords are never stored)

## Screenshots
Add your screenshots to a `screenshots/` folder and link them here:
- `screenshots/home.png`
- `screenshots/form-errors.png`
- `screenshots/success-modal.png`
- `screenshots/dark-mode.png`
