import { NextResponse } from 'next/server';
import { findPlaces } from '@/lib/places';

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get('location');
    const placeType = searchParams.get('placeType');
    const radius = searchParams.get('radius');

    console.log("request from the chatbot", { location, placeType, radius });

    if (!location || !placeType) {
        return NextResponse.json({ error: 'Location and place type are required' }, { status: 400 });
    }

    const results = await findPlaces(location, placeType, radius ? Number(radius) : 1500);
    console.log("results in teh places api", results)
    return NextResponse.json(results);
} 