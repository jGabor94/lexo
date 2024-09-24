import getChangleLog from "@/lib/database/queries/getChangleLog"
import { auth } from "@/lib/services/authentication/auth"
import { aclCheck } from "@/lib/services/authorization/aclAuthorization"
import { Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import DeleteChangeLog from "./DeleteChangeLog"



const ChangeLogList: FC<{}> = async () => {

    const session = await auth()
    const changelog = await getChangleLog()
    const isAdmin = session && aclCheck({ admin: true }, "create", session.user.roles)

    return (
        <Fragment>
            <Table>
                <TableBody>
                    {changelog.map(log => (
                        <TableRow key={log._id}>
                            <TableCell>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" alignItems="center" gap={2}>
                                        <Typography fontWeight={600}>
                                            {new Date(log.date).toLocaleDateString()}:
                                        </Typography>
                                        <Typography>
                                            {log.description}
                                        </Typography>
                                    </Stack>
                                    {isAdmin && (
                                        <DeleteChangeLog log={log} />
                                    )}
                                </Stack>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </Fragment>
    )
}

export default ChangeLogList