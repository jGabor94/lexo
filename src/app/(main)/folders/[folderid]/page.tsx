import FolderResult from "@/features/folder/components/FolderResult";
import { getFolder } from "@/features/folder/dal/queries";
import FolderProvider from "@/features/folder/providers";
import { FC } from "react";

const Page: FC<{ params: Promise<{ folderid: string }> }> = async props => {
    const params = await props.params;

    const res = await getFolder(params.folderid)
    if (!res.success) return <>{res.error.type}</>
    const { data: folder } = res

    return (
        <FolderProvider folder={folder}>
            <FolderResult />
        </FolderProvider>
    );
}

export default Page
