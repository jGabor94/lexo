import { Acl } from "./types"

export const defaultAcl: Acl = {
    user: ["read"],
    admin: true
}

export const createAcl: Acl = {
    user: ["create"],
    admin: true
}



