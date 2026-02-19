import SectionTitle from "@/components/section-title";
import { motion } from "framer-motion";

export default function AboutOurApps() {
    const sectionData = [
        {
            title: "Personality Matching",
            description: "MBTI insights aligned with your perfect career path.",
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600",
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M7.5 15.5a3.5 3.5 0 0 0 5 0"/><path d="M16.5 8.5a3.5 3.5 0 0 0-5 0"/></svg>
            )
        },
        {
            title: "Real-Time Data",
            description: "Instant access to market trends and salary analytics.",
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            )
        },
        {
            title: "Easy Integration",
            description: "Seamless setup with React, Next.js, and Tailwind CSS.",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M16 9l-5 5-4-4"/></svg>
            )
        },
    ];

    // REPLACE THESE FILENAMES WITH YOUR ACTUAL LOGO PNG FILES
    // Ensure these images are placed in your 'public' folder
    const companyLogos = [
        "/assets/img/kbz.png",
        "/assets/img/wave.png",
        "/assets/img/aya.png",
        "/assets/img/next4.png",
        "/assets/img/ace.png",
        "/assets/img/brillar.png",
    ];

    return (
        <section className="bg-white pt-0 pb-16" id="about"> {/* Reduced Top Padding */}
            <div className="max-w-6xl px-6">
                
                {/* Compact Header */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <SectionTitle 
                        title="About Our App" 
                        description="Combining MBTI insights with real job data to help you find roles where you truly belong."
                        className="text-slate-800" 
                    />
                </div>

                {/* Compact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sectionData.map((data, index) => (
                        <motion.div 
                            key={data.title} 
                            className="p-4 rounded-lg border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${data.iconBg} ${data.iconColor}`}>
                                {data.svg}
                            </div>
                            <h3 className="mt-3 text-base font-semibold text-slate-900">{data.title}</h3>
                            <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{data.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Trusted Companies - Larger Circular Images */}
                <div className="mt-10 pt-6 text-center">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-5">Our Trusted Companies</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-15 transition-all duration-500">
                        {companyLogos.map((logo, idx) => (
                            <div key={idx} className="w-25 h-25 flex items-center justify-center overflow-hidden p-1.5 shadow-sm"> {/* Increased size to w-12 h-12 */}
                                <img 
                                    src={logo} 
                                    alt="Company Logo" 
                                    className="w-full h-full object-contain" 
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}