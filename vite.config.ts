import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist')
        const indexFile = path.resolve(distDir, 'index.html')
        const notFoundFile = path.resolve(distDir, '404.html')
        if (fs.existsSync(indexFile)) {
          fs.copyFileSync(indexFile, notFoundFile)
          fs.writeFileSync(path.resolve(distDir, '.nojekyll'), '')
        }
      },
    },
  ],
  base: '/ObservatorioMaua/',
})
