
import { NextResponse } from 'next/server';
import { inwordEnglishInd } from '@/lib/utils';



export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const searchValue = searchParams.get('value');
        const searchCase = searchParams.get('case');
        const lnt = parseInt(searchValue) ? parseInt(searchValue) : 0;
        const caseTxt = searchCase?searchCase:'upper';
        const result = inwordEnglishInd(lnt,caseTxt);

        return NextResponse.json({
            message: "Data fetched successfully.",
            data: result
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An error occurred while fetching data.",
            data: [],
        }, { status: 500 });
    }
}