import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import FeaturedEvents from "@/components/layout/FeaturedEvents";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedEvents />
      <Footer />
    </>
  );
}
