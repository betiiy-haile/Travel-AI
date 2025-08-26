import { NextRequest, NextResponse } from "next/server";
import * as genAI from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { contents, message, lat, lng } = await req.json();
    const apiKey = process.env.API_KEY;

    if (!contents || !apiKey || lat == null || lng == null) {
      return NextResponse.json(
        { error: "Invalid request, missing API key or user location" },
        { status: 400 }
      );
    }

    // Configure LLM
    const client = new genAI.GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
You are an expert on recreational places in Ethiopia, including parks, playgrounds, restaurants, game zones, and movie theaters.
When answering user queries, consider the user's location (latitude: ${lat}, longitude: ${lng}) to provide nearby recommendations.
Do not call any external API; rely on your knowledge of Ethiopian locations and the user's coordinates.
Always provide name, approximate location (if possible), and useful tips.
`,
    });

    const chat = await model.startChat({ history: contents });

    // Send user message to the model
    const result = await chat.sendMessage(message);

    // Get a short conversation title
    // const titleResult = await chat.sendMessage(
    //   "Summarize this conversation in a short title (max 6 words)."
    // );

    return NextResponse.json(
      {
        response: result.response.text(),
        // title: titleResult.response.text(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import * as genAI from "@google/generative-ai";

// type Place = {
//   id: string;
//   name: string;
//   address?: string;
//   location: { lat: number; lng: number };
//   kinds?: string[];
//   distanceMeters?: number;
// };

// // Calculate distance in meters
// function getDistanceMeters(
//   lat1: number,
//   lng1: number,
//   lat2: number,
//   lng2: number
// ) {
//   const R = 6371000;
//   const toRad = (deg: number) => (deg * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const {
//       contents,
//       message,
//       lat,
//       lng,
//       radius = 2000,
//       category,
//     } = await req.json();
//     const apiKey = process.env.API_KEY;

//     if (!contents || !apiKey || lat == null || lng == null) {
//       return NextResponse.json(
//         { error: "Missing API key, user location, or contents" },
//         { status: 400 }
//       );
//     }

//     // Build Overpass query based on category
//     const tagFilters: Record<string, string> = {
//       park: '["leisure"="park"]',
//       playground: '["leisure"="playground"]',
//       restaurant: '["amenity"="restaurant"]',
//       cafe: '["amenity"="cafe"]',
//       beach: '["natural"="beach"]',
//     };
//     const tag = category && tagFilters[category] ? tagFilters[category] : "";

//     const query = `
// [out:json][timeout:25];
// (
//   node${tag}(around:${radius},${lat},${lng});
//   way${tag}(around:${radius},${lat},${lng});
//   relation${tag}(around:${radius},${lat},${lng});
// );
// out center;
// `;

//     const overpassRes = await fetch("https://overpass-api.de/api/interpreter", {
//       method: "POST",
//       headers: { "Content-Type": "text/plain" },
//       body: query,
//     });

//     const data = await overpassRes.json();
//     const elements = data.elements || [];

//     // Normalize data and calculate distance
//     const places: Place[] = elements.map((el: any) => {
//       const loc =
//         el.type === "node"
//           ? { lat: el.lat, lng: el.lon }
//           : el.center
//           ? { lat: el.center.lat, lng: el.center.lon }
//           : { lat, lng };

//       return {
//         id: `${el.type}/${el.id}`,
//         name: el.tags?.name || `Place ${el.id}`,
//         address: el.tags?.["addr:full"] || el.tags?.["addr:street"],
//         location: loc,
//         kinds: [el.tags?.leisure, el.tags?.tourism].filter(Boolean) as string[],
//         distanceMeters: getDistanceMeters(lat, lng, loc.lat, loc.lng),
//       };
//     });

//     // Sort by distance
//     places.sort((a, b) => (a.distanceMeters ?? 0) - (b.distanceMeters ?? 0));

//     // Initialize LLM
//     const client = new genAI.GoogleGenerativeAI(apiKey);
//     const model = client.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       systemInstruction: `
// You are an expert on recreational places in Ethiopia.
// Given a user query and a list of nearby places with distance, suggest the most suitable places sorted by distance.
// Include name, address (if available), and distance in meters.
// Always prioritize closer places first.
// `,
//     });

//     const chat = await model.startChat({ history: contents });

//     const placesSummary = places
//       .map(
//         (p, i) =>
//           `${i + 1}. ${p.name} - ${p.address || "No address"} (${Math.round(
//             p.distanceMeters ?? 0
//           )} m)`
//       )
//       .join("\n");

//     const result = await chat.sendMessage(
//       `User message: "${message}"\nNearby places:\n${placesSummary}`
//     );

//     const titleResult = await chat.sendMessage(
//       "Summarize this conversation in a short title (max 6 words)."
//     );

//     return NextResponse.json({
//       response: result.response.text(),
//       title: titleResult.response.text(),
//       nearbyPlaces: places,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: err },
//       { status: 500 }
//     );
//   }
// }
