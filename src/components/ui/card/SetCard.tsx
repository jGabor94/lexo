import { SetListItem } from "@/lib/database/queries/getSets";
import { Card } from "@/lib/mui/styled";
import { Avatar, Chip, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import LangPair from "./LangPair";

const SetCard: FC<{ set: SetListItem, href: string }> = ({ set, href }) => {
    return (
        <Card component={Link} href={href} sx={{ textDecoration: "none" }}>
            <Stack
                sx={{
                    width: 300,
                    height: 150,
                    p: 2,
                    justifyContent: "space-between",
                    cursor: "pointer",
                }}
            >
                <Stack gap={1}>
                    <Typography color="text.primary">{set.name}</Typography>
                    <LangPair
                        termLangCode={set.preferredTermLang.langCode}
                        definitionLangCode={set.preferredDefinitionLang.langCode}
                    />
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Stack></Stack>
                    <Stack direction="row" gap={1} alignItems="center">
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <Avatar src={set.user.image} sx={{ width: 25, height: 25 }} />
                            <Typography fontSize={12}>{set.user.name}</Typography>
                        </Stack>
                        <Divider flexItem orientation="vertical" />
                        <Chip
                            label={`${set.termsCount} items`}
                            sx={{ width: "fit-content" }}
                            size="small"
                            color="primary"
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Card>

    );
};

export default SetCard
