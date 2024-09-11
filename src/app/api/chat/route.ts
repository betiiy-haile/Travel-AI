// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: NextRequest) {
//     try {
//         const { contents, message } = await req.json();
//         const apiKey = process.env.API_KEY;

//         if (!contents || !apiKey) {
//             return NextResponse.json({ error: 'Invalid request or missing API key' }, { status: 400 });
//         }

//         const genAI = new GoogleGenerativeAI(apiKey);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         const chat = await model.startChat({
//             history: contents
//         });

//         let result = await chat.sendMessage(message);

//         const titleMessage = "Summarize this conversation in a short, meaningful title. a short phrase that i can directly use as a converstation name. not more than 6 words";
//         let titleResult = await chat.sendMessage(titleMessage);

//         return NextResponse.json({
//             response: result.response.text(),
//             title: titleResult.response.text()  
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const { contents, message } = await req.json();
        const apiKey = process.env.API_KEY;

        if (!contents || !apiKey) {
            return NextResponse.json({ error: 'Invalid request or missing API key' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are an expert on recreational places in Ethiopia, including restaurants, game zones, parks, and movie theaters. Provide detailed and accurate information about these locations based on user queries." });

        // Send the user's first message and system message in the same request
        const chat = await model.startChat({
                    history: contents
                });

        // Send the user's message again within the context of the conversation
        let result = await chat.sendMessage(message);

        // Generate a title for the conversation
        const titleMessage = "Summarize this conversation in a short, meaningful title. A short phrase that can be used as a conversation name, not more than 6 words.";
        let titleResult = await chat.sendMessage(titleMessage);

        return NextResponse.json({
            response: result.response.text(),
            title: titleResult.response.text()
        }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
    }
}

