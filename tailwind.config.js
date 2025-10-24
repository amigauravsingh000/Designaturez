/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Modern Minimalist Palette inspired by Linear.app & Notion
        // Primary: Refined Purple-Blue (Professional & Trustworthy)
        primary: {
          50: "#f5f7ff",
          100: "#ebf0fe",
          200: "#d6e0fd",
          300: "#b3c7fb",
          400: "#8aa5f8",
          500: "#6b7ff2", // Core brand color - vibrant yet sophisticated
          600: "#5865e8",
          700: "#4650d3",
          800: "#3941ab",
          900: "#323a87",
          950: "#1f2351",
        },
        // Secondary: Soft Cyan-Teal (Calm & Modern)
        secondary: {
          50: "#f0fdff",
          100: "#e0f9fe",
          200: "#b9f2fd",
          300: "#7de8fc",
          400: "#38d9f8",
          500: "#0ebde6", // Accent color - refreshing contrast
          600: "#0298c2",
          700: "#07799d",
          800: "#0d6280",
          900: "#10516a",
          950: "#043548",
        },
        // Accent: Warm Purple (Creativity & Energy)
        accent: {
          50: "#faf5ff",
          100: "#f4e8ff",
          200: "#ebd5ff",
          300: "#dab4fe",
          400: "#c183fc",
          500: "#a855f7", // Vibrant highlight
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        // Neutral: True Gray Scale (WCAG Compliant)
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Success: Fresh Green (Positive Actions)
        success: {
          50: "#f0fdf5",
          100: "#dcfce8",
          200: "#bbf7d1",
          300: "#86efad",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Warning: Warm Amber (Attention)
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Danger: Bold Red (Critical States)
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        // Semantic Colors for Light Mode
        background: {
          DEFAULT: "#ffffff",
          secondary: "#fafafa",
          tertiary: "#f5f5f5",
        },
        foreground: {
          DEFAULT: "#171717",
          secondary: "#525252",
          tertiary: "#a3a3a3",
        },
        border: {
          DEFAULT: "#e5e5e5",
          secondary: "#d4d4d4",
        },
        // Room Type Colors - Harmonious & Distinguishable
        room: {
          bedroom: "#6b7ff2", // Primary Blue
          bathroom: "#0ebde6", // Cyan
          kitchen: "#f59e0b", // Amber
          living: "#22c55e", // Green
          dining: "#a855f7", // Purple
          pooja: "#ec4899", // Pink
          study: "#8b5cf6", // Violet
          gym: "#ef4444", // Red
          guest: "#10b981", // Emerald
          storage: "#737373", // Gray
          balcony: "#06b6d4", // Light Cyan
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Poppins", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Courier New", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.875rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        "3xl": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.02em" },
        ],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.15)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.04)",
        none: "none",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "200ms",
        slow: "300ms",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
