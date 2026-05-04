import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Si tu repo es 'https://github.com/usuario/mi-repo', cambia el base a: '/mi-repo/'
  base: './', 
})
