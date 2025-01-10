module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Verifique o caminho para seus arquivos
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myCustomTheme: {
          "primary": "rgb(255, 184, 205)", // Navbar
          "secondary": "rgb(255, 250, 240)", // Fundo
          "accent": "rgb(75, 192, 192)", 
          "neutral": "rgb(107, 114, 128)",
          "base-100": "rgb(255, 255, 255)",
          "info": "rgb(59, 130, 246)",
          "success": "rgb(16, 185, 129)",
          "warning": "rgb(234, 179, 8)",
          "error": "rgb(220, 38, 38)",
          "info-content": "rgb(255, 255,0)"
        },
      },
    ],
  },
};
