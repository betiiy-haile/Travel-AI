
import Hero from "./_components/hero";
import Navbar from "./_components/Navbar";
import Features from "./_components/Features";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";

export default async function Home() {


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