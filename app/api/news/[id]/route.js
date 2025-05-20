import { NextRequest, NextResponse } from 'next/server';


import { getSingleDataFromFirestore } from '@/lib/firebaseRedisFunctions';


export const GET = async (Request, { params }) => {
    try {

        const { id } = await params;
        const getSingle = await getSingleDataFromFirestore("news", id);
        let result;
        if (getSingle) {
            delete getSingle.createdAt;
            result = getSingle;
        } else {
            result = getSingle;
        }

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
