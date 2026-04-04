"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Globe, Shield, Truck, ChevronRight, AlertCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { products } from "@/lib/data";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [formState, setFormState] = useState({ name: "", country: "", quantity: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-[#071C36]">Product not found</h1>
        <Link href="/products" className="text-[#A48300] mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: "",
          subject: `Product Inquiry: ${product.name}`,
          message: formState.message,
          source: "product_inquiry",
          product: product.name,
          country: formState.country,
          quantity: formState.quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
      setFormState({ name: "", country: "", quantity: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#F9F9FF]">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={product.images[0] || product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071C36] via-[#071C36]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-16 lg:p-24 xl:p-32">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 text-white/50 text-sm mb-5">
                <Link href="/" className="hover:text-[#D4AF37] transition-colors duration-400">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/products" className="hover:text-[#D4AF37] transition-colors duration-400">Products</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/70">{product.name}</span>
              </div>
              <span className="text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-semibold">
                {product.category}
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 sm:mt-4 mb-3 sm:mb-5"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {product.name}
              </h1>
              <p className="text-white/60 text-lg sm:text-xl md:text-2xl max-w-2xl leading-[1.7] sm:leading-[1.8]">{product.tagline}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-10 sm:py-20">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid lg:grid-cols-5 gap-10 sm:gap-14 lg:gap-20">
            {/* Left: Image Gallery + Specs */}
            <div className="lg:col-span-3">
              {/* Image Gallery */}
              <AnimatedSection variant="fadeUp">
                <div className="bg-white rounded-2xl overflow-hidden mb-8">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={product.images[activeImage] || product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3 sm:gap-4 mb-10 sm:mb-14">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-16 h-16 sm:w-22 sm:h-22 rounded-xl overflow-hidden transition-all duration-500 ${
                          activeImage === i
                            ? "ring-2 ring-[#D4AF37] ring-offset-3"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" sizes="88px" />
                      </button>
                    ))}
                  </div>
                )}
              </AnimatedSection>

              {/* Description */}
              <AnimatedSection variant="fadeUp" delay={0.1}>
                <div className="mb-14">
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#071C36] mb-4 sm:mb-5"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    About This Product
                  </h2>
                  <p className="text-[#6B7280] text-lg sm:text-xl leading-[1.8]">{product.description}</p>
                </div>
              </AnimatedSection>

              {/* Specifications */}
              <AnimatedSection variant="fadeUp" delay={0.2}>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#071C36] mb-8"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Specifications
                </h2>
                <div className="bg-white rounded-2xl p-5 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div className="flex justify-between py-4 border-b border-[#F0F3FF]">
                      <span className="text-base text-[#6B7280] uppercase tracking-wider">Origin</span>
                      <span className="text-lg font-semibold text-[#071C36]">{product.origin}</span>
                    </div>
                    <div className="flex justify-between py-4 border-b border-[#F0F3FF]">
                      <span className="text-base text-[#6B7280] uppercase tracking-wider">MOQ</span>
                      <span className="text-lg font-semibold text-[#071C36]">
                        {product.moq} {product.moqUnit}
                      </span>
                    </div>
                    <div className="flex justify-between py-4 border-b border-[#F0F3FF]">
                      <span className="text-base text-[#6B7280] uppercase tracking-wider">Packaging</span>
                      <span className="text-lg font-semibold text-[#071C36]">{product.packaging}</span>
                    </div>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-4 border-b border-[#F0F3FF]">
                        <span className="text-base text-[#6B7280] uppercase tracking-wider">{key}</span>
                        <span className="text-lg font-semibold text-[#071C36]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Inquiry Form */}
            <div className="lg:col-span-2">
              <AnimatedSection variant="slideRight" delay={0.3}>
                <div className="sticky top-32">
                  <div className="bg-[#F0F3FF] rounded-2xl p-5 sm:p-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-7 bg-gradient-to-b from-[#FFE088] to-[#D4AF37] rounded-full" />
                      <h2
                        className="text-2xl font-bold text-[#071C36]"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        Send Inquiry
                      </h2>
                    </div>
                    <p className="text-lg text-[#6B7280] mb-10 ml-5">
                      Interested in this product? Get a quote today.
                    </p>

                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-14"
                      >
                        <div className="w-18 h-18 rounded-full bg-green-100 mx-auto mb-5 flex items-center justify-center">
                          <Check className="w-9 h-9 text-green-600" />
                        </div>
                        <h3
                          className="text-lg font-bold text-[#071C36] mb-2"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          Inquiry Sent!
                        </h3>
                        <p className="text-sm text-[#6B7280]">
                          Our team will get back to you within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                          </motion.div>
                        )}
                        <div>
                          <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                            Country
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.country}
                            onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                            className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400"
                            placeholder="United Kingdom"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                            Quantity
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.quantity}
                            onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
                            className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400"
                            placeholder={`e.g. ${product.moq} ${product.moqUnit}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                            Message
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400 resize-none"
                            placeholder="Tell us about your requirements..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-5 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-500 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 text-base"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-[#241A00]/30 border-t-[#241A00] rounded-full animate-spin" />
                              Sending...
                            </div>
                          ) : (
                            "Send Inquiry"
                          )}
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Trust badges */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                      { icon: Globe, label: "50+ Countries" },
                      { icon: Shield, label: "Certified" },
                      { icon: Truck, label: "Fast Shipping" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="bg-white rounded-xl p-5 text-center hover:-translate-y-1 transition-all duration-500"
                      >
                        <Icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                        <span className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <AnimatedSection>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071C36] mb-10 text-center"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Related Products
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/products/${rp.id}`}>
                    <div className="group bg-[#F9F9FF] rounded-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(7,28,54,0.1)]">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={rp.imageUrl}
                          alt={rp.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-[#071C36] group-hover:text-[#A48300] transition-colors duration-400">
                          {rp.name}
                        </h3>
                        <span className="text-sm text-[#6B7280] mt-2 inline-flex items-center gap-1">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back button */}
      <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-8 sm:py-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#A48300] transition-colors duration-400 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Products
        </Link>
      </div>
    </div>
  );
}
