import * as z from 'zod';

export const classFormSchema = z.object({
    name: z.string().min(1, { message: "Osztály nevének megadása kötelező!" }),
    description: z.string().optional(),
})