"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#051120]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-[#051120]"
        }`}
    >
      <div className="w-full mx-auto px-8 sm:px-12 md:px-20 lg:px-32 xl:px-40">
        <div className="flex items-center justify-between h-28 sm:h-40">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 sm:gap-6 group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
              <Image
                src="/om-logo.png"
                alt="OM Export Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 96px, 128px"
                priority
              />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                OM EXPORT
              </span>
              <span className="hidden sm:block text-base text-[#D4AF37] tracking-[0.25em] uppercase font-medium mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                Global Trade
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-white/80 hover:text-white text-2xl font-medium px-6 py-4 transition-colors duration-400 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-10 py-5 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] text-xl font-bold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-500 hover:scale-105 ml-6"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-3"
          >
            {isMobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
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
                    className="block text-white/80 hover:text-white text-xl font-medium py-3 transition-colors"
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
                  className="block text-center px-6 py-4 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] text-lg font-semibold rounded-xl mt-4"
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
