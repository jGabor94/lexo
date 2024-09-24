import { createObjectId } from "@/lib/assets/general"
import { Term } from "@/lib/database/models"
import { getFolder, getSet } from "@/lib/database/queries"
import { Session } from "next-auth"
import { AclCB } from "./types"

export const getFolderAcl: AclCB = async ({ params: [folderid] }: { params: [folderid: string] }) => {
    const res = await getFolder(createObjectId(folderid))
    return res?.acl ? res.acl : null
}

export const getSetAcl: AclCB = async ({ params: [setid], session }: { params: [setid: string], session: Session },) => {
    const res = await getSet(createObjectId(setid), createObjectId(session.user._id))
    return res?.acl ? res.acl : null
}

export const getTermAcl: AclCB = async ({ params: [termid] }: { params: [termid: string] }) => {
    const res = await Term.findOne({ _id: termid }).lean()
    return res?.acl ? res.acl : null
}