import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// assetsInlineLimit 0: the omni-boilerplate UI masks SVG icons with CSS url(), which breaks when SVGs are inlined as data URIs.
export default defineConfig({ plugins: [react()], build: { assetsInlineLimit: 0 } })
