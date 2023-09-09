/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      esm: "390px",
      sm: "480px",
      xmd: "540px",
      "2xmd": "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        poppins: ["Poppins"],
      },
      fontWeight: {
        500: "500",
        600: "600",
      },
      colors: {
        biru: "#dce4ff",
        textBtn: "#90a8f0",
        textBtnHover: "#798dc9",
        baseColor: "#fafdff",
      },
      boxShadow: {
        sidebar:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        sidebar2:
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        sidebar3:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
