import { NextRequest, NextResponse } from 'next/server';
import { getDataFromFirestoreRedisServer } from '@/lib/firebaseRedisFunctions';



export const GET = async (Request) => {
    try {
        const resultResponse = await getDataFromFirestoreRedisServer("news", "news_api");
     
        const result = resultResponse.map(item => {
            delete item.id;
            delete item.createdAt;
            return item
        })

       // console.log(resultResponse);
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
