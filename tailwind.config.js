// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mylight: {
          "primary": "#3b82f6",
          "secondary": "#fbbf24",
          "accent": "#22c55e",
          "neutral": "#f3f4f6",
          "base-100": "#ffffff", // الخلفية بيضا
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#fbbf24",
          "error": "#ef4444",
        },
      },
    ],
    darkTheme: "mylight", // تأكيد إن حتى الوضع الغامق يبقى فاتح
  },
}
