import { getSet } from '@/features/set/dal/queries';
import { mapDalErrorToHttpStatus } from '@/lib/dal/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ setid?: string }> }) {
    const { setid } = await params;

    if (!setid || typeof setid !== 'string') {
        return NextResponse.json(
            { type: "validation-error", error: "Missing setid" },
            { status: 400 }
        );
    }

    const setResult = await getSet(setid);

    if (setResult.success) {
        return NextResponse.json(setResult.data, { status: 200 });
    } else {
        const statusCode = mapDalErrorToHttpStatus(setResult.error.type);
        return NextResponse.json(setResult.error, { status: statusCode });
    }
}