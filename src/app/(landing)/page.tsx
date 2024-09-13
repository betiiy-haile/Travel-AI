'use client'

import Hero from "./_components/hero";
import Navbar from "./_components/Navbar";
import Features from "./_components/Features";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";

import { useRouter } from "next/navigation"
import { useEffect } from "react"; 
import { createClient } from "@/utils/supabase/client";

export default function Home() {

  const router = useRouter();
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // If the user is authenticated, redirect to /chat
        console.log("authenticated user ", user)
        router.push("/chat");
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}