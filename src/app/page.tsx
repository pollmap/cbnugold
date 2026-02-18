import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Achievements } from "@/components/sections/Achievements";
import { History } from "@/components/sections/History";
import { Mentoring } from "@/components/sections/Mentoring";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Achievements />
      <History />
      <Mentoring />
      <JoinCTA />
    </>
  );
}
