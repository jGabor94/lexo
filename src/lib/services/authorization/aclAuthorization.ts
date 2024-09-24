import { Next } from "@/lib/assets/serverAction/createServerAction/types";
import { createServerActionResponse } from "@/lib/assets/serverAction/response/response";
import { Session } from "next-auth";
import { Acl, AclCB, crud, permission } from "./types";



/**
 *Logikai igaz értéket ad vissza ha a megadott acl-re illeszkedik a megadott engedélykészlet és szerepkörök ellenkeő esetben hamis értékkel tér vissza
 */

export const aclCheck = (acl: Acl, permission: permission, roles: Array<string>) => {
    if (roles.some((role: string) => {

        if (acl[role]) {
            if (typeof acl[role] === "boolean") {
                return acl[role] === true
            }
            if (Array.isArray(acl[role])) {
                return (acl[role] as crud).includes(permission)
            }
            return false
        }
        return false
    })) {
        return true
    } else {
        return false
    }
}

/**
 * Ez a függvény egy server action köztes szoftvert ad vissza amely megadott acl (access controll list) és crud művelet alapján ellőnrzi a session-ben eltárolt szerepköröket és eldönti hogy a felhasználó jogosult-e a későbbi műveletre.
 * Az acl megadás lehetséges direkt módon valamint egy aszinkron visszahívással aminek a visszatérési értéke egy acl
 */

export const aclMiddleware = (src: Acl | AclCB, permission: permission = "all") => async (next: Next, req: { session: Session, params: any[] }) => {

    const targetAcl = src instanceof Function ? await src(req) : src

    if (!targetAcl) return createServerActionResponse({ status: 403, error: "ACL not found" })
    if (aclCheck(targetAcl, permission, req.session.user.roles)) return next()
    return createServerActionResponse({ status: 403, error: "You hvae not enough permission to this operation" })
}






