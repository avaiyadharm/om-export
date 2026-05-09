"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { products, categories } from "@/lib/data";

// Pastel background palette
const PASTEL_BG = [
  "#FEF9C3",
  "#CEFAFE",
  "#ECFCCA",
  "#FAE8FF",
  "#FFE4E6",
  "#FEF3C7",
  "#DBEAFE",
  "#D1FAE5",
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((p) => {
      const matchSearch =
        (p?.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (p?.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchCategory =
        activeCategory === "all" || p?.categoryId === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#F9F9FF]">

      {/* Search & Filters */}
      <section className="sticky top-28 sm:top-40 z-40 bg-white shadow-sm border-b border-[#E7EEFF] transition-all duration-300">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-[#9CA3AF]" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-6 sm:py-8 bg-[#F0F3FF] rounded-2xl text-xl sm:text-2xl text-[#071C36] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:bg-white transition-all duration-300"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide w-full lg:w-auto">
              <SlidersHorizontal className="w-8 h-8 text-[#6B7280] shrink-0 hidden lg:block mr-2" />

              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 px-8 sm:px-10 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 ${activeCategory === "all"
                    ? "bg-[#071C36] text-white shadow-md"
                    : "bg-[#F0F3FF] text-[#6B7280] hover:bg-[#E2E8F0]"
                  }`}
              >
                All Products
              </button>

              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 px-8 sm:px-10 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 ${activeCategory === cat.id
                        ? "bg-[#071C36] text-white shadow-md"
                        : "bg-[#F0F3FF] text-[#6B7280] hover:bg-[#E2E8F0]"
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
            <p className="text-base text-[#6B7280] mb-6">
              Showing{" "}
              <span className="font-semibold text-[#071C36]">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredProducts.map((product: any, i: number) => (
                <motion.div
                  key={product?.id || i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: Math.min(i * 0.04, 0.3),
                    duration: 0.3,
                  }}
                  className="h-full"
                >
                  <Link
                    href={`/products/${product?.id || ""}`}
                    className="block h-full"
                  >
                    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full border border-gray-100 hover:border-[#D4AF37]/40">
                      {/* Image */}
                      <div className="p-3 pb-0">
                        <div
                          className="relative w-full overflow-hidden rounded-xl"
                          style={{
                            background:
                              PASTEL_BG[i % PASTEL_BG.length],
                            aspectRatio: "1 / 1",
                          }}
                        >
                          <Image
                            src={product?.imageUrl || "/placeholder.png"}
                            alt={product?.name || "Product"}
                            fill
                            className={`transition-transform duration-500 group-hover:scale-105 ${product?.imageUrl?.includes(".png")
                                ? "object-contain p-4"
                                : "object-cover"
                              }`}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />

                          {/* Category */}
                          <span className="absolute top-2 left-2 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-bold text-[#071C36] shadow-sm">
                            {product?.category || "Product"}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 px-3.5 pt-3 pb-3.5">
                        <h3
                          className="text-sm sm:text-[15px] font-extrabold text-[#231F20] leading-snug line-clamp-2 mb-1 group-hover:text-[#A48300] transition-colors duration-200"
                          style={{ fontFamily: "Manrope, sans-serif" }}
                        >
                          {product?.name || "Unnamed Product"}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-[#A48300] font-semibold uppercase tracking-wider mb-3 truncate">
                          {product?.tagline || "Premium Quality"}
                        </p>

                        {/* Specifications */}
                        <div className="flex flex-col gap-1.5 mb-3">
                          {Object.entries(
                            product?.specifications || {}
                          )
                            .slice(0, 2)
                            .map(([key, val]) => (
                              <span
                                key={key}
                                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[#555]"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />

                                <span className="font-medium">
                                  {key}:
                                </span>

                                <span className="text-[#071C36] font-semibold truncate">
                                  {String(val)}
                                </span>
                              </span>
                            ))}
                        </div>

                        <div className="flex-1" />

                        {/* MOQ */}
                        <p className="text-[10px] sm:text-xs text-[#9CA3AF] mb-2.5">
                          MOQ:{" "}
                          <span className="font-bold text-[#071C36]">
                            {product?.moq || 0}{" "}
                            {product?.moqUnit || ""}
                          </span>
                        </p>

                        {/* CTA */}
                        <div className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#071C36] text-white text-xs sm:text-sm font-bold group-hover:bg-[#D4AF37] group-hover:text-[#071C36] transition-all duration-300 shadow-sm">
                          Get Quote

                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>

              <h3
                className="text-xl font-bold text-[#071C36] mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                No products found
              </h3>

              <p className="text-[#6B7280]">
                Try adjusting your search or category filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}