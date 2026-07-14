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
        }),
        tasks: r.many.tasksTable({ alias: "tasksSets" }),
    },
    termsTable: {
        set: r.one.setsTable({
            from: r.termsTable.setid,
            to: r.setsTable.id,
            optional: false
        }),
        progresses: r.many.progressesTable({
            from: r.termsTable.id,
            to: r.progressesTable.termId,
        })
    },
    progressesTable: {
        term: r.one.termsTable({
            from: r.progressesTable.termId,
            to: r.termsTable.id,
        }),
        task: r.one.tasksTable({
            from: r.progressesTable.taskId,
            to: r.tasksTable.id,
        }),
    },
    classesTable: {
        teachers: r.many.usersTable({
            to: r.usersTable.id.through(r.classToTeachersTable.teacherId),
            from: r.classesTable.id.through(r.classToTeachersTable.classId),
            alias: "teachersClasses"
        }),
        students: r.many.usersTable({
            to: r.usersTable.id.through(r.classToStudentsTable.studentId),
            from: r.classesTable.id.through(r.classToStudentsTable.classId),
            alias: "studentsClasses"
        }),
        tasks: r.many.tasksTable(),
    },
    usersTable: {
        sets: r.many.setsTable({ alias: "ownedSets" }),
        folders: r.many.foldersTable(),
        favorites: r.many.setsTable({ alias: "favoriteSets" }),
        supervisedClasses: r.many.classesTable({ alias: "teachersClasses" }),
        attendedClasses: r.many.classesTable({ alias: "studentsClasses" }),
    },
    invitesTable: {
        class: r.one.classesTable({
            from: r.invitesTable.classId,
            to: r.classesTable.id,
            optional: false
        }),
        teacher: r.one.usersTable({
            from: r.invitesTable.teacherId,
            to: r.usersTable.id,
            optional: false
        })
    },
    tasksTable: {
        class: r.one.classesTable({
            from: r.tasksTable.classId,
            to: r.classesTable.id,
            optional: false
        }),
        sets: r.many.setsTable({
            from: r.tasksTable.id.through(r.setToTaskTable.taskId),
            to: r.setsTable.id.through(r.setToTaskTable.setId),
            alias: "tasksSets"
        }),
        progresses: r.many.progressesTable(),
    }
}))

export default relations
