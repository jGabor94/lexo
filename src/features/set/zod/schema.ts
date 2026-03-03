import { languageCodes } from '@/features/term/lib/constants';
import * as z from 'zod';

export const setFormSchema = z.object({
    name: z.string().min(1, { message: "Gyűjtemény nevének megadása kötelező!" }),
    preferredTermLang: z.enum(languageCodes),
    preferredDefinitionLang: z.enum(languageCodes),
})
