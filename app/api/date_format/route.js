
import { NextResponse } from 'next/server';
import { dateFormat } from '@/lib/utils';



export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const searchDate = searchParams.get('date');
        const searchValue = searchParams.get('format');
        const result = dateFormat(searchDate, searchValue);
        
        return NextResponse.json({
            message: "Data fetched successfully.",
            data: result
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An error occurred while fetching data.",
            data: "",
        }, { status: 500 });
    }
}