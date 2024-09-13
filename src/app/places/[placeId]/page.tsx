'use client';
import { useEffect, useState } from 'react';
import {  useParams } from 'next/navigation';
import Image from 'next/image';

interface PlaceDetails {
    name: string;
    business_status: string;
    rating: number;
    user_ratings_total: number;
    vicinity: string;
    opening_hours: {
        weekday_text: string[];
    };
    photos: { photo_reference: string }[];
    formatted_address: string;
    international_phone_number: string;
    website?: string;
}

const PlaceDetailsPage = () => {
    const { placeId } = useParams();

    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!placeId) return;

        const fetchDetails = async () => {
            try {
                const response = await fetch(`/api/placeDetails?placeId=${placeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch place details');
                }

                const results = await response.json();
                console.log("response", results.result)
                if(results) {
                    setPlaceDetails(results.result);
                }


            } catch (err) {
                console.log('Error fetching place details:', err);
                setError('Failed to load place details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [placeId]);

    if (loading) return <p className="text-center text-white p-12">Loading...</p>;
    if (error) return <p className="text-center text-red-500 p-12">{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
            {placeDetails && (
                <div className="text-whitee rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{placeDetails.name}</h1>

                    {/* Photos */}
                    {placeDetails.photos && placeDetails.photos.length > 0 && (
                        <div className="mb-4">
                            <Image
                                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                                alt={placeDetails.name}
                                width={600}
                                height={400}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {/* Address */}
                    <p className="text-gray-600 mb-2">{placeDetails.formatted_address}</p>

                    {/* Phone Number */}
                    {placeDetails.international_phone_number && (
                        <p className="text-gray-600 mb-2">
                            Phone: {placeDetails.international_phone_number}
                        </p>
                    )}

                    {/* Website */}
                    {placeDetails.website && (
                        <a
                            href={placeDetails.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline mb-4 block"
                        >
                            Visit Website
                        </a>
                    )}

                    {/* Opening Hours */}
                    {placeDetails.opening_hours && placeDetails.opening_hours.weekday_text && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Opening Hours:</h3>
                            <ul className="list-disc list-inside">
                                {placeDetails.opening_hours.weekday_text.map((hours: string) => (
                                    <li key={hours} className="text-gray-600">{hours}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                        <p className="text-yellow-500 font-bold">{placeDetails.rating} ⭐</p>
                        <p className="text-gray-600">({placeDetails.user_ratings_total} reviews)</p>
                    </div>

                    {/* Business Status */}
                    <p className={`text-lg font-bold ${placeDetails.business_status === 'OPERATIONAL' ? 'text-green-600' : 'text-red-600'}`}>
                        {placeDetails.business_status === 'OPERATIONAL' ? 'Open Now' : 'Closed'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PlaceDetailsPage;
