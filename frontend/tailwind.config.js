/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      colors: {
        forest: {
          50: "#f0f7f3",
          100: "#dbeef1",
          200: "#b8dfd4",
          300: "#8ac7b4",
          400: "#5ba790",
          500: "#3d8a74",
          600: "#2d6e5c",
          700: "#24584a",
          800: "#1e463c",
          900: "#163830",
          950: "#0b201b",
        },
        sage: {
          50: "#f7f8f6",
          100: "#ecefe9",
          200: "#d9ded3",
          300: "#bcc5b4",
          400: "#9da992",
          500: "#808d75",
          600: "#64705a",
          700: "#4f5847",
          800: "#40473a",
          900: "#373c32",
        },
        cream: {
          50: "#fdfdfb",
          100: "#faf9f5",
          200: "#f4f1e8",
          300: "#ebe5d5",
          400: "#ded4bc",
          500: "#cebfa0",
        },
      },
    },
  },
  plugins: [],
};
