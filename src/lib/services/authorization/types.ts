export type permission = ("create" | "read" | "update" | "delete" | "all")
export type crud = Array<permission>
export type Acl = Record<string, crud | boolean>;
export type AclCB = (req: any) => Promise<Acl | null>
