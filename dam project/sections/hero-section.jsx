import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// --- MAIN COMPONENT ---
export default function CareerFlow() {
  // --- STATE ---
  const [view, setView] = useState("hero"); // 'hero', 'result'
  const [user, setUser] = useState(null);   // null = not logged in
  const [loading, setLoading] = useState(false);

  // Alert State
  const [alert, setAlert] = useState(null); // { type: 'error'|'success', msg: '' }

  // --- EFFECTS ---
  // Show alert automatically if set, then hide
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // --- HANDLERS ---

  const handleStartTest = async () => {
    if (!user) {
      showAlert("error", "Please Login first!");
      return;
    }
  };

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
  };

  // --- UI COMPONENTS ---

  const AlertBox = () => (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px] justify-center backdrop-blur-md border ${
            alert.type === 'error' 
              ? 'bg-red-50/90 border-red-200 text-red-800' 
              : 'bg-green-50/90 border-green-200 text-green-800'
          }`}
        >
          {alert.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <span className="font-semibold text-sm">{alert.msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const HeroSection = () => (
    <section className="relative flex items-center py-5 md:py-25 bg-white overflow-hidden">
      
      {/* --- MESH GRADIENT BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[800px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[800px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="container mx-auto max-w-[1800px] px-6 md:px-12 lg:px-16 relative z-10 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT — Text Content */}
          <div className="max-w-2xl order-2 lg:order-1">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Not sure what <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                career fits you?
              </span>
            </motion.h1>

            <motion.p
              className="mt-4 text-base text-slate-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Many people choose careers based on pressure or trends. 
              We help you understand yourself first — then explore careers that actually make sense for you.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button 
                onClick={handleStartTest}
                disabled={loading}
                className="group flex items-center gap-2 px-7 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                {loading ? "Loading..." : "Start with a short test"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </motion.div>
          </div>

          {/* RIGHT — Image */}
          <motion.div
            className="relative h-[300px] flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-md aspect-square md:aspect-[4/3] bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-2 overflow-hidden"
            >
              <img
                src="/assets/img/job.png"
                alt="Career Exploration"
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom CSS for the blob animation */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      <AlertBox />

      <AnimatePresence mode="wait">
        {view === "hero" && <HeroSection key="hero" />}
      </AnimatePresence>
    </div>
  );
}