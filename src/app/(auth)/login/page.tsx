"use client";

import React, { useState } from "react";
import { signInWithEmail, googleLogin } from "@/actions/auth";
import { FaEnvelope, FaGoogle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await signInWithEmail(formData);
      console.log("res from passwordless Login", res);
      setMessage("Check your email for the login link!");
    } catch (err) {
      setMessage("Login failed. Please try again.");
      console.log("Login failed. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      await googleLogin();
    } catch (err) {
      setMessage("Google login failed. Please try again.");
      console.log("Google login failed.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm">Back to home</span>
        </Link>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Information */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#6366f1_0,transparent_35%),radial-gradient(circle_at_80%_0%,#22d3ee_0,transparent_30%),radial-gradient(circle_at_80%_80%,#a855f7_0,transparent_30%)] opacity-30" />
          <div className="absolute inset-0 bg-[#0F172A]/60" />

          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="max-w-2xl px-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 text-sm text-white backdrop-blur mb-6">
                  <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  AI travel concierge
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Your AI travel companion
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Get personalized recommendations for restaurants, attractions,
                  and hidden gems based on your tastes and location.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                  <h3 className="text-white font-semibold mb-2">
                    Smart Recommendations
                  </h3>
                  <p className="text-white/80 text-sm">
                    AI learns your preferences to suggest the perfect spots.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <h3 className="text-white font-semibold mb-2">
                    Real-time Updates
                  </h3>
                  <p className="text-white/80 text-sm">
                    Live data on hours, ratings, and current trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:flex-none lg:w-[500px] flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back
              </h2>
              <p className="text-white/70">
                Sign in to continue exploring with AI
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-purple-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-white/90 text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-sm" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all"
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending magic link..." : "Send magic link"}
                </button>
              </form>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm text-center ${
                    message.includes("Check your email")
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-white/60">
                      or continue with
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="mt-4 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-white/10 to-purple-500/10 border border-white/20 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/20 hover:border-purple-500/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaGoogle className="text-sm" />
                  Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-white/60">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-purple-400 hover:text-purple-300 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300 hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
