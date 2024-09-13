
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoSend } from 'react-icons/io5';

interface Place {
    business_status: string;
    geometry: any;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: any;
    photos: any[];
    place_id: string;
    rating?: number;
    reference: string;
    types: string[];
    user_ratings_total?: number;
    vicinity: string;
}

const page = () => {
    const [input, setInput] = useState('');
    const [places, setPlaces] = useState<Place[]>([]);
    const [location, setLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const router = useRouter()

    // const defaultLocation = '9.03,38.74';
    const defaultLocation = '10.03,48.74';


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    setLocation(`${latitude},${longitude}`);
                },
                (err) => {
                    setError("Unable to retrieve location. Using default location: Addis Ababa.");
                    setLocation(defaultLocation); 
                    console.error("Geolocation error:", err);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser. Using default location: Addis Ababa.");
            setLocation(defaultLocation); 
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const placeType = input; 

        const response = await fetch(`/api/places?location=${location || defaultLocation}&placeType=${placeType}`, {
            method: 'GET',
        });
        const results = await response.json();
        console.log("response", results)

        if (results) {
            setPlaces(results);
        }
    };

    return (


        <section className='flex gap-4 min-h-screen flex-col items-center justify-center p-12'>
            <h1 className='text-3xl md:text-4xl text-gradient text-center font-bold'>Nearby Places</h1>
            <p className='text-slate-300 font-light text-base text-center'>
                Search for different types of places, such as restaurants, parks, and more, right here.
            </p>

            {/* Show error if location cannot be accessed */}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="flex mt-4 w-full md:w-[60%] xl:w-[40%] items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter place type (e.g., restaurant)"
                    className="flex-1 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-300"
                />
                <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg ml-3 hover:from-blue-600 hover:to-purple-600 transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                    <IoSend size={20} />
                </button>
            </form>

            <ul className='w-[80%] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-12 mx-auto mt-8 mb-16'>
                {places.map((place) => (
                    <li key={place.place_id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
                        <img
                            src={place.photos && place.photos.length > 0 ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}` : place.icon}
                            alt={place.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h2 className="text-xl font-semibold text-white">{place.name}</h2>
                        <p className="text-gray-400 text-sm">{place.vicinity}</p>
                        <p className="text-gray-300">{place.business_status === 'OPERATIONAL' ? 'Open Now' : 'Closed'}</p>
                        {place.rating && (
                            <p className="text-yellow-500 font-bold">Rating: {place.rating} ⭐ ({place.user_ratings_total} reviews)</p>
                        )}
                        <button onClick={() => router.push(`/places/${place.place_id}`)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
                            View Details
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default page;

