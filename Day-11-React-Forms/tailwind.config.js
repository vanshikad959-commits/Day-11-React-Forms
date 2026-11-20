export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { bg: "var(--bg)", fg: "var(--fg)", muted: "var(--muted)", line: "var(--line)" },
      fontFamily: { display: ["Sora", "sans-serif"], sans: ["DM Sans", "sans-serif"] },
    },
  },
  plugins: [],
};
