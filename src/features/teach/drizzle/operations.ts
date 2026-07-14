"server only"

import { db } from "@/drizzle/db";
import { termsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getSupervisedClassesQuery = async (teacherId: string, query?: Parameters<typeof db.query.classesTable.findMany>[0]) => (await db.query.usersTable.findFirst({
    where: { id: teacherId },
    with: {
        supervisedClasses: {
            where: query?.where || undefined,
            with: {
                teachers: {
                    columns: {
                        id: true,
                        email: true,
                        name: true,
                        image: true
                    }
                },
                students: {
                    columns: {
                        id: true,
                        email: true,
                        name: true,
                        image: true
                    }
                },
                tasks: {
                    with: {
                        progresses: true,
                        sets: {
                            columns: {
                                id: true,
                                name: true
                            },
                            with: {
                                terms: {
                                    columns: {
                                        id: true,
                                    }
                                }
                            },
                            extras: {
                                termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid)),
                            }
                        }
                    },
                    orderBy: {
                        deadline: "asc"
                    }
                }
            },

            orderBy: query?.orderBy || {
                createdAt: "desc",
            },
            extras: query?.extras || undefined
        }
    }

}))?.supervisedClasses

export const getAttendedClassesQuery = async (studentId: string, query?: Parameters<typeof db.query.classesTable.findMany>[0]) => (await db.query.usersTable.findFirst({
    where: { id: studentId },
    with: {
        attendedClasses: {
            where: query?.where || undefined,
            with: {
                teachers: {
                    columns: {
                        id: true,
                        email: true,
                        name: true,
                        image: true
                    }
                },
                tasks: {
                    with: {
                        progresses: true,
                        sets: {
                            columns: {
                                id: true,
                                name: true
                            },
                            with: {
                                terms: {
                                    columns: {
                                        id: true,
                                    }
                                }
                            },
                            extras: {
                                termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid)),
                            }
                        }
                    },
                    orderBy: {
                        deadline: "asc"
                    }
                }
            },
            orderBy: query?.orderBy || {
                createdAt: "desc",
            },
            extras: query?.extras || undefined
        }
    }

}))?.attendedClasses


export const getClassQuery = async (id: string) => db.query.classesTable.findFirst({
    where: { id },
    with: {
        teachers: {
            columns: {
                id: true,
                email: true,
                name: true,
                image: true
            }
        },
        students: {
            columns: {
                id: true,
                email: true,
                name: true,
                image: true
            }
        },
        tasks: {
            with: {
                progresses: true,
                sets: {
                    columns: {
                        id: true,
                        name: true,
                    },
                    with: {
                        terms: {
                            columns: {
                                id: true,
                            }
                        }
                    },
                    extras: {
                        termsCount: (table) => db.$count(termsTable, eq(table.id, termsTable.setid)),
                    }
                }
            },
            orderBy: {
                deadline: "asc"
            }
        }
    }
})

export const getInviteQuery = async (inviteId: string) => db.query.invitesTable.findFirst({
    where: { inviteId },
    with: {
        class: true,
        teacher: {
            columns: {
                name: true,
                image: true
            }
        }
    }
})
