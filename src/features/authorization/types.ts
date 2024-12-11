export type Permission = ("create" | "read" | "update" | "delete" | "all")
export type Crud = Array<Permission>
export type Acl = Record<string, Crud | boolean>;
export type AclCB = (req: any) => Promise<Acl | null>
