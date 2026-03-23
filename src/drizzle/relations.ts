import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

const relations = defineRelations(schema, (r) => ({
    foldersTable: {
        sets: r.many.setsTable(),
        user: r.one.usersTable({
            from: r.foldersTable.userid,
            to: r.usersTable.id,
            optional: false
        })
    },
    setsTable: {
        terms: r.many.termsTable(),
        user: r.one.usersTable({
            from: r.setsTable.userid,
            to: r.usersTable.id,
            alias: "ownedSets",
            optional: false
        }),
        folders: r.many.foldersTable({
            from: r.setsTable.id.through(r.setToFolderTable.setid),
            to: r.foldersTable.id.through(r.setToFolderTable.folderid)
        }),
        likers: r.many.usersTable({
            from: r.setsTable.id.through(r.favoriteSetsTable.setid),
            to: r.usersTable.id.through(r.favoriteSetsTable.userid),
            alias: "favoriteSets"
        })
    },
    termsTable: {
        set: r.one.setsTable({
            from: r.termsTable.setid,
            to: r.setsTable.id,
            optional: false
        }),
    },
    classesTable: {
        teachers: r.many.usersTable({
            to: r.usersTable.id.through(r.classToUsersTable.teacherId),
            from: r.classesTable.id.through(r.classToUsersTable.classId),
            alias: "teachersClasses"
        })
    },
    usersTable: {
        sets: r.many.setsTable({ alias: "ownedSets" }),
        folders: r.many.foldersTable(),
        favorites: r.many.setsTable({ alias: "favoriteSets" }),
        classes: r.many.classesTable({ alias: "teachersClasses" }),
    },
}))

export default relations