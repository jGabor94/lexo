import * as z from 'zod';
import type { Class } from '../types';

export const classFormSchema = z.object({
    name: z.string().min(1, { message: "Osztály nevének megadása kötelező!" }),
    description: z.string().nullable(),
})


export const inviteFormSchema = (existEmails: (Class["students"] | Class["teachers"])) => z.object({
    emails: z.array(z.email()).min(1, { message: "Legalább egy e-mail cím megadása kötelező!" })
        .refine((emails) => !existEmails.some(s => emails.includes(s.email)), {
            message: "Néhány megadott E-mail cím már tagja az osztálynak!",
        }),

})

export const taskFormSchema = z.object({
    name: z.string().min(1, { message: "A feladat nevének megadása kötelező!" }),
    description: z.string().nullable(),
    deadline: z.string().min(1, { message: "A határidő megadása kötelező!" }).regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
        .refine((val) => !isNaN(new Date(val).getTime()), {
            message: "Érvénytelen dátum és idő",
        }),
    setIds: z.array(z.uuidv4()).min(1, { message: "Legalább egy gyűjteményt ki kell választani!" }),
})
