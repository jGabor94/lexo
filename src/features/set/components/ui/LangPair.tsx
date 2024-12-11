import { LanguageCode } from '@/lib/language_tools/types'
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import { Stack, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

const LangLabel: FC<{ children: ReactNode }> = ({ children }) => (
    <Stack sx={{
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        width: 30,
        height: 30,
        borderSize: "1px",
        borderStyle: "solid",
        borderRadius: "100%",
        borderColor: "text.primary"
    }}>
        <Typography fontSize={12} sx={{ fontWeight: 600 }}>{children}</Typography>
    </Stack>
)

const LangPair: FC<{ termLangCode: LanguageCode, definitionLangCode: LanguageCode }> = ({ termLangCode, definitionLangCode }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
        <LangLabel>{termLangCode}</LangLabel>
        <SwapHorizIcon />
        <LangLabel>{definitionLangCode}</LangLabel>
    </Stack>
)
export default LangPair