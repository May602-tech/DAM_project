'use client';



import HeroSection from "@/sections/hero-section";
import JobCards from "@/sections/job-cards";
import MBTITypes from "@/sections/mbti-types";  
import AboutOurApp from "@/sections/about-our-app";

export default function Page() {
    return (
        <main className="px-6 md:px-16 lg:px-24 xl:px-32">
            <HeroSection />
            <JobCards />
            <MBTITypes />
            <AboutOurApp />
        </main>
    );
}