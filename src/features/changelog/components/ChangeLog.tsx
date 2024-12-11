import { aclCheck } from "@/features/authorization/utils";
import { Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import ChangeLogForm from "./ChangeLogForm";
import ChangeLogList from "./ChangeLogList";
import ChangeLogModal from "./ChangeLogModal";
import { auth } from "@/features/authentication/lib/auth";

const ChangeLog: FC<{}> = async () => {

    const session = await auth()
    const isAdmin = session && aclCheck({ admin: true }, "create", session.user.roles)

    return (
        <ChangeLogModal>

            <Stack gap={2} sx={{ p: 1 }}>
                <Typography fontWeight={600} fontSize={25}>Change log</Typography>
                <Divider flexItem />
                {isAdmin && (<ChangeLogForm />)}
                <ChangeLogList />
            </Stack>
        </ChangeLogModal>
    )
}

export default ChangeLog