import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Universe UI colors
        "electric-blue": "hsl(210 100% 60%)", // Primary
        "vibrant-green": "hsl(140 100% 40%)", // Secondary
        "accent-purple": "hsl(270 100% 70%)",
        "accent-yellow": "hsl(45 100% 60%)",
        "dark-bg": "hsl(240 10% 3.9%)", // Deep dark mode background
        "dark-card": "hsl(240 10% 8%)",
        "dark-border": "hsl(240 5% 15%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulsate: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px var(--tw-shadow-color)" },
          "50%": { boxShadow: "0 0 20px var(--tw-shadow-color), 0 0 30px var(--tw-shadow-color)" },
          "100%": { boxShadow: "0 0 5px var(--tw-shadow-color)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulsate-dot": "pulsate 1.5s infinite ease-in-out",
        "glow-sm": "glow 2s infinite ease-in-out",
        "glow-md": "glow 3s infinite ease-in-out",
        "glow-lg": "glow 4s infinite ease-in-out",
      },
      boxShadow: {
        "glow-sm": "0 0 5px var(--tw-shadow-color)",
        "glow-md": "0 0 10px var(--tw-shadow-color)",
        "glow-lg": "0 0 15px var(--tw-shadow-color)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
