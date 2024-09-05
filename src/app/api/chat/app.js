import fetch, { Headers, Request, Response } from "node-fetch"; // Import Headers, Request, Response
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Polyfill fetch globally
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const generate = async () => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a story about a magic backpack.";

        const result = await model.generateContent(prompt);
        console.log("result:", result.response.text());
    } catch (error) {
        console.error("Error generating content:", error); // Log the error
    }
}

generate();





// import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fetch, { Headers, Request, Response } from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// // Polyfill fetch globally
// global.fetch = fetch;
// global.Headers = Headers;
// global.Request = Request;
// global.Response = Response;

// export async function POST(req) {
    // try {
    //     const { message } = await req.json(); // Get user message from request body
    //     const apiKey = process.env.API_KEY; // Use your API key from the environment variables

    //     if (!message || !apiKey) {
    //         return NextResponse.json({ error: 'Invalid request or missing API key' }, { status: 400 });
    //     }
    //     const genAI = new GoogleGenerativeAI(apiKey);
    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //     const result = await model.generateContent(message);

    //     const responseText = await result.response.text();

    //     console.log("response", responseText)


    //     return NextResponse.json({ response: responseText  || "No response from Gemini API"  });
//     } catch (error) {
//         console.error("Server Error:", error);
//         return NextResponse.json({ error: 'Internal Server Error', details: (error).message }, { status: 500 });
//     }
// }

