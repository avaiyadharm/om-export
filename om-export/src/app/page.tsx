"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, Package, Users, Award, ChevronRight } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { categories, products, founders, companyInfo } from "@/lib/data";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#071C36]">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#1a3a5c]/30 rounded-full blur-[100px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20 pt-28 md:py-36 md:pt-44"
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5 sm:mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-white/70 text-xs sm:text-sm tracking-wider uppercase font-medium">
                  Trusted by 1000+ buyers worldwide
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.15] mb-6 sm:mb-12"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Global Export
                <br />
                <span className="bg-gradient-to-r from-[#FFE088] to-[#D4AF37] bg-clip-text text-transparent">
                  Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-base sm:text-xl text-white/60 max-w-2xl leading-[1.7] sm:leading-[1.8] mb-8 sm:mb-14"
              >
                Connecting businesses worldwide with premium Indian exports across{" "}
                <span className="text-[#D4AF37] font-medium">50+ countries</span>. Your trusted
                partner in global trade.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-3 sm:gap-5"
              >
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-5 text-sm sm:text-base bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-500 hover:scale-105"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-5 text-sm sm:text-base border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-500"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            {/* Hero image grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:grid grid-cols-2 gap-5"
            >
              {[products[0], products[2], products[5], products[7]].map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  className={`relative rounded-2xl overflow-hidden ${
                    i === 0 || i === 3 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071C36]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-medium">
                      {p.category}
                    </span>
                    <p className="text-white text-base font-semibold mt-1">{p.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[#D4AF37]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#0B1F3A] border-t border-white/5">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-14">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 lg:gap-16">
            {[
              { icon: Globe, value: "50+", label: "Countries Served" },
              { icon: Package, value: "200+", label: "Products" },
              { icon: Users, value: "1000+", label: "Happy Clients" },
              { icon: Award, value: "10+", label: "Years Experience" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-white/40 text-[10px] sm:text-sm uppercase tracking-wider mt-0.5 sm:mt-1">{stat.label}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 sm:py-32 bg-[#F0F3FF]">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <AnimatedSection className="text-center mb-10 sm:mb-20">
            <span className="text-[#A48300] text-sm tracking-[0.15em] uppercase font-semibold">
              What We Export
            </span>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#071C36] mt-3 sm:mt-5 mb-4 sm:mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Our Export Categories
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-lg max-w-3xl mx-auto leading-[1.7] sm:leading-[1.8]">
              From farm produce to fine jewellery, we export a diverse range of premium Indian
              products to markets worldwide.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-8">
            {categories.map((cat) => (
              <StaggerItem key={cat.id}>
                <Link href={`/products?category=${cat.id}`}>
                  <div className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 text-center cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(7,28,54,0.1)]">
                    <div className="text-3xl sm:text-5xl mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                    <h3
                      className="text-sm sm:text-base font-semibold text-[#071C36] mb-1 sm:mb-2"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7280]">{cat.productCount} products</p>
                    <div className="w-8 h-0.5 bg-[#D4AF37] mx-auto mt-3 sm:mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 sm:py-32 bg-white">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <AnimatedSection className="flex items-end justify-between mb-8 sm:mb-16">
            <div>
              <span className="text-[#A48300] text-sm tracking-[0.15em] uppercase font-semibold">
                Curated Selection
              </span>
              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#071C36] mt-3 sm:mt-5"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-1 text-[#A48300] font-medium text-sm hover:gap-2 transition-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {featuredProducts.slice(0, 6).map((product) => (
              <StaggerItem key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_70px_rgba(7,28,54,0.12)]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071C36]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#071C36]">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-7 lg:p-8">
                      <h3
                        className="text-lg sm:text-xl font-bold text-[#071C36] mb-2 group-hover:text-[#A48300] transition-colors duration-400"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6B7280] line-clamp-2 mb-4 sm:mb-5 leading-[1.7]">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#6B7280]">
                          MOQ: {product.moq} {product.moqUnit}
                        </span>
                        <span className="text-[#A48300] text-base font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] font-semibold rounded-xl"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-16 sm:py-32 bg-[#F0F3FF]">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
            <AnimatedSection variant="slideLeft">
              <span className="text-[#A48300] text-xs tracking-[0.15em] uppercase font-semibold">
                About OM Export
              </span>
              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#071C36] mt-3 sm:mt-5 mb-6 sm:mb-10"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Your Trusted Partner in Global Trade
              </h2>
              <p className="text-base sm:text-lg text-[#6B7280] leading-[1.7] sm:leading-[1.8] mb-8 sm:mb-12">{companyInfo.description}</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
                {[
                  { value: "50+", label: "Countries" },
                  { value: "200+", label: "Products" },
                  { value: "1000+", label: "Clients" },
                  { value: "10+", label: "Years" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 sm:p-6">
                    <p
                      className="text-2xl sm:text-3xl font-bold text-[#A48300]"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-[#6B7280] uppercase tracking-wider mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideRight">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {founders.map((founder, i) => (
                  <div
                    key={founder.name}
                    className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 text-center ${
                      i === 1 ? "sm:translate-y-6" : ""
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <span className="text-white text-lg sm:text-xl font-bold">
                        {founder.name.charAt(0)}
                      </span>
                    </div>
                    <h3
                      className="text-sm sm:text-base font-bold text-[#071C36] leading-snug"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {founder.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#6B7280] uppercase tracking-wider mt-1.5 sm:mt-2">
                      {founder.title}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 sm:py-24 bg-[#071C36] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 text-center">
          <AnimatedSection>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 sm:mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Start Importing Today
            </h2>
            <p className="text-base sm:text-xl text-[#D4AF37] mb-4 sm:mb-5">
              Connect with us for premium export solutions
            </p>
            <p className="text-sm sm:text-lg text-white/50 mb-8 sm:mb-14 max-w-3xl mx-auto leading-[1.7] sm:leading-[1.8]">
              Whether you&apos;re a distributor, wholesaler, or importer — we have the products and
              expertise to help your business grow globally.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-5">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3.5 sm:py-5 text-sm sm:text-base bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-500 hover:scale-105"
              >
                Send Inquiry
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3.5 sm:py-5 text-sm sm:text-base border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all duration-500"
              >
                Browse Products
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
