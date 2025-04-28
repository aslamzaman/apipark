import { NextResponse } from 'next/server';
import axios from "axios";
import * as cheerio from 'cheerio';
import { bollywood, compile } from '@/lib/movie/bollywoodOne';




export const GET = async (request) => {
    try {

        const arr = await compile(2025);

       
        console.log(arr)



        const response = NextResponse.json({
            message: "Data fetched successfully.",
            data: arr
        }, { status: 200 });

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