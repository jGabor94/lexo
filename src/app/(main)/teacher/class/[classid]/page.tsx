import { auth } from '@/features/authentication/lib/auth';
import { getOwnSets } from '@/features/set/dal/queries';
import StudentClassDashboard from '@/features/teach/components/student/ClassDashboard';
import ClassDashboard from '@/features/teach/components/teacher/ClassDashboard';
import { getStudentClassOverview } from '@/features/teach/dal/queries';
import { FC } from 'react';

const page: FC<{ params: Promise<{ classid: string }> }> = async ({ params }) => {

    const { classid } = await params;

    const classResult = await getStudentClassOverview(classid)
    if (!classResult.success) return <>Hiba {classResult.error.type}</>

    const { data: classData } = classResult
    const session = await auth()
    const isTeacher = classData.teachers.some((teacher) => teacher.id === session?.user.id)

    if (!isTeacher) return <StudentClassDashboard classData={classData} />

    const ownSetsResult = await getOwnSets()
    if (!ownSetsResult.success) return <>Hiba {ownSetsResult.error.type}</>
    const { data: ownSets } = ownSetsResult

    return <ClassDashboard classData={classData} ownSets={ownSets} />
}

export default page
