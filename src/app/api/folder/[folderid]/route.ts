import { getFolder } from '@/features/folder/dal/queries';
import { mapDalErrorToHttpStatus } from '@/lib/dal/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ folderid?: string }> }) {
    const { folderid } = await params;

    if (!folderid || typeof folderid !== 'string') {
        return NextResponse.json(
            { type: "validation-error", error: "Missing setid" },
            { status: 400 }
        );
    }

    const folderResult = await getFolder(folderid);

    if (folderResult.success) {
        return NextResponse.json(folderResult.data, { status: 200 });
    } else {
        const statusCode = mapDalErrorToHttpStatus(folderResult.error.type);
        return NextResponse.json(folderResult.error, { status: statusCode });
    }
}