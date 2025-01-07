/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
    daisyui: {
      themes: [
        {
          myCustomTheme: {
            "primary": "rgb(255, 184, 205)",       // Exemplo de cor RGB para o primário
            "secondary": "rgb(255, 99, 132)",     // Exemplo de cor RGB para o secundário
            "accent": "rgb(75, 192, 192)",        // Exemplo de cor RGB para o destaque
            "neutral": "rgb(107, 114, 128)",      // Exemplo de cor neutra
            "base-100": "rgb(255, 255, 255)",     // Cor de fundo principal
            "info": "rgb(59, 130, 246)",          // Cor informativa
            "success": "rgb(16, 185, 129)",       // Cor de sucesso
            "warning": "rgb(234, 179, 8)",        // Cor de alerta
            "error": "rgb(220, 38, 38)",          // Cor de erro
          },
        },
      ],
    },
}

