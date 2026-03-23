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
            read: (user, set) => set.userid === user.id || set.public === true,
            create: true,
            update: (user, set) => set.userid === user.id,
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
    },
    teacher: {
        class: {
            read: (user, data) => data.teachers.some(t => t.id === user.id),
            create: true,
            update: true,
            delete: true,
        },
    }
} as const satisfies RolesWithPermissions