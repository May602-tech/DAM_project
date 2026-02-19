import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, MapPin, Clock, Briefcase, ChevronDown, ArrowRight, X, DollarSign, CheckCircle, Users } from "lucide-react";

export default function OurTestimonials() {
    const jobs = [
        {
            company: "MyJobs Recruitment",
            location: "Hlegu, Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            posted: "2 days ago",
            description: "Manage hatchery operations, staff coordination, and quality control for daily production. Oversee the entire lifecycle from broodstock to harvest, ensuring optimal health and growth rates of the stock. You will also maintain detailed logs, ensure safety compliance, and report directly to senior operations management regarding production metrics and yield analysis.",
        },
        {
            description: "Design and maintain interfaces with strong attention to usability and consistency. You will work closely with product managers and engineers to create seamless user journeys. Responsibilities include creating design systems, prototyping interactions, conducting usability testing, and iterating on feedback to deliver pixel-perfect visual assets for mobile and web platforms.",
            company: "PixelCraft Studio",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            posted: "5 days ago",
        },
        {
            description: "Build responsive frontend features and optimize performance across web applications. We are looking for a React expert to lead our frontend migration. You will be responsible for translating design mocks into clean code, implementing state management solutions, participating in code reviews, and ensuring accessibility standards are met across all browser environments.",
            company: "TechWave Co., Ltd",
            location: "Remote",
            logo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            posted: "1 week ago",
        },
        {
            description: "Create intuitive product experiences through research-driven UI and visual systems. Conduct user testing sessions and iterate based on feedback. The role involves deep analysis of user behavior data, creating comprehensive wireframes, high-fidelity mockups, and collaborating with cross-functional teams to define product roadmaps and feature specifications.",
            company: "FutureWorks",
            location: "Bahan, Yangon",
            logo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            posted: "3 days ago",
        },
        {
            description: "Develop and maintain scalable backend services and system integrations. Experience with Node.js and cloud architecture is a must. You will design RESTful APIs, manage database schemas, optimize query performance, and implement security protocols to protect sensitive data in a high-transaction environment.",
            company: "NextGen Solutions",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
            posted: "4 days ago",
        },
        {
            description: "Work across frontend and backend to deliver complete, high-quality web solutions. We value versatility and a strong grasp of the full web stack. Your duties will involve full lifecycle development, from initial architecture design to deployment and monitoring, requiring proficiency in both modern JavaScript frameworks and server-side logic.",
            company: "InnovateX",
            location: "Hybrid",
            logo: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
            posted: "6 days ago",
        },
        // ... (Expanded Data below)
        {
            description: "Lead hatchery operations and manage staff schedules while ensuring production runs smoothly. This role requires a hands-on approach to team leadership, strict adherence to biosecurity protocols, and the ability to troubleshoot mechanical issues with filtration and aeration systems in real-time to minimize downtime.",
            company: "MyJobs Recruitment",
            location: "Hlegu, Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            posted: "2 days ago",
        },
        {
            description: "Create and refine user-friendly interfaces, ensuring design consistency across digital platforms. You will be the guardian of our brand's visual identity, updating our component library, and ensuring that all touchpoints—from marketing sites to the core app—provide a cohesive and delightful experience for users.",
            company: "PixelCraft Studio",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            posted: "5 days ago",
        },
        {
            description: "Implement responsive front-end code, enhancing performance and interactivity on web projects. We are looking for someone who writes clean, modular code and is passionate about the latest web technologies. You will collaborate with designers to bridge the gap between graphical design and technical implementation.",
            company: "TechWave Co., Ltd",
            location: "Remote",
            logo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            posted: "1 week ago",
        },
        {
            description: "Design intuitive product flows and visually appealing UI systems guided by user research. This position requires a strong empathy for the end-user and the ability to synthesize complex requirements into simple, elegant solutions that solve real business problems while driving user engagement.",
            company: "FutureWorks",
            location: "Bahan, Yangon",
            logo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            posted: "3 days ago",
        },
        {
            description: "Develop backend services that scale efficiently while integrating smoothly with other systems. You will work in an agile environment, participating in daily stand-ups and sprint planning. The focus is on building robust microservices that handle high concurrency and can be easily maintained by other engineers.",
            company: "NextGen Solutions",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
            posted: "4 days ago",
        },
        {
            description: "Work on full-stack web projects, ensuring both frontend and backend meet high-quality standards. You will have ownership over key features, from database design to the CSS animations. This is a great opportunity to impact the product significantly and grow your skills across the entire development stack.",
            company: "InnovateX",
            location: "Hybrid",
            logo: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
            posted: "6 days ago",
        },
        {
            description: "Manage hatchery operations, staff coordination, and quality control for daily production. You will also be responsible for inventory management of feed and chemicals, training new staff on standard operating procedures, and maintaining a culture of safety and continuous improvement within the facility.",
            company: "MyJobs Recruitment",
            location: "Hlegu, Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            posted: "2 days ago",
        },
        {
            description: "Design and maintain interfaces with strong attention to usability and consistency. We utilize a data-driven approach to design, so you will frequently analyze user behavior heatmaps and A/B test results to inform your design decisions and optimize conversion paths on our platform.",
            company: "PixelCraft Studio",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            posted: "5 days ago",
        },
        {
            description: "Build responsive frontend features and optimize performance across web applications. Key goals include reducing load times, improving Core Web Vitals scores, and ensuring a buttery smooth 60fps experience for animations and complex data visualizations within our dashboard.",
            company: "TechWave Co., Ltd",
            location: "Remote",
            logo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            posted: "1 week ago",
        },
        {
            description: "Create intuitive product experiences through research-driven UI and visual systems. You will act as the user advocate within the company, ensuring that business requirements never compromise the usability of the product. Strong communication skills are essential for presenting your work.",
            company: "FutureWorks",
            location: "Bahan, Yangon",
            logo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            posted: "3 days ago",
        },
        {
            description: "Develop and maintain scalable backend services and system integrations. You will be tasked with automating deployment pipelines and monitoring system health. We rely on a microservices architecture, so experience with Docker and Kubernetes is highly beneficial for this role.",
            company: "NextGen Solutions",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
            posted: "4 days ago",
        },
        {
            description: "Work across frontend and backend to deliver complete, high-quality web solutions. We are a small but growing team, so flexibility is key. You might be fixing a CSS bug one moment and optimizing a SQL query the next. If you love variety and wearing many hats, this is the place for you.",
            company: "InnovateX",
            location: "Hybrid",
            logo: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
            posted: "6 days ago",
        },
         {
            description: "Oversee hatchery operations, coordinate staff, and ensure daily production quality standards are met. This role involves strategic planning for production cycles, managing water quality parameters, and coordinating with the logistics team for timely harvest and distribution of products to market.",
            company: "MyJobs Recruitment",
            location: "Hlegu, Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            posted: "2 days ago",
        },
        {
            description: "Design user interfaces and maintain consistency across platforms, with strong usability focus. You will contribute to the evolution of our design language, creating reusable components that speed up development for the entire engineering team while maintaining a cohesive look and feel.",
            company: "PixelCraft Studio",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            posted: "5 days ago",
        },
        {
            description: "Develop responsive front-end features while optimizing performance for web applications. Attention to detail is critical, as is the ability to debug issues across different devices and browsers. You will work closely with QA teams to resolve any visual or functional discrepancies before release.",
            company: "TechWave Co., Ltd",
            location: "Remote",
            logo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            posted: "1 week ago",
        },
        {
            description: "Craft engaging product experiences through research-driven UI design and visual system implementation. We value a 'mobile-first' mindset, so you must be adept at designing for small screens before scaling up to desktop, ensuring the core value of the product is accessible to users on any device.",
            company: "FutureWorks",
            location: "Bahan, Yangon",
            logo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            posted: "3 days ago",
        },
        {
            description: "Maintain and develop scalable backend services, ensuring seamless integration with systems. Security is paramount, so you will be expected to implement OWASP best practices, conduct regular security audits, and stay updated on the latest vulnerabilities and patches for our tech stack.",
            company: "NextGen Solutions",
            location: "Yangon, Myanmar",
            logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
            posted: "4 days ago",
        },
        {
            description: "Collaborate on full-stack projects to deliver high-quality, end-to-end web solutions. You will mentor junior developers, conduct code reviews, and help define technical standards. Our tech stack is modern, so a willingness to learn new tools and frameworks quickly is essential.",
            company: "InnovateX",
            location: "Hybrid",
            logo: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
            posted: "6 days ago",
        },
    ];

    // --- FILTER STATE ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("All Locations");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [currentPage, setCurrentPage] = useState(1);
    
    // --- MODAL STATE ---
    const [selectedJob, setSelectedJob] = useState(null);

    // --- DERIVE DATA FOR FILTERS ---
    const uniqueLocations = useMemo(() => {
        const locs = new Set(jobs.map(job => job.location));
        return ["All Locations", ...Array.from(locs)];
    }, [jobs]);

    const categories = ["All Categories", "Design", "Engineering", "Management", "Operations"];

    // --- HELPER: INFER TITLE, CATEGORY, AND PERSONALITY ---
    const getJobMeta = (desc) => {
        const d = desc.toLowerCase();
        let title = "Open Position";
        let category = "General";
        let salary = "$40k - $60k";
        
        // Personality Logic
        let personality = "Balanced";
        let personalityDesc = "Suitable for both introverts and extroverts.";

        if (d.includes("hatchery") || d.includes("production") || d.includes("staff")) {
            title = "Operations Manager";
            category = "Operations";
            salary = "$35k - $50k";
            personality = "Extrovert Advantage";
            personalityDesc = "Requires constant team coordination and on-site leadership.";
        } else if (d.includes("design") || d.includes("ui") || d.includes("interface")) {
            title = "UI/UX Designer";
            category = "Design";
            salary = "$50k - $80k";
            personality = "Introvert Advantage";
            personalityDesc = "Deep focus work with minimal interruptions. Ideal for independent creators.";
        } else if (d.includes("frontend") || d.includes("backend") || d.includes("web") || d.includes("code")) {
            title = "Software Developer";
            category = "Engineering";
            salary = "$60k - $90k";
            personality = "Ambivert";
            personalityDesc = "Mix of solo coding sprints and collaborative technical discussions.";
        } else if (d.includes("manage") || d.includes("lead")) {
            title = "Team Lead";
            category = "Management";
            salary = "$70k - $100k";
            personality = "Extrovert Advantage";
            personalityDesc = "Heavy focus on mentoring, meetings, and stakeholder management.";
        }

        return { title, category, salary, personality, personalityDesc };
    };

    // --- FILTER LOGIC ---
    const filteredJobs = jobs.filter((job) => {
        const term = searchTerm.toLowerCase();
        const meta = getJobMeta(job.description);
        
        const matchesSearch = 
            job.company.toLowerCase().includes(term) || 
            job.description.toLowerCase().includes(term) ||
            meta.title.toLowerCase().includes(term);

        const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
        const matchesCategory = selectedCategory === "All Categories" || meta.category === selectedCategory;

        return matchesSearch && matchesLocation && matchesCategory;
    });

    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    // --- SIMULATED DETAILED DATA FOR MODAL ---
    const getJobDetails = (category) => {
        if (category === "Design") {
            return {
                requirements: ["3+ years of experience in UI/UX design", "Proficiency in Figma and Adobe Creative Suite", "Strong portfolio demonstrating UX process", "Experience with user research and usability testing"],
                benefits: ["Health Insurance", "Remote Work Options", "Creative Equipment Stipend", "Annual Team Retreats"]
            };
        } else if (category === "Engineering") {
            return {
                requirements: ["3+ years of experience in software development", "Proficiency in React, Node.js, and SQL", "Experience with cloud services (AWS/GCP)", "Strong problem-solving skills"],
                benefits: ["Competitive Salary", "Stock Options", "Professional Development Budget", "Flexible Working Hours"]
            };
        } else if (category === "Operations") {
            return {
                requirements: ["5+ years in operational management", "Experience with logistics or production planning", "Strong leadership and team management skills", "Ability to analyze operational metrics"],
                benefits: ["Performance Bonuses", "Health & Safety Cover", "Housing Allowance", "Transportation"]
            };
        } else {
            return {
                requirements: ["Relevant degree or certification", "Strong communication skills", "Ability to work in a fast-paced environment", "Team player attitude"],
                benefits: ["Health Insurance", "Paid Time Off", "Retirement Plan", "Gym Membership"]
            };
        }
    };

    return (
        <section className="flex flex-col items-center px-0 py-0 bg-slate-50 min-h-screen" id="jobs">
            
            {/* --- ADVANCED SEARCH BAR --- */}
            <div className="w-full max-w-6xl mx-auto mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row gap-4 items-center">
                    
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
                            placeholder="Job title, keywords, or company"
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans text-sm text-slate-700 placeholder-slate-400 transition-all"
                        />
                    </div>

                    <div className="relative w-full lg:w-64 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-slate-400" />
                        </div>
                        <select 
                            value={selectedLocation}
                            onChange={(e) => { setSelectedLocation(e.target.value); handleFilterChange(); }}
                            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="relative w-full lg:w-48 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-slate-400" />
                        </div>
                        <select 
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange(); }}
                            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans text-sm text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* --- JOB CARDS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                {currentJobs.length > 0 ? (
                    currentJobs.map((job, index) => {
                        const meta = getJobMeta(job.description);
                        
                        // Determine badge color based on personality
                        const getPersonalityBadge = () => {
                            if(meta.personality === "Introvert Advantage") return "bg-teal-50 text-teal-700 border-teal-100";
                            if(meta.personality === "Extrovert Advantage") return "bg-orange-50 text-orange-700 border-orange-100";
                            return "bg-slate-50 text-slate-600 border-slate-100";
                        };
                        
                        return (
                        <motion.div
                            key={`${job.company}-${index}`}
                            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                                        <img
                                            className="w-10 h-10 rounded-md object-contain"
                                            src={job.logo}
                                            alt={`${job.company} logo`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                        {meta.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                                    {meta.title}
                                </h3>
                                <p className="text-sm font-medium text-slate-500 mb-4">
                                    {job.company}
                                </p>

                                {/* CHANGED: text-sm -> text-xs */}
                                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-6">
                                    {job.description}
                                </p>
                            </div>

                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                                        <MapPin className="w-3 h-3" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                                        <Clock className="w-3 h-3" />
                                        <span>{job.posted}</span>
                                    </div>
                                    {/* NEW: Personality Badge */}
                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium ${getPersonalityBadge()}`}>
                                        <Users className="w-3 h-3" />
                                        <span>{meta.personality}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setSelectedJob(job)}
                                    className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    );
                    })
                ) : (
                    <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 font-medium">No jobs found matching your criteria.</p>
                        <button onClick={() => {setSearchTerm(''); setSelectedLocation('All Locations'); setSelectedCategory('All Categories');}} className="mt-2 text-indigo-600 text-sm hover:underline">Clear filters</button>
                    </div>
                )}
            </div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5 mb-12">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                                    currentPage === i + 1
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                        : "text-slate-500 hover:bg-slate-100"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* --- DETAILED JOB MODAL (Optimized for 90vh) --- */}
            <AnimatePresence>
                {selectedJob && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal Content */}
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 pointer-events-none"
                        >
                            <div 
                                className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* --- LEFT SIDEBAR (Compact) --- */}
                                <div className="w-full md:w-[35%] bg-slate-50 p-5 flex flex-col border-r border-slate-100">
                                    <button 
                                        onClick={() => setSelectedJob(null)}
                                        className="md:hidden self-end mb-2 text-slate-400 hover:text-slate-800"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-2.5 mb-5">
                                        <img 
                                            src={selectedJob.logo} 
                                            alt="Logo" 
                                            className="w-10 h-10 rounded-lg object-contain bg-white p-1 border border-slate-200"
                                        />
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm leading-tight">{selectedJob.company}</h3>
                                            <p className="text-[10px] text-slate-500">Tech Company</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 flex-1">
                                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                                            <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">Salary</p>
                                            <p className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                                                <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                                                {getJobMeta(selectedJob.description).salary}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                                            <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">Location</p>
                                            <p className="text-slate-900 font-medium text-sm flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                                                {selectedJob.location}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                                            <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">Job Type</p>
                                            <p className="text-slate-900 font-medium text-sm flex items-center gap-1.5">
                                                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                                                Full Time
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                                            <p className="text-[10px] text-slate-500 font-semibold uppercase mb-1">Date</p>
                                            <p className="text-slate-900 font-medium text-sm flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                                                {selectedJob.posted}
                                            </p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 transition-all">
                                        Apply Now
                                    </button>
                                    <p className="text-center text-[10px] text-slate-400 mt-1.5">Click to submit application</p>
                                </div>

                                {/* --- RIGHT CONTENT (Compact) --- */}
                                <div className="w-full md:w-[65%] p-5 md:p-6 overflow-y-auto">
                                    <div className="hidden md:flex justify-end mb-2">
                                        <button 
                                            onClick={() => setSelectedJob(null)}
                                            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1.5 leading-tight">
                                        {getJobMeta(selectedJob.description).title}
                                    </h2>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wide">
                                            {getJobMeta(selectedJob.description).category}
                                        </span>
                                        <span className="text-slate-400 text-xs">•</span>
                                        <span className="text-slate-500 text-xs">Posted {selectedJob.posted}</span>
                                    </div>

                                    <div className="space-y-5">
                                        {/* NEW: Personality Section in Modal */}
                                        <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users className="w-4 h-4 text-teal-700"/>
                                                <h4 className="text-sm font-bold text-teal-900">Work Style & Personality</h4>
                                            </div>
                                            <p className="text-teal-800 text-sm font-semibold mb-1">{getJobMeta(selectedJob.description).personality}</p>
                                            <p className="text-teal-700/80 text-xs leading-relaxed">
                                                {getJobMeta(selectedJob.description).personalityDesc}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">About the Job</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {selectedJob.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Requirements</h4>
                                            <ul className="space-y-2">
                                                {getJobDetails(getJobMeta(selectedJob.description).category).requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Benefits</h4>
                                            <ul className="space-y-2">
                                                {getJobDetails(getJobMeta(selectedJob.description).category).benefits.map((ben, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                                        <span>{ben}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}