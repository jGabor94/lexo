import Landing from '@/features/teach/components/student/Landing'
import OverviewDashboard from '@/features/teach/components/student/OverviewDashboard'
import { getStudentOverview } from '@/features/teach/dal/queries'
import { FC } from 'react'

const page: FC<{}> = async () => {

    const classesResult = await getStudentOverview()
    if (!classesResult.success) return <>Hiba: {classesResult.error.type}</>
    const { data: studentOverview } = classesResult

    if (studentOverview.classes.length === 0) return <Landing />

    return <OverviewDashboard studentOverview={studentOverview} />
}

export default page
