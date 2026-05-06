"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { products, categories } from "@/lib/data";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "all" || p.categoryId === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="pt-24 min-h-screen bg-[#F9F9FF]">
      {/* Page Header */}
      <section className="bg-[#071C36] py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-white/40 text-base mb-4">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">Products</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Our Export Products
            </h1>
            <p className="text-white/60 text-xl sm:text-2xl md:text-3xl max-w-2xl leading-[1.7] sm:leading-[1.8]">
            <br />
              Browse through our premium export catalog of Indian products across diverse categories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-24 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E7EEFF]">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xl group/search">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#9CA3AF] group-focus-within/search:text-[#D4AF37] transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-[#F0F3FF] rounded-2xl text-xl text-[#071C36] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <SlidersHorizontal className="w-4 h-4 text-[#6B7280] shrink-0 hidden md:block" />
              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-[#071C36] text-white shadow-lg shadow-[#071C36]/20"
                    : "bg-[#F0F3FF] text-[#6B7280] hover:bg-[#DEE8FF] hover:text-[#071C36]"
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#071C36] text-white shadow-lg shadow-[#071C36]/20"
                      : "bg-[#F0F3FF] text-[#6B7280] hover:bg-[#DEE8FF] hover:text-[#071C36]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-6 sm:py-12">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <AnimatedSection>
            <p className="text-base text-[#6B7280] mb-5">
              Showing <span className="font-semibold text-[#071C36]">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <span> in <span className="text-[#A48300] font-medium">{categories.find((c) => c.id === activeCategory)?.name}</span></span>
              )}
            </p>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
                  className="flex justify-center sm:block"
                >
                  <Link href={`/products/${product.id}`} className="block w-[80%] sm:w-full">
                    {/* Mobile: image + text below */}
                    <div className="group sm:hidden bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-5">
                      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F7FF]">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className={`transition-transform duration-500 group-hover:scale-105 ${product.imageUrl.includes(".png") ? "object-contain p-4" : "object-cover"}`}
                          sizes="80vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-[#071C36] mb-1 leading-snug" style={{ fontFamily: "Manrope, sans-serif" }}>
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#A48300] font-semibold uppercase tracking-wide mb-2">
                          {product.tagline}
                        </p>
                        <p className="text-base text-[#6B7280] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    {/* Desktop: full card */}
                    <div className="group hidden sm:flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative aspect-square overflow-hidden bg-[#F5F7FF]">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className={`transition-transform duration-500 group-hover:scale-105 ${product.imageUrl.includes(".png") ? "object-contain p-4" : "object-cover"}`}
                          sizes="(max-width: 1024px) 33vw, 20vw"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#071C36]">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#071C36] mb-0.5 line-clamp-2 leading-snug group-hover:text-[#A48300] transition-colors" style={{ fontFamily: "Manrope, sans-serif" }}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#A48300] font-semibold uppercase tracking-wide truncate mb-auto">
                          {product.tagline}
                        </p>
                        <div className="flex items-center justify-between border-t border-[#F0F3FF] mt-2 pt-2">
                          <span className="text-xs text-[#9CA3AF]">MOQ: {product.moq} {product.moqUnit}</span>
                          <span className="text-[#A48300] text-xs font-bold inline-flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#071C36] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>No products found</h3>
              <p className="text-[#6B7280]">Try adjusting your search or category filter.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
