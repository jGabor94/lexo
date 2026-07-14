import Landing from '@/features/teach/components/teacher/Landing'
import OverviewDashboard from '@/features/teach/components/teacher/OverviewDashboard'
import { getTeacherOverview } from '@/features/teach/dal/queries'
import { FC } from 'react'

const page: FC<{}> = async () => {

    const classesResult = await getTeacherOverview()
    if (!classesResult.success) return <>Hiba: {classesResult.error.type}</>
    const { data: teacherOverview } = classesResult

    if (teacherOverview.classes.length === 0) return <Landing />

    return <OverviewDashboard teacherOverview={teacherOverview} />
}

export default page