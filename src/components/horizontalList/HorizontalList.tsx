import ScrolledItems from '@/components/horizontalList/ScrolledItems';
import { DalErrorReturn, DalSuccessReturn } from '@/lib/dal/types';
import { Stack, Typography } from '@mui/material';
import { FC, type JSX } from 'react';

export const revalidate = 0

const HorizontalList: FC<{ promise: Promise<DalSuccessReturn<any[]> | DalErrorReturn>, label: string, icon: JSX.Element }> = async ({ promise, label, icon }) => {

    const res = await promise
    console.log(res)

    return res.success && (res.data.length > 0) && (
        <Stack gap={3}>
            <Stack direction="row" alignItems="center" gap={1}>
                {icon}
                <Typography fontWeight={700} fontSize={17}>
                    {label}
                </Typography>
            </Stack>
            <ScrolledItems sets={res.data} />
        </Stack>
    )
}

export default HorizontalList