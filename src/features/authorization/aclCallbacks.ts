import { createObjectId } from "@/utils"
import { Session } from "next-auth"
import { AclCB } from "./types"
import getFolder from "../folder/queries/getFolder"
import getSet from "../set/queries/getSet"
import { Term } from "../term/models/TermModel"

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