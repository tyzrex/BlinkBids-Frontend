/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0474ba",
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
        "accent-1": "#0046be",
        "accent-2": "#bb0628",
        "accent-3": "#fff200",
        "accent-4": "#013196",
        "accent-white": "#f7fafc",
        "body-color": "#777777",
        "title-text": "#101010",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
        xs: "375px",
        s: "400px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // function ({ addBase, theme }) {
    //   addBase({
    //     h1: {
    //       fontSize: theme("fontSize.3xl"),
    //       fontWeight: theme("fontWeight.bold"),
    //       lineHeight: theme("lineHeight.tight"),
    //     },
    //     h2: {
    //       fontSize: theme("fontSize.2xl"),
    //       fontWeight: theme("fontWeight.bold"),
    //       lineHeight: theme("lineHeight.tight"),
    //     },
    //     h3: {
    //       fontSize: theme("fontSize.xl"),
    //       fontWeight: theme("fontWeight.bold"),
    //       lineHeight: theme("lineHeight.snug"),
    //     },
    //     h4: {
    //       fontSize: theme("fontSize.lg"),
    //       fontWeight: theme("fontWeight.bold"),
    //       lineHeight: theme("lineHeight.snug"),
    //     },
    //     h5: {
    //       fontSize: theme("fontSize.md"),
    //       fontWeight: theme("fontWeight.bold"),
    //       lineHeight: theme("lineHeight.relaxed"),
    //     },
    //     h6: {
    //       fontSize: theme("fontSize.sm"),
    //       fontWeight: theme("fontWeight.bold"),
    //       lineHeight: theme("lineHeight.relaxed"),
    //     },
    //   });
    // },
  ],
};
