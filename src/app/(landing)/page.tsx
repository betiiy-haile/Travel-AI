"use client";

import Hero from "./_components/hero";
import Features from "./_components/Features";
import CTA from "./_components/CTA";

// import { createClient } from "@/utils/supabase/client";

export default function Home() {
  // const supabase = createClient()

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();

  //     if (user) {
  //       // If the user is authenticated, redirect to /chat
  //       console.log("authenticated user ", user)
  //       router.push("/chat");
  //     }
  //   };

  //   checkUser();
  // }, [router, supabase.auth]);

  return (
    <main>
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <div className="w-full md:w-4/5 lg:w-3/4 mx-auto px-4 md:px-0 py-10 md:py-16">
          <h3 className="text-base md:text-xl tracking-wider uppercase text-white/70 text-center mb-2">
            How it works
          </h3>
          <h4 className="text-xl md:text-3xl font-bold text-white text-center">
            Plan in three quick steps
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                step: "1",
                title: "Share your plan",
                text: "Tell us time, budget, cravings or vibe. The more context, the better.",
              },
              {
                step: "2",
                title: "We suggest",
                text: "AI blends live places data to surface top options around you.",
              },
              {
                step: "3",
                title: "Pick & go",
                text: "Open maps, save favorites, and refine results as you explore.",
              },
            ].map(({ step, title, text }) => (
              <div
                key={step}
                className="rounded-xl p-5 bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white text-sm font-semibold">
                    {step}
                  </span>
                  <div className="text-white text-base md:text-lg font-semibold">
                    {title}
                  </div>
                </div>
                <p className="text-white/80 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
