/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",

      }
    },
  },
  plugins: [],
}

