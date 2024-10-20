import {Header, Footer} from "@/components";
import { Features, HeroSection, Testimonials, Plans, CallToAction } from "./components";

export default function Home() {

  const links = [
    { to: "#features", label: "Beneficios" },
    { to: "#reviews", label: "Testimonios" },
    { to: "#plans", label: "Planes de suscripción" },
  ];

  return(
    <>
      <Header links={links}/>

      <main className="space-y-20 mb-20">
        <HeroSection/>
        <Features/>
        <Testimonials/>
        <Plans/>
        <CallToAction/>
      </main>

      <Footer/>
    </>
  )
}
