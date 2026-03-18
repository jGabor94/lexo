import ThemeSwitch from '@/components/settings/components/DarkModeSwitch'
import SignOutButton from '@/components/settings/components/SignOutButton'
import { auth } from '@/features/authentication/lib/auth'
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { FC } from 'react'

const page: FC<{}> = async () => {

    const session = await auth()
    console.log({ session })

    return (
        <Box >
            <Box mb={4} textAlign={{ xs: 'center', md: 'left' }}>
                <Typography variant="h4" fontWeight="bold">
                    Fiókom
                </Typography>
            </Box>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{ width: "100%" }}
                gap={8}
            >
                <Stack gap={2}>
                    <Stack gap={2} direction="row" alignItems="center" sx={{ flex: { xs: 1, md: 1 } }}>
                        <Avatar src={session?.user?.image || ""} />
                        <Typography variant="h6" fontWeight="bold">
                            {session?.user?.name}
                        </Typography>
                    </Stack>
                    <SignOutButton />

                </Stack>

                <Divider orientation="vertical" flexItem />

                <Stack
                    spacing={4}
                    alignItems="center"
                    sx={{ flex: { xs: 1, md: 4 } }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                        <Typography>Téma:</Typography>
                        <ThemeSwitch />

                    </Stack>


                </Stack>


            </Stack>
        </Box >
    )
}

export default page