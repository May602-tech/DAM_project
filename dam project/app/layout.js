import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import LenisScroll from "@/components/lenis-scroll";
import Footer from "@/components/footer";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["500", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "BEUMATCH | Find Your Vibe, Find Your Job",
    description: "Don't just find a job—find your place. BEUMATCH matches your unique personality with companies where you'll truly belong. Take the test and discover careers that align with who you are.",
    keywords: ["Career Match", "MBTI", "Personality Test", "Job Search", "BEUMATCH"],
    authors: [{ name: "BEUMATCH Team" }],
    openGraph: {
        title: "BEUMATCH | Find Your Vibe, Find Your Job",
        description: "Align your career with your personality using our advanced matching system.",
        type: "website",
    },
    icons: {
        // UPDATED: Pointing all icons to the PNG file you confirmed exists.
        // Modern browsers support .png for favicons perfectly.
        icon: "/assets/img/logo.png",
        shortcut: "/assets/img/logo.png",
        apple: "/assets/img/logo.png",
    },
    appleWebApp: {
        title: "BEUMATCH",
        statusBarStyle: "default",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <body className="antialiased text-slate-900 bg-slate-50">
                <LenisScroll />
                <Navbar />
                <main className="w-full">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}