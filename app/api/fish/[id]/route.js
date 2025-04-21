
import { NextResponse } from 'next/server';


export const GET = async (request, { params }) => {
    try {
        const { id } = await params;
        console.log(id);

        const data = new Array(100).fill(undefined).map((_, i) => ({
            id: i + 1,
            url: `${process.env.NEXT_PUBLIC_HOST_NAME}/images/fish/image_${i + 1}.jpg`
        }));

        if (!id || id === "0" || parseInt(id) > 100) {
            return NextResponse.json({ message: "Missing document ID." }, { status: 400 });
        }

        const result = data.find(item => item.id === parseInt(id));

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