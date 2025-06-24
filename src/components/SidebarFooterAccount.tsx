import { Avatar, Box, Stack, Typography } from "@mui/material";
import { SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import { useSession } from "@toolpad/core/useSession";
import Settings from "./settings";

const SidebarFooterAccount = ({ mini }: SidebarFooterProps) => {

    const session = useSession()

    if (mini) return (
        <Box p={2} gap={2}>
            <Settings />
        </Box>
    )

    return (
        <Stack direction="row" alignItems="center" p={2} gap={2} sx={{ width: "100%" }} >
            <Avatar src={session?.user?.image || ""} />
            <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0, flexGrow: 1, justifyContent: "space-between" }} >
                <Stack sx={{ justifyContent: "space-between", }} >
                    <Typography sx={{ fontWeight: 600 }}>{session?.user?.name}</Typography>
                    <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: 13, fontWeight: 500 }}>{session?.user?.email}</Typography>
                </Stack>
                <Settings />

            </Stack>
        </Stack>
    );
}

export default SidebarFooterAccount