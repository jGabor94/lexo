import { FC, ReactNode } from 'react';
import { SWRConfig, unstable_serialize } from 'swr';
import { Folder } from '../types';

const FolderProvider: FC<{ children: ReactNode, folder: Folder }> = ({ children, folder }) => (
    <SWRConfig value={{ fallback: { [unstable_serialize(['folder', folder.id])]: folder } }}>
        {children}
    </SWRConfig>
);

export default FolderProvider