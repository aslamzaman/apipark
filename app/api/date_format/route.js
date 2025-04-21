
import { NextResponse } from 'next/server';
import { formatedDate } from '@/lib/utils';



export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const searchDate = searchParams.get('date');
        const searchValue = searchParams.get('value');

        if (parseInt(searchValue) < 1 && parseInt(searchValue) > 9) {
            return NextResponse.json({ message: "Keep the value between 1 and 10." }, { status: 400 });
        }

        const result = formatedDate(searchDate, parseInt(searchValue));

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