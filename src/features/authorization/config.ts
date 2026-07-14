import { RolesWithPermissions } from "./types";

export const ROLES = {
    admin: {
        changelog: {
            create: true,
            delete: true,
        },
        set: {
            read: true,
            create: true,
            update: true,
            delete: true,

        },
        term: {
            read: true,
            create: true,
            update: true,
            delete: true,
            speak: true,
        },
        folder: {
            read: true,
            create: true,
            update: true,
            delete: true,
        },
        class: {
            read: true,
            create: true,
            update: true,
            delete: true,
        },
    },
    user: {
        set: {
            read: (user, set) => set.tasks?.[0]?.class?.students.some(s => s.id === user.id) || set.userid === user.id || set.public === true,
            create: true,
            update: (user, set) => set.userid === user.id,
            updateProgress: (user, set) => set.tasks?.[0]?.class?.students.some(s => s.id === user.id) || set.userid === user.id,
            delete: (user, set) => set.userid === user.id,
        },
        folder: {
            read: true,
            create: true,
            update: (user, folder) => folder.userid === user.id,
            delete: (user, folder) => folder.userid === user.id,
        },
        term: {
            read: true,
            create: true,
            speak: true, //user.subscription.type === "pro"
            update: (user, set) => set.userid === user.id,
            delete: (user, set) => set.userid === user.id
        },
        class: {
            read: (user, data) => data.teachers.some(t => t.id === user.id) || data.students.some(s => s.id === user.id),
            invite: (user, data) => data.teachers.some(t => t.id === user.id),
            assign: (user, data) => data.teachers.some(t => t.id === user.id),
            create: true,
            update: true,
            delete: true,
        },
    },

} as const satisfies RolesWithPermissions
