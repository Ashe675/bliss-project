import {Header, Footer} from "@/components";
import { Features, HeroSection, Testimonials, Articles } from "./components";

export default function Home() {

  const links = [
    { to: "/#features", label: "Features" },
    { to: "/#solution", label: "Solution" },
    { to: "/#reviews", label: "Reviews" },
  ];

  return(
    <>
      <Header links={links}/>

      <main className="space-y-40 mb-40">
        <HeroSection/>
        <Features/>
        {/* <Stats/> */}
        <Testimonials/>
        {/* <CallToAction/> */}
        <Articles/>
      </main>

      <Footer/>
    </>
  )
}
