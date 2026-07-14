import StudentClassDashboard from '@/features/teach/components/student/ClassDashboard';
import { getStudentClassOverview } from '@/features/teach/dal/queries';
import { FC } from 'react';

const page: FC<{ params: Promise<{ classid: string }> }> = async ({ params }) => {

    const { classid } = await params;

    const classResult = await getStudentClassOverview(classid)
    if (!classResult.success) return <>Hiba {classResult.error.type}</>

    const { data: studentClassOverview } = classResult

    return <StudentClassDashboard studentClassOverview={studentClassOverview} />

}

export default page
