import { NextRequest, NextResponse } from 'next/server';

import { getSingleDataFromFirestore } from '@/lib/firebaseRedisFunctions';


export const GET = async (Request, { params }) => {
    try {

        const { id } = await params;
        console.log(id)
        const result = await getSingleDataFromFirestore("news", id);
        delete result.createdAt;

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
 