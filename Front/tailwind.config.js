/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agrega tus propios colores personalizados aquí si es necesario
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["cupcake","retro"],
  },
  
};
