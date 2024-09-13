'use client'

import React, { useState } from 'react';
import { signInWithEmail, googleLogin } from '@/actions/auth';  // Add your auth actions here

const Page = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); 
 
        const formData = new FormData();
        formData.append('email', email);   

        try {
            const res = await signInWithEmail(formData);
            console.log("res from passwordless Login", res)
            setMessage('Check your email for the login link!');
        } catch (err) {
            setMessage('Login failed. Please try again.');
            console.log('Login failed. Please try again.', err);
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true);
        setMessage('');

        try {
            await googleLogin(); // Call Google login action
        } catch (err) {
            setMessage('Google login failed. Please try again.');
            console.log('Google login failed.', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen ">

            {/* Left Side - Information */}
            <div className="flex-1 bg-gradient relative flex items-center justify-center">

                <div className='absolute top-0 left-0 bg-black opacity-40 w-full h-full' />

                <div className="px-16 py-16 flex flex-col items-start justify-center gap-8 relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                        Discover Your Perfect Experience with A.I.
                    </h1>

                    <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg text-white max-w-lg">
                        <p className="text-lg font-semibold text-white">How It Works:</p>
                        <p className="mt-2 text-gray-200">
                            Our A.I.-powered chatbot provides tailored recommendations for dining, entertainment, and travel, all in real-time.
                        </p>
                        <ol className="list-decimal list-inside mt-4 text-gray-300">
                            <li>Simply ask for a suggestion: Get recommendations based on your location and preferences.</li>
                            <li>Discover hidden gems: Explore restaurants, tourist spots, and entertainment options personalized for you.</li>
                        </ol>
                        <p className="mt-4 text-gray-200">
                            Ready to explore? Let us guide you to the best experiences around!
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 p-12 flex items-center justify-center">
                <div className="p-8 rounded-lg shadow-xl max-w-md w-full">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Login to Your Account</h2>
                    <p className="text-gray-400 text-center mb-8">
                        Empower your experience with personalized AI-powered recommendations!
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-white mb-2" htmlFor="email">Email Address*</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" type="email" id="email" placeholder="your_email@domain.com" required />
                        </div>
                        <button className="w-full button-gradient p-3 rounded-lg shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-transform duration-200" type="submit" disabled={loading}>
                            {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
                        </button>
                    </form>

                    {message && (
                        <p className="text-green-400 mt-6 text-center">
                            {message}
                        </p>
                    )}

                    {/* <p className="text-gray-400 mt-6 text-center">
                        Don{"'"}t have an account? <Link href="/sign-up" className="text-blue-400 hover:underline">Sign Up</Link>
                    </p> */}
                    <p className='text-gray-300 mt-6 text-center'>or</p>

                    <div className="mt-8">
                        <button onClick={handleGoogleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-gradient-to-l hover:scale-105 transition-transform duration-200">
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
