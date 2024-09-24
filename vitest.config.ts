import { defineConfig } from 'vitest/config'

export default defineConfig({
     test: {
          include: [ 'src/test/**/*.ts'], 
          coverage: {
               reportsDirectory: "./src/test/coverage"
          }
     },
     
})