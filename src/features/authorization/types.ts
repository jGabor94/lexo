import { Session } from "next-auth"
import { SelectFolder } from "../folder/types"
import { SelectSet } from "../set/types"
import { SelectClass } from "../teach/types"
import { SelectUser } from "../user/types"

export type Role = "admin" | "user" | "teacher"

export type PermissionCheck<Key extends keyof Permissions> =
    | boolean
    | ((user: Session["user"], data: Permissions[Key]["dataType"]) => boolean)

export type RolesWithPermissions = {
    [R in Role]: Partial<{
        [Key in keyof Permissions]: Partial<{
            [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
        }>
    }>
}

export type Permissions = {
    changelog: {
        dataType: never
        action: "create" | "delete"
    },
    set: {
        dataType: SelectSet
        action: "create" | "read" | "update" | "delete"
    }
    term: {
        dataType: SelectSet
        action: "create" | "read" | "update" | "delete" | "speak"
    },
    folder: {
        dataType: SelectFolder
        action: "create" | "read" | "update" | "delete"
    },
    class: {
        dataType: SelectClass & { teachers: SelectUser[] }
        action: "create" | "read" | "update" | "delete"
    }
}
