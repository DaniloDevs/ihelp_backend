import { z } from "zod";


const envShema = z.object({
     DATABASE_URL: z.string().default("file:./dev.db"),
})

export const env = envShema.parse(process.env)