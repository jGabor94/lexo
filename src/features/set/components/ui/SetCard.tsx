"use client"

import { Avatar, Chip, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SetListItem } from "../../types";
import LangPair from "./LangPair";

const SetCard: FC<{ set: SetListItem, href: string }> = ({ set, href }) => {

    const router = useRouter()

    return (
        <Paper
            onClick={() => router.push(href)}
            sx={{
                cursor: "pointer",
                p: 2
            }}
        >
            <Stack sx={{
                width: 320,
                height: 140,
                justifyContent: "space-between",

            }}
            >
                <Stack gap={2}>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                        {set.name}
                    </Typography>
                    <LangPair
                        termLangCode={set.preferredTermLang}
                        definitionLangCode={set.preferredDefinitionLang}
                    />
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" gap={1} alignItems="center">
                        <Avatar src={set.user?.image} sx={{ width: 30, height: 30 }} />
                        <Typography fontSize={14} color="text.secondary">
                            {set.user?.name}
                        </Typography>
                    </Stack>
                    <Chip
                        label={`${set.termsCount} items`}
                        sx={{
                            fontSize: 12,
                            fontWeight: "bold",
                            backgroundColor: "#e0f7fa",
                            color: "#00796b",
                        }}
                        size="small"
                    />
                </Stack>
            </Stack>
        </Paper>

    );
};

export default SetCard
