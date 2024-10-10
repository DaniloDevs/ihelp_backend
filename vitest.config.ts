<<<<<<< HEAD
// vitest.config.ts
=======
>>>>>>> 4d4864f37db59c5f0cf37ffbc634c4ace2e121eb
import { defineConfig } from 'vitest/config'

export default defineConfig({
     test: {
<<<<<<< HEAD
          coverage: {
               reportsDirectory: "./src/test/coverage/", 
               include: [
                    "src/test/**/*.spec.ts",
                    "src/routes/**/*.ts"
               ], 
          },
     },
=======
          include: [ 'src/test/**/*.ts'], 
          coverage: {
               reportsDirectory: "./src/test/coverage"
          }
     },
     
>>>>>>> 4d4864f37db59c5f0cf37ffbc634c4ace2e121eb
})