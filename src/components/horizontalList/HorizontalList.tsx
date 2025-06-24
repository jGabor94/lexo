import ScrolledItems from '@/components/horizontalList/ScrolledItems';
import { Stack, Typography } from '@mui/material';
import { FC, type JSX } from 'react';

export const revalidate = 0

const HorizontalList: FC<{ promise: Promise<any[]>, label: string, icon: JSX.Element }> = async ({ promise, label, icon }) => {

    const result = await promise

    return result.length > 0 && (
        <Stack gap={3}>
            <Stack direction="row" alignItems="center" gap={1}>
                {icon}
                <Typography fontWeight={700} fontSize={17}>
                    {label}
                </Typography>
            </Stack>
            <ScrolledItems sets={result} />
        </Stack>
    )
}

export default HorizontalList