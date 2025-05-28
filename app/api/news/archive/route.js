import { NextRequest, NextResponse } from 'next/server';
import { getSomeDataFromFirestoreRedisServer } from '@/lib/firebaseRedisFunctions';



export const GET = async (Request) => {
    try {

        const searchParams = Request.nextUrl.searchParams;
        const searchData = searchParams.get('date');

        const getResult = await getSomeDataFromFirestoreRedisServer("news", "dt", searchData);
        const result = getResult.map(item => {
            delete item.createdAt;
            return item;
        });

        return NextResponse.json(result, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });

    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({
            message: "An error occurred while fetching data",
            error: error.message
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }
}
