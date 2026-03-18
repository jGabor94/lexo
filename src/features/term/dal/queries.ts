"use server"

import { db } from "@/drizzle/db";
import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";
import z from "zod";
import { getTermsQuery } from "../drizzle/operations";


export const getTerms = Dal.create()
    .$Input<[setid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "read",
        data: async (setid) => db.query.setsTable.findFirst({ where: { id: setid } })
    })
    .operation(async ({ input }) => {
        const [setid] = input
        return createSuccessReturn(await getTermsQuery(setid))
    })

export const getSpeakIssueToken = Dal.create()
    .schema({
        output: z.object({
            token: z.string(),
            region: z.string()
        }),
    })
    .authenticate()
    .authorize({
        resource: "term",
        action: "speak",
    })
    .operation(async () => {
        const region = process.env.AZURE_REGION as string;
        const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
            {
                method: "POST",
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_API_KEY as string,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }

        );

        if (!res.ok) return createErrorReturn({ type: "token-not-available", error: "Nem sikerült a token lekérése" });
        const token = await res.text();

        return createSuccessReturn({ token, region });
    })


