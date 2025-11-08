// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      direction: {
        'rtl': 'rtl',
        'ltr': 'ltr'
      }
    },
  },
  plugins: [require("daisyui"),
  function ({ addUtilities }) {
    addUtilities({
      '.direction-rtl': { direction: rtl },
      '.direction-ltr': { direction: ltr },
    })
    },
    require("tw-elements/plugin.cjs")
  ],
  daisyui: {

  },
}
