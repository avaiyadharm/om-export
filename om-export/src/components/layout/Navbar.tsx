"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#071C36]/95 backdrop-blur-xl shadow-lg shadow-[#071C36]/10"
          : "bg-[#0B1F3A]"
      }`}
    >
      <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between h-16 sm:h-22">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#FFE088] to-[#A48300] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20"
            >
              <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-[#241A00]" />
            </motion.div>
            <div>
              <span className="text-lg sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                OM EXPORT
              </span>
              <span className="hidden sm:block text-[11px] text-[#D4AF37] tracking-[0.25em] uppercase font-medium -mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
                Global Trade
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-white/80 hover:text-white text-base font-medium transition-colors duration-400 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-7 py-3 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-500 hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-[#071C36] border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-white/80 hover:text-white text-lg font-medium py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center px-6 py-3 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] font-semibold rounded-lg mt-4"
                >
                  Get Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
