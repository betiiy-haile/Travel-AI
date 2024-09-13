

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get('placeId');

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    console.log("api key", apiKey)
 
    if (!placeId || !apiKey) {
        console.log('Place ID and API key are required');
        return NextResponse.json({ error: 'Place ID and API key are required' }, { status: 400 });
    }

    try { 
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch place details');
        }

        const data = await response.json();
        console.log("data from teh place details", data)
 

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching place details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
