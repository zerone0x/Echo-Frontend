/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "rainbow-gradient":
          "linear-gradient(146deg, rgba(45, 68, 126, 0.2) 0%, rgba(181, 176, 160, 0.2) 28%, rgba(204, 115, 115, 0.2) 57%, rgba(81, 49, 157, 0.3) 89%)",
        "custom-yellow": "#E0DBCF",
      },
    },
  },
  plugins: [],
};
