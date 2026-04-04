import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071C36] text-white">
      {/* Main Footer */}
      <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] shrink-0">
                <Image
                  src="/om-logo.png"
                  alt="OM Export Logo"
                  fill
                  className="object-contain"
                  sizes="72px"
                />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                  OM EXPORT
                </span>
                <span className="block text-xs text-[#D4AF37] tracking-[0.25em] uppercase font-medium -mt-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Global Trade
                </span>
              </div>
            </div>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Connecting businesses worldwide with premium Indian exports. 
              Your trusted partner in global trade since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#D4AF37] text-base transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-semibold mb-6">
              Categories
            </h3>
            <ul className="space-y-3">
              {["Dairy Products", "Electronics", "Garments", "Pharmaceuticals", "Jewellery"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href="/products"
                      className="text-white/60 hover:text-[#D4AF37] text-base transition-colors duration-300"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-semibold mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <a
                  href="mailto:omexport291@gmail.com"
                  className="text-white/60 hover:text-white text-base transition-colors"
                >
                  omexport291@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="text-white/60 text-base">+91 99253 53952</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="text-white/60 text-base">Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-5 sm:py-7 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/40 text-base">
            © {new Date().getFullYear()} OM Export. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-base">
            <span>Exporting to</span>
            <span className="text-[#D4AF37] font-semibold">50+ Countries</span>
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
