import { getDataFromFirebase } from '@/lib/firebaseFunction';
import { NextResponse } from 'next/server';


export const GET = async (request) => {
    try {
        const data = await getDataFromFirebase("news");
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push({
                title: data[i].title,
                detail: data[i].detail,
                poster: data[i].poster,
                url: data[i].url,
                dt: data[i].dt,
                cat: data[i].cat,
                ref: data[i].ref
            });
        }

        const response = NextResponse.json(result);
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response
    } catch (error) {
        console.log(error);
        const response = NextResponse.json({
            message: "An error occurred while fetching data.",
            data: "",
        }, { status: 500 });
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
        return response
    }
}
