
import { NextResponse } from 'next/server';
import { inwordBangla } from '@/lib/utils';



export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const searchValue = searchParams.get('value');
        const lnt = parseInt(searchValue) ? parseInt(searchValue) : 1234567890123;

        const result = inwordBangla(lnt);

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