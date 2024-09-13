// const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

// export const findPlaces = async (location, placeType, radius = 1500) => {
//     const url = new URL(BASE_URL);
//     url.searchParams.append('location', location);
//     url.searchParams.append('radius', radius);
//     url.searchParams.append('type', placeType);
//     url.searchParams.append('key', API_KEY);

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching places:', error);
//         return null;
//     }
// };

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';


export const findPlaces = async (location, placeType, radius = 1500) => {
    const url = new URL(BASE_URL);
    url.searchParams.append('location', location); // The user's location
    url.searchParams.append('radius', radius); // Search radius in meters
    url.searchParams.append('type', placeType); // Type of place (e.g., 'restaurant')
    url.searchParams.append('key', API_KEY); // Your Google Maps API key

    // Request specific fields, including photos, opening_hours, and more details
    // url.searchParams.append('fields', 'name,place_id,geometry,icon,photos,opening_hours,vicinity');
    console.log("i am here")

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("response from the getplaces", data)
        return data.results; // Return the list of places
    } catch (error) {
        console.error('Error fetching places:', error);
        return null;
    }
};

export const getPlaceDetails = async (placeId) => {
    const url = new URL(DETAILS_URL);
    url.searchParams.append('place_id', placeId);
    url.searchParams.append('key', API_KEY);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch place details');
        }
        const data = await response.json();

        console.log("response from the getplaces details", data.results)
        return data.results; // Detailed place information
    } catch (error) {
        console.error('Error fetching place details:', error);
        return null;
    }
};
 