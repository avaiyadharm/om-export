"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Check, Send, AlertCircle } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { founders, companyInfo } from "@/lib/data";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          source: "contact_page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#F9F9FF]">
      {/* Hero Header */}
      <section className="bg-[#071C36] py-14 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />

        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-semibold">
              Let&apos;s Connect
            </span>
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 sm:mt-5 mb-5 sm:mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Get in Touch
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-xl leading-[1.7] sm:leading-[1.8]">
              Connect with our team for export inquiries, partnerships, and product information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-14 sm:py-24">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <AnimatedSection className="text-center mb-8 sm:mb-14">
            <span className="text-[#A48300] text-sm tracking-[0.15em] uppercase font-semibold">
              Our Leadership
            </span>
            <h2
              className="text-xl sm:text-3xl md:text-4xl font-bold text-[#071C36] mt-3 sm:mt-5 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Meet Our Founders
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 max-w-5xl mx-auto">
            {founders.map((founder) => (
              <StaggerItem key={founder.name}>
                <div className="bg-white rounded-2xl p-6 sm:p-10 text-center group hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(7,28,54,0.1)]">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-white text-2xl sm:text-3xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                      {founder.name.charAt(0)}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold text-[#071C36]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {founder.name}
                  </h3>
                  <p className="text-sm text-[#A48300] uppercase tracking-wider font-medium mt-2 mb-4 sm:mb-7">
                    {founder.title}
                  </p>

                  <div className="space-y-5">
                    <a
                      href={`tel:${founder.phone}`}
                      className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base text-[#6B7280] hover:text-[#071C36] transition-colors duration-400"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      {founder.phone}
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base text-[#6B7280] hover:text-[#071C36] transition-colors duration-400"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      {founder.email}
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid lg:grid-cols-5 gap-10 sm:gap-14 lg:gap-20">
            {/* Company Info */}
            <AnimatedSection variant="slideLeft" className="lg:col-span-2">
              <span className="text-[#A48300] text-sm tracking-[0.15em] uppercase font-semibold">
                Contact Information
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#071C36] mt-3 sm:mt-5 mb-8 sm:mb-14"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Let&apos;s Start a
                <br />
                Conversation
              </h2>

              <div className="space-y-6 sm:space-y-10 mb-8 sm:mb-12">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#F0F3FF] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] uppercase tracking-wider mb-2">Email</p>
                    <a
                      href="mailto:omexport291@gmail.com"
                      className="text-lg text-[#071C36] font-medium hover:text-[#A48300] transition-colors duration-400"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#F0F3FF] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] uppercase tracking-wider mb-2">Phone</p>
                    <p className="text-lg text-[#071C36] font-medium">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#F0F3FF] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] uppercase tracking-wider mb-2">Location</p>
                    <p className="text-lg text-[#071C36] font-medium">Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#F0F3FF] flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] uppercase tracking-wider mb-2">
                      Business Hours
                    </p>
                    <p className="text-lg text-[#071C36] font-medium">Mon – Sat, 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection variant="slideRight" delay={0.2} className="lg:col-span-3">
              <div className="bg-[#F0F3FF] rounded-2xl p-6 sm:p-10 md:p-12">
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#071C36] mb-6 sm:mb-10"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Send a Message
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#071C36] mb-3"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-[#6B7280] text-lg">
                      Thank you for reaching out. We&apos;ll respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
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
                    <div className="grid md:grid-cols-2 gap-7">
                      <div>
                        <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400"
                        placeholder="Export inquiry, partnership, etc."
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#6B7280] uppercase tracking-wider font-medium block mb-3">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-5 py-4 bg-white rounded-xl text-base text-[#071C36] outline-none border-2 border-transparent focus:border-[#D4AF37] transition-all duration-400 resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#FFE088] to-[#D4AF37] text-[#241A00] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-500 hover:scale-105 disabled:opacity-70 disabled:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#241A00]/30 border-t-[#241A00] rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-[#F0F3FF] py-12 sm:py-20">
        <div className="w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <AnimatedSection className="text-center">
            <div className="bg-[#DEE8FF] rounded-2xl h-[300px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
                <p className="text-[#071C36] font-bold text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                  Gujarat, India
                </p>
                <p className="text-[#6B7280] text-sm">
                  Serving exporters and importers across the globe
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
