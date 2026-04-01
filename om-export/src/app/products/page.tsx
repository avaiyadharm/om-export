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
    <div className="pt-20 min-h-screen bg-[#F9F9FF]">
      {/* Page Header */}
      <section className="bg-[#071C36] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="w-full max-w-[1600px] mx-auto px-10 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
              Our Export Products
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Browse through our premium export catalog of Indian products across diverse categories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E7EEFF]">
        <div className="w-full max-w-[1600px] mx-auto px-10 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#F0F3FF] rounded-xl text-base text-[#071C36] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <SlidersHorizontal className="w-4 h-4 text-[#6B7280] shrink-0 hidden md:block" />
              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-[#071C36] text-white"
                    : "bg-[#F0F3FF] text-[#6B7280] hover:bg-[#DEE8FF]"
                }`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#071C36] text-white"
                      : "bg-[#F0F3FF] text-[#6B7280] hover:bg-[#DEE8FF]"
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
      <section className="py-14">
        <div className="w-full max-w-[1600px] mx-auto px-10 lg:px-20">
          <AnimatedSection>
            <p className="text-base text-[#6B7280] mb-10">
              Showing <span className="font-semibold text-[#071C36]">{filteredProducts.length}</span>{" "}
              product{filteredProducts.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <span>
                  {" "}in{" "}
                  <span className="text-[#A48300] font-medium">
                    {categories.find((c) => c.id === activeCategory)?.name}
                  </span>
                </span>
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
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
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
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071C36]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#071C36]">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-[#071C36] mb-2 group-hover:text-[#A48300] transition-colors duration-400" style={{ fontFamily: "Manrope, sans-serif" }}>
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#A48300] uppercase tracking-wider font-medium mb-3">
                          {product.tagline}
                        </p>
                        <p className="text-base text-[#6B7280] line-clamp-2 mb-5 leading-relaxed">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between pt-5 border-t border-[#F0F3FF]">
                          <span className="text-sm text-[#6B7280]">
                            MOQ: {product.moq} {product.moqUnit}
                          </span>
                          <span className="text-[#A48300] text-base font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details <ArrowRight className="w-4 h-4" />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#071C36] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                No products found
              </h3>
              <p className="text-[#6B7280]">Try adjusting your search or category filter.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
