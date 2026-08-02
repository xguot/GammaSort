/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#232D4B",
          light: "#2D3A5C",
          dark: "#1A2238",
        },
        orange: {
          DEFAULT: "#E57200",
          light: "#FF8C1A",
          dark: "#CC6600",
        },
        offwhite: "#F8F9FA",
        body: "#1F2937",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
