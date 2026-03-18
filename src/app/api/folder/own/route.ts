import { getOwnFolders } from '@/features/folder/dal/queries';
import { mapDalErrorToHttpStatus } from '@/lib/dal/utils';
import { NextResponse } from 'next/server';

export async function GET() {

    const foldersResult = await getOwnFolders();

    if (foldersResult.success) {
        return NextResponse.json(foldersResult.data, { status: 200 });
    } else {
        const statusCode = mapDalErrorToHttpStatus(foldersResult.error.type);
        return NextResponse.json(foldersResult.error, { status: statusCode });
    }
}