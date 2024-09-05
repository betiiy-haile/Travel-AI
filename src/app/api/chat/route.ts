
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        
            const { message } = await req.json(); // Get user message from request body
            const apiKey = process.env.API_KEY; // Use your API key from the environment variables

            if (!message || !apiKey) {
                return NextResponse.json({ error: 'Invalid request or missing API key' }, { status: 400 });
            }
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(message);

            const responseText = await result.response.text();

            console.log("response", responseText)



            return NextResponse.json({ response: responseText }, { status: 200 });


    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
    }
}