import { getClass } from '@/features/teach/dal/queries';
import { Typography } from '@mui/material';
import { FC } from 'react';

const page: FC<{ params: Promise<{ classid: string }> }> = async ({ params }) => {

    const { classid } = await params;

    const classResult = await getClass(classid)
    if (!classResult.success) return <>Hiba {classResult.error.type}</>

    const { data: classData } = classResult

    return (
        <Typography variant='h5'>{classData.name}</Typography>
    )
}

export default page