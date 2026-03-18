import { getSpeakIssueToken } from '@/features/term/dal/queries';
import { mapDalErrorToHttpStatus } from '@/lib/dal/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const res = await getSpeakIssueToken();

    if (res.success) {
        return NextResponse.json(res.data, { status: 200 });
    } else {
        const statusCode = mapDalErrorToHttpStatus(res.error.type);
        return NextResponse.json(res.error, { status: statusCode });
    }
}