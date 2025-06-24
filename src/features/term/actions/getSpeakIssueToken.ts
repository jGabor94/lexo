"use server";

import { isLogged } from "@/features/authentication/utils";
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction";
import { createServerActionResponse } from "@/lib/serverAction/response/response";

const SA_GetSpeakIssueToken = createServerAction(isLogged, async () => {

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

    if (!res.ok) throw new Error("Nem sikerült a token lekérése");
    const token = await res.text();

    return createServerActionResponse({ payload: { token, region } });

});

export default SA_GetSpeakIssueToken;
