
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


// let conversationHistory: any[] = []

export async function POST(req: NextRequest) {
    try {
        
            const { contents, message } = await req.json(); // Get user message from request body
            const apiKey = process.env.API_KEY; // Use your API key from the environment variables

            if (!contents || !apiKey) {
                return NextResponse.json({ error: 'Invalid request or missing API key' }, { status: 400 });
            }
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const chat = await model.startChat({
                history: contents
            })


            // const responseText = await result.response.text();
            let result = await chat.sendMessage(message);
            console.log("response" , result.response.text());


            return NextResponse.json({ response: result.response.text() }, { status: 200 });


    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
    }
}