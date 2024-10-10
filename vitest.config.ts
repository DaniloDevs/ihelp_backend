// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
     test: {
          coverage: {
               reportsDirectory: "./src/test/coverage/", 
               include: [
                    "src/test/**/*.spec.ts",
                    "src/routes/**/*.ts"
               ], 
          },
     },
})