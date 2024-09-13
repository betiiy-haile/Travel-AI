/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['https://lh3.googleusercontent.com', 'https://maps.googleapis.com', 'maps.googleapis.com'], 
    },
    env: {
        GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
    },
};

export default nextConfig;
