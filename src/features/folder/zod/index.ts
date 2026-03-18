import z from "zod";

export const folderFormSchema = z.object({
    name: z.string().min(1, { message: "Mappa nevének megadása kötelező!" }),
})