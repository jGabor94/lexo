import { LanguageCode } from "@/features/term/types"
import { Stack } from '@mui/material'
import { ArrowRightLeft } from "lucide-react"
import { FC } from 'react'


const LangPair: FC<{ termLangCode: LanguageCode, definitionLangCode: LanguageCode }> = ({ termLangCode, definitionLangCode }) => (
    <Stack direction="row" gap={0.5} alignItems="center">
        {termLangCode}
        <ArrowRightLeft />
        {definitionLangCode}
    </Stack>
)
export default LangPair