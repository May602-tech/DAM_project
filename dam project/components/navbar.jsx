'use client';

import { useState } from "react";
import { Menu, X, User, Magnet, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navlinks = [
    { href: "#hero", text: "Home", highlight: true },
    { href: "#jobs", text: "Find Jobs" },
    // This is the "Catchy" menu for the 16 personality explanation
    { href: "#mbti", text: "Discover Your Type" },
    { href: "#about", text: "About" },
  ];

  return (
    <>
      {/* Desktop / Sticky Navbar */}
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-12 lg:px-20 backdrop-blur-md bg-white/70 border-b border-slate-200/60 shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        {/* --- NEW ATTRACTIVE LOGO --- */}
        <a href="#!" className="flex-shrink-0 flex items-center gap-2.5 group">
            {/* Gradient Icon Box */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                <Magnet className="w-5 h-5 text-white" />
            </div>
            {/* Logo Text */}
            <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    BE<span className="text-indigo-600">U</span>MATCH
                </span>
            </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 transition duration-300">
          {navlinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all relative group ${
                  link.highlight 
                  ? "text-indigo-600" 
                  : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {link.highlight && <Sparkles className="w-3.5 h-3.5 animate-pulse" />}
                {link.text}
              </span>
              {/* Hover underline effect */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full ${
                  link.highlight ? "w-1/2" : "w-0"
              }`}></span>
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:shadow-indigo-200 active:scale-95 flex items-center gap-2">
            Login
            <User className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition active:scale-95"
        >
          <Menu className="w-6 h-6" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-lg flex flex-col items-center justify-center text-xl gap-8 lg:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navlinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-white font-medium hover:text-indigo-400 transition-colors transform hover:scale-105 flex items-center gap-2 ${
                link.highlight ? "text-indigo-400" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
             {link.highlight && <Sparkles className="w-5 h-5" />}
            {link.text}
          </Link>
        ))}

        {/* Mobile Action Button */}
        <div className="flex flex-col gap-4 mt-4 w-full px-12">
            <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg transition"
            >Login
            </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition"
        >
          <X className="w-8 h-8" />
        </button>
      </motion.div>
    </>
  );
}