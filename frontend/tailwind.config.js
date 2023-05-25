/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        talentRecruiter: {
          primary: "#3CCF56",
          secondary: "#F9FCFF",
          accent: "#1A1A1A",
          neutral: "#90949F",
          "base-100": "#ffffff",
          info: "#98A8DD",
          success: "#1BBB70",
          warning: "#DF7E07",
          error: "#FA5C5C",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};

