
import { NextResponse } from 'next/server';


export const GET = async (request) => {
    try {
       
        const response = NextResponse.json({name:"Aslam Zaman"});

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