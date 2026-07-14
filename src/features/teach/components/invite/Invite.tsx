"use client"

import LoginForm from "@/features/authentication/components/LoginForm"
import useDal from "@/lib/dal/useDal"
import { Avatar, AvatarGroup, Box, Button, Paper, Stack, Typography } from "@mui/material"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { acceptInvite as acceptInviteAction } from "../../dal/mutations"
import { Invite as InviteType } from "../../types"

const Invite: FC<{ invite: InviteType, session: Session | null }> = ({ invite, session }) => {

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const router = useRouter()

    const { action: acceptInvite } = useDal(acceptInviteAction, {
        alerts: {
            success: { severity: "success", content: "Meghíó sikeresen elfogadva 🙂" }
        }
    })

    const handleClick = async () => {
        setLoading(true)
        const res = await acceptInvite(invite.inviteId)

        if (res.success) {
            setRedirect(true)
            router.push(`/home`)
        } else {
            setLoading(false)
        }

    }

    return (
        <Stack gap={6} alignItems="center">
            <Paper
                sx={{
                    width: "95%",
                    maxWidth: 500,
                    px: 2.5,
                    py: 3,
                    borderRadius: 5,
                }}
            >
                <Stack gap={3} alignItems="center" textAlign="center" width="100%">
                    <Avatar
                        sx={{
                            width: 72,
                            height: 72,
                            fontSize: 30,
                            fontWeight: 800,
                            bgcolor: "secondary.main",
                            color: "secondary.contrastText",
                        }}
                    >
                        8
                    </Avatar>

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
                            {invite.teacher.name} meghívott egy osztályba
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: 24, md: 26 },
                                lineHeight: 1.35,
                                fontWeight: 700,
                            }}>
                            Csatlakozás a(z){" "}
                            <Box component="span" sx={{ fontWeight: 800, color: "secondary.dark" }}>
                                {invite.class.name}
                            </Box>{" "}
                            osztályhoz mint {invite.type === "student" ? "tanuló" : "tanár"}.
                        </Typography>

                        {invite.class.description && (
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    color: "text.primary",
                                    lineHeight: 1.75,
                                    fontWeight: 500,
                                    //maxWidth: 390,
                                    textWrap: "pretty",
                                }}
                            >
                                {invite.class.description}
                            </Typography>
                        )}

                        <Typography
                            sx={{
                                fontSize: 14,
                                color: "text.secondary",
                                lineHeight: 1.7,
                                // maxWidth: 360,
                                textWrap: "pretty",
                            }}
                        >
                            Csatlakozás után látni fogod az osztályhoz tartozó feladatokat és a közös tanulási teret.
                        </Typography>
                    </Stack>

                    <AvatarGroup spacing="small">
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    </AvatarGroup>
                    {session && (
                        <Button onClick={handleClick} loading={loading}
                            loadingPosition="end" variant="contained" fullWidth sx={{ borderRadius: 3, minHeight: 46, fontWeight: 700 }}>
                            {redirect ? "Átirányítás" : "Meghívó elfogadása"}
                        </Button>
                    )}
                </Stack>
            </Paper >
            {!session && <LoginForm redirect={`/action/invite/accept/${invite.inviteId}`} />}

        </Stack>

    )
}

export default Invite
