import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, CheckCircle, ArrowRight, Target, Zap, BookOpen } from "lucide-react";

export default function MBTITypes() {
    
    // --- DATA: 16 PERSONALITIES WITH FULL DETAILS & COLOR THEMES ---
    const personalities = [
        // ANALYSTS (Violet)
        { 
            code: "INTJ", name: "The Architect", group: "Analyst", 
            theme: { bg: "bg-violet-100", text: "text-violet-700", active: "bg-violet-600", border: "border-violet-200" },
            desc: "Strategic planners who imagine future.",
            details: "Imaginative and strategic thinkers, with a plan for everything. They have a natural ability to see the big picture, anticipate trends, and create long-term strategies. Often seen as the 'Mastermind', they value knowledge and competence.",
            strengths: ["Strategic Thinking", "Logical Reasoning", "High Standards", "Independent"],
            careers: ["Software Architect", "Strategic Planner", "Scientist", "Systems Analyst"]
        },
        { 
            code: "INTP", name: "The Logician", group: "Analyst", 
            theme: { bg: "bg-violet-100", text: "text-violet-700", active: "bg-violet-600", border: "border-violet-200" },
            desc: "Inventive thinkers with a thirst for knowledge.",
            details: "Inventive architects with a relentless thirst for knowledge. They love to analyze systems, understand how things work, and find logical explanations for almost everything. They are quiet, reserved, and often lost in thought.",
            strengths: ["Great Analysis", "Original Thinking", "Objective", "Open-minded"],
            careers: ["Data Analyst", "Professor", "Researcher", "Programmer"]
        },
        { 
            code: "ENTJ", name: "The Commander", group: "Analyst", 
            theme: { bg: "bg-violet-100", text: "text-violet-700", active: "bg-violet-600", border: "border-violet-200" },
            desc: "Bold leaders who always find a way.",
            details: "Bold, imaginative, and strong-willed leaders, always finding a way. They enjoy long-term planning and goal setting. They are often seen as 'Field Marshals', thriving on organizing people and projects to reach goals efficiently.",
            strengths: ["Efficiency", "Energetic", "Self-confident", "Strong-willed"],
            careers: ["CEO", "Management Consultant", "Lawyer", "University Administrator"]
        },
        { 
            code: "ENTP", name: "The Debater", group: "Analyst", 
            theme: { bg: "bg-violet-100", text: "text-violet-700", active: "bg-violet-600", border: "border-violet-200" },
            desc: "Smart thinkers who love a challenge.",
            details: "Smart and curious thinkers who cannot resist an intellectual challenge. They are quick-witted and resourceful. They love to debate ideas and explore new possibilities, often playing the 'Devil's Advocate' to stimulate discussion.",
            strengths: ["Knowledgeable", "Quick-witted", "Innovative", "Charismatic"],
            careers: ["Entrepreneur", "Journalist", "Sales Manager", "Political Analyst"]
        },

        // DIPLOMATS (Teal)
        { 
            code: "INFJ", name: "The Advocate", group: "Diplomat", 
            theme: { bg: "bg-teal-100", text: "text-teal-700", active: "bg-teal-600", border: "border-teal-200" },
            desc: "Quiet mystics who inspire others.",
            details: "Quiet and mystical, yet very inspiring and tireless idealists. They have a deep understanding of people and a strong desire to help others reach their potential. They are guided by their values and intuition.",
            strengths: ["Insightful", "Principled", "Altruistic", "Creative"],
            careers: ["Counselor", "HR Specialist", "Writer", "Non-profit Coordinator"]
        },
        { 
            code: "INFP", name: "The Mediator", group: "Diplomat", 
            theme: { bg: "bg-teal-100", text: "text-teal-700", active: "bg-teal-600", border: "border-teal-200" },
            desc: "Poetic souls who help good causes.",
            details: "Poetic, kind, and altruistic people, always eager to help a good cause. They have a vivid imagination and a strong sense of empathy. They are loyal to their values and strive to make the world a better place.",
            strengths: ["Creative", "Empathetic", "Generous", "Open-minded"],
            careers: ["Graphic Designer", "Editor", "Social Worker", "Multimedia Artist"]
        },
        { 
            code: "ENFJ", name: "The Protagonist", group: "Diplomat", 
            theme: { bg: "bg-teal-100", text: "text-teal-700", active: "bg-teal-600", border: "border-teal-200" },
            desc: "Charismatic leaders who mesmerize listeners.",
            details: "Charismatic and inspiring leaders, able to mesmerize their listeners. They are passionate about helping others reach their potential. They have a natural ability to bring out the best in people.",
            strengths: ["Charismatic", "Reliable", "Natural Leader", "Empathetic"],
            careers: ["Teacher", "PR Specialist", "Non-profit Director", "Event Coordinator"]
        },
        { 
            code: "ENFP", name: "The Campaigner", group: "Diplomat", 
            theme: { bg: "bg-teal-100", text: "text-teal-700", active: "bg-teal-600", border: "border-teal-200" },
            desc: "Enthusiastic free spirits who smile.",
            details: "Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile. They love exploring life and connecting with people. They are warm, energetic, and very imaginative.",
            strengths: ["Curious", "Observant", "Energetic", "Excellent Communicator"],
            careers: ["Actor", "Event Planner", "Diplomat", "Marketing Manager"]
        },

        // SENTINELS (Blue)
        { 
            code: "ISTJ", name: "The Logistician", group: "Sentinel", 
            theme: { bg: "bg-blue-100", text: "text-blue-700", active: "bg-blue-600", border: "border-blue-200" },
            desc: "Practical fact-minders who are reliable.",
            details: "Practical and fact-minded individuals, whose reliability cannot be doubted. They value tradition, loyalty, and hard work. They are organized, methodical, and strive to create order in their environment.",
            strengths: ["Honest", "Direct", "Strong-willed", "Responsible"],
            careers: ["Accountant", "Auditor", "Judge", "Office Administrator"]
        },
        { 
            code: "ISFJ", name: "The Defender", group: "Sentinel", 
            theme: { bg: "bg-blue-100", text: "text-blue-700", active: "bg-blue-600", border: "border-blue-200" },
            desc: "Warm protectors ready to defend loved ones.",
            details: "Very dedicated and warm protectors, always ready to defend their loved ones. They are attentive to details and strive to create harmony. They are loyal, hardworking, and modest.",
            strengths: ["Supportive", "Reliable", "Patient", "Imaginative"],
            careers: ["Nurse", "Administrator", "Office Manager", "Paralegal"]
        },
        { 
            code: "ESTJ", name: "The Executive", group: "Sentinel", 
            theme: { bg: "bg-blue-100", text: "text-blue-700", active: "bg-blue-600", border: "border-blue-200" },
            desc: "Administrators who manage people well.",
            details: "Excellent administrators, unsurpassed at managing things or people. They value order, knowledge, and tradition. They are organized, logical, and assertive in ensuring things get done.",
            strengths: ["Dedicated", "Patient", "Organized", "Direct"],
            careers: ["Military Officer", "Police Officer", "Judge", "School Principal"]
        },
        { 
            code: "ESFJ", name: "The Consul", group: "Sentinel", 
            theme: { bg: "bg-blue-100", text: "text-blue-700", active: "bg-blue-600", border: "border-blue-200" },
            desc: "Caring socialites eager to help.",
            details: "Extraordinarily caring, social, and popular people, always eager to help. They are strong team players and love bringing people together. They value harmony and cooperation.",
            strengths: ["Strong Practical Skills", "Loyal", "Sensitive", "Good Listener"],
            careers: ["Teacher", "Social Worker", "Receptionist", "Medical Assistant"]
        },

        // EXPLORERS (Orange)
        { 
            code: "ISTP", name: "The Virtuoso", group: "Explorer", 
            theme: { bg: "bg-orange-100", text: "text-orange-700", active: "bg-orange-500", border: "border-orange-200" },
            desc: "Bold experimenters mastering tools.",
            details: "Bold and practical experimenters, masters of all kinds of tools. They love using their hands and figuring out how things work. They are spontaneous, rational, and thrive on action.",
            strengths: ["Optimistic", "Creative", "Practical", "Spontaneous"],
            careers: ["Mechanic", "Engineer", "Forensic Scientist", "Pilot"]
        },
        { 
            code: "ISFP", name: "The Adventurer", group: "Explorer", 
            theme: { bg: "bg-orange-100", text: "text-orange-700", active: "bg-orange-500", border: "border-orange-200" },
            desc: "Flexible artists exploring new things.",
            details: "Flexible and charming artists, always ready to explore and experience something new. They live in the present and value aesthetics. They are sensitive and kind, but also fiercely independent.",
            strengths: ["Charming", "Sensitive to Others", "Imaginative", "Passionate"],
            careers: ["Fashion Designer", "Jeweler", "Chef", "Interior Designer"]
        },
        { 
            code: "ESTP", name: "The Entrepreneur", group: "Explorer", 
            theme: { bg: "bg-orange-100", text: "text-orange-700", active: "bg-orange-500", border: "border-orange-200" },
            desc: "Perceptive people living on the edge.",
            details: "Smart, energetic, and very perceptive people, who truly enjoy living on the edge. They are action-oriented and love taking risks. They are direct and have a great sense of humor.",
            strengths: ["Bold", "Rational", "Practical", "Original"],
            careers: ["Sales Representative", "Paramedic", "Police Officer", "Athlete"]
        },
        { 
            code: "ESFP", name: "The Entertainer", group: "Explorer", 
            theme: { bg: "bg-orange-100", text: "text-orange-700", active: "bg-orange-500", border: "border-orange-200" },
            desc: "Spontaneous enthusiasts who are fun.",
            details: "Spontaneous, energetic, and enthusiastic people. Life is never boring around them. They love being the center of attention and have a natural ability to entertain and engage others.",
            strengths: ["Bold", "Original", "Aesthetes", "Showmanship"],
            careers: ["Actor", "Musician", "Public Relations", "Tour Guide"]
        },
    ];

    const [activeType, setActiveType] = useState(null);

    const DefaultInfoView = () => (
        <div className="h-full flex flex-col justify-center items-start max-w-lg mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="w-12 h-12 rounded-full bg-white/80 border border-slate-200 shadow-sm flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-6 h-6 text-slate-600" />
                </div>
                
                <h2 className="text-3xl font-light text-slate-800 tracking-tight">Discover Yourself</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                    The Myers-Briggs Type Indicator (MBTI) is an introspective self-report questionnaire indicating differing psychological preferences in how people perceive the world and make decisions.
                </p>
                
                <div className="p-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Explore 16 Types</h3>
                    <ul className="grid grid-cols-2 gap-3 text-sm text-slate-600 font-medium">
                        {["Analyst", "Diplomat", "Sentinel", "Explorer"].map(g => {
                             let colorClass = g === 'Analyst' ? 'bg-violet-500' : 
                                            g === 'Diplomat' ? 'bg-teal-500' : 
                                            g === 'Sentinel' ? 'bg-blue-500' : 'bg-orange-500';
                             return (
                                <li key={g} className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${colorClass}`}></div>
                                    {g}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </motion.div>
        </div>
    );

    return (
        <section className="flex flex-col items-center px-0 py-0 bg-slate-50 min-h-[400px]" id="mbti">
            
            {/* --- MAIN CARD CONTAINER --- */}
            {/* CHANGED: max-w-4xl to max-w-6xl for width, h-[500px] to h-[400px] for height */}
            <div className="relative w-full max-w-10xl mx-auto mt-12 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-white/50 overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[520px]">
                

                {/* --- LEFT SIDE: CIRCULAR DISPLAY --- */}
                <div className="relative z-10 w-full lg:w-[45%] h-full flex items-center justify-center p-4 lg:p-0">
                    
                    {/* CHANGED: Reduced ring sizes slightly to fit the shorter height (400px) */}
                    {/* Decorative Rings */}
                    <div className="absolute w-[180px] h-[180px] rounded-full border border-slate-800 "></div>
                    <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-slate-500"></div>

                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-[260px] h-[260px]"
                    >

                        {/* Grid of Types */}
                        <div className="absolute inset-0 grid grid-cols-4 gap-4 p-2 items-center justify-center content-center">
                            {personalities.map((p, index) => {
                                const isActive = activeType?.code === p.code;
                                const theme = p.theme;
                                
                                return (
                                    <motion.button
                                        key={p.code}
                                        onClick={() => setActiveType(p)}
                                        className={`
                                            relative w-full aspect-square rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-0
                                            ${isActive 
                                                ? `${theme.active} text-white border-transparent scale-110 shadow-lg z-10 ring-2 ring-white/50` 
                                                : `${theme.bg} ${theme.text} ${theme.border} hover:scale-105 hover:brightness-95`
                                            }
                                        `}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.02 }}
                                    >
                                        <span className="leading-none select-none">
                                            {p.code}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT SIDE: INFO PANEL --- */}
                <div className="relative z-10 w-full lg:w-[58%] h-full mt-6 border-t lg:border-t-0 lg:border-l border-white/40 bg-white/30 backdrop-blur-sm">
                    <div className="absolute inset-0 flex flex-col p-6 md:p-8 overflow-y-auto">
                        
                        <div className="flex-1 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {!activeType ? (
                                    <DefaultInfoView key="default" />
                                ) : (
                                    <motion.div
                                        key={activeType.code}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="max-w-lg mx-auto"
                                    >
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="relative">
                                                    <div className={`w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center text-base font-black text-slate-900 shadow-sm ${activeType.theme.border}`}>
                                                        {activeType.code}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 block">
                                                        {activeType.group}
                                                    </span>
                                                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                                                        {activeType.name}
                                                    </h1>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium leading-relaxed border-l-4 border-slate-200 pl-4 italic">
                                                "{activeType.desc}"
                                            </p>
                                        </div>

                                        {/* Detailed Description */}
                                        <div className="mb-6">
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <BookOpen size={14} /> Detailed Analysis
                                            </h3>
                                            <p className="text-slate-600 leading-6 text-justify text-sm">
                                                {activeType.details}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Strengths */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <Target size={14} /> Key Strengths
                                                </h3>
                                                <div className="space-y-2">
                                                    {activeType.strengths.map((s, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <div className={`w-1 h-3 rounded-full bg-slate-300`}></div>
                                                            <span className="text-slate-700 font-medium text-sm">{s}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Careers */}
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <Zap size={14} /> Best Careers
                                                </h3>
                                                <ul className="space-y-2">
                                                    {activeType.careers.map((c, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                                                            <CheckCircle size={12} className={activeType.theme.text} />
                                                            {c}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
                                            <button 
                                                onClick={() => setActiveType(null)}
                                                className="text-slate-400 text-xs hover:text-slate-800 transition-colors flex items-center gap-1 font-medium"
                                            >
                                                &larr; Back
                                            </button>
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}