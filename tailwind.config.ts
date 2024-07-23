import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
    extend: {
      fontSize: {
        "feedback-size": [
          "77px",
          {
            lineHeight: "1",
          },
        ],
        "77": "77px",
        "33": "33px",
        "2xs": "10px",
        "14s": "14px",
        "22s": "22px",
      },
      screens: {
        xxs: "200px",
        xs: "300px",
        "2sm": "400px",
      },
      backgroundImage: {
        "gradient-pink": "linear-gradient(to top, #DA5553, #A72099)",
        "gradient-skyblue":
          "linear-gradient(to top,#6FDDE8,#6AD6DD,#5DC6C2,#48AC96,#3E9F7F)",
        "gradient-green": "linear-gradient(to top, #71D055, #819A76, #926797)",
        "student-img":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/studetnt-bg.png')",
        "student-bg-mobile":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/student-bg-mobile.png')",
        "teacher-page-1":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/teacher-bg.png')",
        "main-session-bg":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/main-session-bg.png')",
        "red-gradient":
          "linear-gradient(38.7deg, #A72099 9.96%, #DA5553 91.54%)",
        MacBookPro:
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/MacBookPro.png')",
        "felix-koutchinsk":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/felix-koutchinsk.png')",
        iPhone:
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/iPhone.png')",
        "config-session":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/config-session.png')",
        "feedback-student-res":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/feedback-student.png')",
        "privacy-policy":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/privacy-policy.png')",
        "privacy-policy-res":
          "linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)), url('/assets/images/privacy-policy-responsive.png')",
      },
      borderColor: {
        "border-bg-mixer": "linear-gradient(90deg, #EFECD5 0%, #B7BDB3 75.2%)",
      },
      colors: {
        mantis: "#71D055",
        concord: "#827C79",
        gallary: "#F0F0F0",
        mercury: "#E8E8E8",
        "jungle-green": "#24AA92",
        alto: "#D1D1D1",
        "gray-chateau": "#999FA4",
        "ocean-green": "#3E9F7F",
        "violet-egplant": "#A72099",
        roman: "#DA5553",
        tuatara: "#373735",
        "desert-storm": "#F3F2F1",
        "key-lime-pie": "#c9c229",
        "lunar-green": "#414340",
        cararra: "#F3F3F0",
        "chestnut-rose": "#C85A6E",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        fontColor: "hsl(var(--fontColor))",
        pinkButton: "hsl(var(--pinkButton))",
        pinkButtonHover: "hsl(var(--pinkButtonHover))",
        greenButton: "hsl(var(--greenButton))",
        greenButtonHover: "hsl(var(--greenButtonHover))",
        yellowButton: "hsl(var(--yellowButton))",
        yellowButtonHover: "hsl(var(--yellowButtonHover))",
        submitButton: "hsl(var(--submitButton))",
        submitButtonHover: "hsl(var(--submitButtonHover))",
        knobBackgroud: "hsl(var(--knobBackgroud))",
        knobInsideColor: "hsl(var(--knobInsideColor))",
        header: {
          DEFAULT: "hsl(var(--header))",
          foreground: "hsl(var(--heder-foreground))",
        },
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
        "red-gradient-one": "#A72099",
        "red-gradient-two": "#DA5553",
        redGradient: "linear-gradient(38.7deg, #A72099 9.96%, #DA5553 91.54%)",
      },
      boxShadow: {
        "3xl": "0px 0px 0px 3px rgba(256,0,0,0.3)",
        "info-bg": "#F9FFD4",
        "desert-storm": "#F3F2F1",
        "knob-shadow": "6px 6px 6px 1px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      width: {
        "97": "375px",
        "87": "87px",
        "41s": "41px",
        "65s": "65px",
        "9s": "9px",
      },
      maxWidth: {
        "97": "375px",
      },
      padding: {
        "03": "3px",
        "1s": "1px",
      },
      height: {
        "97": "700px",
        "41s": "41px",
        "65s": "65px",
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
} satisfies Config;

export default config;
