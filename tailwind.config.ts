import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      boxShadow: {
        "dialog": "rgba(13, 22, 25, 0.16) 0px 8px 32px 0px, rgb(229, 229, 229) 0px -1px 0px 0px"
      },
      spacing: {
        'h-screen-minus-70': 'calc(100vh - 70px)',
        'h-screen-minus-80': 'calc(100vh - 80px)',
        'h-screen-minus-120': 'calc(100vh - 120px)',
        'h-full-minus-96': 'calc(100% - 96px)',
        'h-full-minus-80': 'calc(100% - 80px)',
        'h-full-minus-100': 'calc(100% - 100px)',
        'h-full-minus-120': 'calc(100% - 120px)',
        'w-screen-minus-64': 'calc(100vw - 64px)',
        'w-full-minus-298': 'calc(100% - 298px)'
      },
      fontFamily: {
        head: ["Roboto", 'sans-serif'],
      },
      fontSize: {
        'heading': '24px',
        'secondHead': '20px',
        'thirdHead': '17px',
        'text': '14px',
      },
      fontWeight: {
        'heading': '600',
        'text': '400',
        'textGray': '400'
      },
      lineHeight: {
        'heading': '32px',
        'secondHead': '28px',
        'thirdHead': '24px',
        'text': '14px',
      },
      colors: {
        thinBorder: "#E5E5E5",
        logo: "#3664FB",
        delete: "#d11a2a",
        deleteBlur: "#d11a2a22",
        dashboardText: "rgb(22,28,45)",
        dashboardBlue: "rgb(57,108,240)",
        dashboardBlueShadow: "rgba(57,108,240,0.357)",
        brandColorLight: "#FFD1E0",
        brandColor: "#FF66A1",
        button: "#FF66A1",
        headingColor: "#0A0A0A",
        textGray: "rgb(117, 118, 118)",
        textLight: "rgb(85,85,85)",
        textLightest: "rgb(132,146,166)",
        textDart: "rgb(34,37,41)",
        para: "rgb(102,102,102)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("tailwindcss-animate")
  ],
} satisfies Config

export default config