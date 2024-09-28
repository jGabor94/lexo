import { ChipMenu } from '@/components/menuBar'
import CreateSet from '@/components/set/CreateSet'
import GradeIcon from '@mui/icons-material/Grade'
import { Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = ({ children }) => {



    return (
        <Stack gap={5}>
            <Stack direction="row" justifyContent="space-between">
                <ChipMenu list={[
                    { label: "All sets", href: "/library/all" },
                    { label: "Favorites", href: "/library/favorites", icon: <GradeIcon sx={{ "&&": { color: "text.primary", width: 20, height: 20 } }} /> },
                ]} />
                <CreateSet sx={{ alignSelf: "flex-end" }} />
            </Stack>


            {children}
        </Stack>

    )
}

export default layout