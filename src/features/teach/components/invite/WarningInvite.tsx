import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Avatar, AvatarGroup, Box, Button, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { Invite } from '../../types';

const WarningInvite: FC<{ invite: Invite }> = ({ invite }) => (
    <Paper
        sx={{
            width: 500,
            maxWidth: "95%",
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 4 },
            borderRadius: 5,
        }}
    >
        <Stack gap={3} alignItems="center" textAlign="center" width="100%">

            <GppMaybeIcon sx={{ fontSize: 56 }} />
            <Stack gap={1.5} alignItems="center">
                <Typography
                    sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "text.secondary",
                    }}
                >
                    Csatlakozás a(z){" "}
                    <Box component="span" sx={{ fontWeight: 800 }}>
                        {invite.class.name}
                    </Box>{" "}
                    osztályhoz.
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: 24, md: 26 },
                        lineHeight: 1.35,
                        fontWeight: 700,
                    }}
                >
                    Érvénytelen meghívó
                </Typography>

            </Stack>

            <AvatarGroup spacing="small">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </AvatarGroup>

            <Button LinkComponent={Link} href="/home" variant="contained" fullWidth sx={{ borderRadius: 3, minHeight: 46, fontWeight: 700 }}>
                Irány a főoldal
            </Button>
        </Stack>
    </Paper >
)


export default WarningInvite