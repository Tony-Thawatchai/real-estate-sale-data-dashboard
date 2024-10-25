const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: ["class"],
  darkMode: "selector",
  theme: {
    container: {
      center: true,
      padding: "5%",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        base: "#1f1d23",
        contrast: "#fcf5fd",
        sparkOrange: "#f46b44",
        cardBg: "#f2ebf7",
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
      },
      padding: {
        "container-top": "2rem",
      },
      boxShadow: {
        card: "rgba(255,255,255,0.15) 0px 2px 5px -1px, rgba(255,255,255,0.25) 0px 1px 3px -1px",
      },
      fontSize: {
        headline: "clamp(1.5rem, 5vw, 2rem)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      fontSize: {
        'h1': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        'h2': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        'h3': ['1.5rem', { lineHeight: '2rem' }], // 24px
        'h4': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        'h5': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'h6': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
