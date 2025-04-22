
import { NextResponse } from 'next/server';
import { createRandomArray } from '@/lib/utils';



export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const searchLimit = searchParams.get('limit');
        const searchRandom = searchParams.get('random');

        const data = new Array(100).fill(undefined).map((_, i) => ({
            id: i + 1,
            url: `${process.env.NEXT_PUBLIC_HOST_NAME}/images/fish/image_${i + 1}.jpg`
        }));


        const rnd = searchRandom === "true" ? true : false;
        const lmt = parseInt(searchLimit) ? parseInt(searchLimit) : 10;

        const result = createRandomArray(data, lmt, rnd);

        if (parseInt(searchLimit) > 10) {
            return NextResponse.json({
                message: "You can take a maximum of 10 data out of 100 data at the same time.",
                data: result
            }, { status: 206 });
        }


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