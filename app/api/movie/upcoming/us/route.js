import { sortArray } from '@/lib/utils';
import { NextResponse } from 'next/server';


export const GET = async (request) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/movie/upcoming/us.json`);
        const jsonData = await res.json();
        const sortData = jsonData.sort((a, b)=>sortArray(a.id, b.id));
        const lastToHunderd = sortData.slice(-100);
     
        const response = NextResponse.json(lastToHunderd);

        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response

    } catch (error) {
        console.log(error);
        const response = NextResponse.json({
            message: "An error occurred while fetching data.",
            data: "",
        }, { status: 500 });
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response
    }
}