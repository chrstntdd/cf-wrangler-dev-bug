import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
  plugins: [solid({ solid: { hydratable: true, generate: "dom" } })],
  build: {
    manifest: true
  }
})
