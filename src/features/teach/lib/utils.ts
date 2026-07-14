import { Class, StudentClassListItem, TeacherClassListItem } from "../types"

export const splitTokens = (value: string) => value
    .split(/[\s,;]+/)
    .map((item) => item.trim())
    .filter(Boolean)

export const dedupe = (value: string[]) => Array.from(new Set(value))

export const isDueThisWeek = (deadline: Date) => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7))
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 7)

    const deadlineTime = new Date(deadline).getTime()
    return deadlineTime >= startOfWeek.getTime() && deadlineTime < endOfWeek.getTime()
}

export const calcAssignmentStats = (task: Class["tasks"][number], students: Class["students"]) => {

    const isExpired = new Date(task.deadline).getTime() < Date.now()
    const totalScores = task.sets.reduce((sum, set) => sum + set.termsCount, 0) * 5

    const completedAvargeScores = task.progresses.reduce((sum, progress) => sum + progress.status, 0)

    const completedUserScores = students.map((student) => {
        const progresses = task.progresses.filter(p => p.userId === student.id)
        const completedScores = progresses.reduce((sum, progress) => sum + progress.status, 0)
        const progress = totalScores > 0 ? Math.round((completedScores / totalScores) * 100) : 0
        return {
            userId: student.id,
            totalScores,
            completedScores,
            progress,
            isCompleted: progress >= 100,
        }
    })

    const totalAverageScores = totalScores * students.length
    const averageProgress = totalAverageScores > 0 ? Math.round((completedAvargeScores / totalAverageScores) * 100) : 0

    return {
        id: task.id,
        title: task.name,
        description: task.description,
        deadline: task.deadline,
        isExpired,
        stats: {
            average: {
                progress: averageProgress,
                totalScores: totalAverageScores,
                completedScores: completedAvargeScores,
                isCompleted: averageProgress >= 100,

            },
            students: completedUserScores
        },
        sets: task.sets.map((set) => ({
            ...set,
            completed: set.terms.reduce(((progressSum, term) => {
                const result = task.progresses.find((p) => p.termId === term.id)
                return progressSum + (result?.status || 0)
            }), 0) === set.termsCount * 5 * students.length
        }))
    }

}

export const calcAssignmentOwnStats = (task: Class["tasks"][number], userId: string) => {

    const isExpired = new Date(task.deadline).getTime() < Date.now()
    const ownProgresses = task.progresses.filter(p => p.userId === userId)
    const completedScores = ownProgresses.reduce((sum, progress) => sum + progress.status, 0)
    const totalScores = task.sets.reduce((sum, set) => sum + set.termsCount, 0) * 5
    const progress = totalScores > 0 ? Math.round((completedScores / totalScores) * 100) : 0

    return {
        id: task.id,
        title: task.name,
        description: task.description,
        deadline: task.deadline,
        isExpired,
        stats: {
            totalScores,
            completedScores,
            progress,
            isCompleted: progress >= 100,
        },
        sets: task.sets.map((set) => ({
            ...set,

            completed: set.terms.reduce(((progressSum, term) => {
                const result = ownProgresses.find((p) => p.termId === term.id)
                return progressSum + (result?.status || 0)
            }), 0) === set.termsCount * 5
        }))
    }

}

export const calcClassOwnStats = (classData: StudentClassListItem, userid: string) => {
    const tasks = classData.tasks.map((assignment) => calcAssignmentOwnStats(assignment, userid))
    const completedScores = tasks.reduce((sum, assignment) => sum + assignment.stats.completedScores, 0)
    const totalScores = tasks.reduce((sum, assignment) => sum + assignment.stats.totalScores, 0)
    const activeAssignmentsNumber = tasks.filter((assignment) => !assignment.isExpired && !assignment.stats.isCompleted).length
    const completedAssignmentsNumber = tasks.filter((assignment) => assignment.stats.isCompleted).length
    return {
        ...classData,
        tasks,
        nextAssignment: classData.tasks.find((assignment) => new Date(assignment.deadline).getTime() >= Date.now()),
        completedScores,
        totalScores,
        activeAssignmentsNumber,
        completedAssignmentsNumber,
        progress: totalScores > 0 ? Math.round((completedScores / totalScores) * 100) : 0,
    }
}

export const calcClassStats = (classData: TeacherClassListItem) => {

    const assigments = classData.tasks.map((assignment) => calcAssignmentStats(assignment, classData.students))
    const completedScores = assigments.reduce((sum, assignment) => sum + assignment.stats.average.completedScores, 0)
    const totalScores = assigments.reduce((sum, assignment) => sum + assignment.stats.average.totalScores, 0)
    const activeAssigments = assigments.filter((assignment) => !assignment.isExpired && !assignment.stats.average.isCompleted)
    const activeAssignmentsNumber = activeAssigments.length
    const completedAssignmentsNumber = assigments.filter((assignment) => assignment.stats.average.isCompleted).length
    const dueThisWeekNumber = assigments.filter((assignment) => !assignment.isExpired && isDueThisWeek(assignment.deadline)).length
    const nextAssignment = assigments.find((assignment) => new Date(assignment.deadline).getTime() >= Date.now())
    const nextAssignmentStartedStudents = nextAssignment ? nextAssignment.stats.students.filter((stat) => stat.progress > 0).length : 0
    const progress = totalScores > 0 ? Math.round((completedScores / totalScores) * 100) : 0
    const isActive = activeAssignmentsNumber > 0

    return {
        ...classData,
        assigments,
        nextAssignment,
        completedScores,
        totalScores,
        nextAssignmentStartedStudents,
        activeAssignmentsNumber,
        completedAssignmentsNumber,
        dueThisWeekNumber,
        progress,
        isActive
    }
}