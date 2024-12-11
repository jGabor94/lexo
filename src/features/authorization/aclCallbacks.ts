import { db } from "@/drizzle/db"
import { termsTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"
import getFolder from "../folder/queries/getFolder"
import getSet from "../set/queries/getSet"
import { AclCB } from "./types"

export const getFolderAcl: AclCB = async ({ params: [folderid] }: { params: [folderid: string] }) => {
    const res = await getFolder(folderid)
    return res?.acl ? res.acl : null
}

export const getSetAcl: AclCB = async ({ params: [setid], session }: { params: [setid: string], session: Session },) => {
    const res = await getSet(setid, session.user.id)
    return res?.acl ? res.acl : null
}

export const getTermAcl: AclCB = async ({ params: [termid] }: { params: [termid: string] }) => {
    const [res] = await db.select().from(termsTable).where(eq(termsTable.id, termid))
    return res?.acl ? res.acl : null
}