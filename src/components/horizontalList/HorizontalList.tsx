import ScrolledItems from '@/components/horizontalList/ScrolledItems';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import TextLine from '../ui/TextLine';

const HorizontalList: FC<{ promise: Promise<any[]>, label: string, icon: JSX.Element }> = async ({ promise, label, icon }) => {

    const result = await promise

    return result.length > 0 && (
        <Stack gap={3}>
            <TextLine>
                <Stack direction="row" gap={1}>
                    {icon}
                    <Typography>
                        {label}
                    </Typography>
                </Stack>
            </TextLine>
            <ScrolledItems sets={result} />
        </Stack>
    )
}

export default HorizontalList