"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-red-600">
            Get In Touch
          </span>

          <h2
            className="mb-4 text-gray-900"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Need Paint, Prep Products,
            <br />
            or Workshop Supplies?
          </h2>

          <p className="mx-auto max-w-xl text-lg text-gray-500">
            Send your paint code, panel photo, product code, supplier page, or job requirement
            and we’ll help you get the right product.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative mb-6 overflow-hidden rounded-3xl bg-gray-900 p-8 text-white">
              <div
                className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #E53935 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <img
                    src={siteConfig.images.logo}
                    alt="TC logo"
                    className="h-16 w-48 object-contain object-left"
                  />

                  <div className="sr-only">
                    <div
                      className="text-xl font-black tracking-tight"
                      style={{ fontFamily: "var(--font-barlow-condensed)" }}
                    >
                      TRUECOLOURS
                    </div>

                    <div className="text-xs uppercase tracking-widest text-white/60">
                      Automotive & Industrial Paints
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <MapPin size={16} className="text-red-400" />
                    </div>

                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wide text-white/50">
                        Location
                      </div>

                      <div className="text-sm font-medium leading-relaxed text-white">
                        Stand No 01 Ga-Thoka R71
                        <br />
                        Mankweng, Limpopo
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Phone size={16} className="text-blue-400" />
                    </div>

                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wide text-white/50">
                        Phone / WhatsApp
                      </div>

                      <a
                        href={`tel:${siteConfig.phonePrimaryRaw}`}
                        className="block text-sm font-medium text-white transition-colors hover:text-red-400"
                      >
                        {siteConfig.phonePrimary}
                      </a>

                      <a
                        href={`tel:${siteConfig.phoneSecondaryRaw}`}
                        className="block text-sm font-medium text-white transition-colors hover:text-red-400"
                      >
                        {siteConfig.phoneSecondary}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock size={16} className="text-yellow-400" />
                    </div>

                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wide text-white/50">
                        Enquiries
                      </div>

                      <div className="text-sm font-medium text-white">
                        Walk-in and WhatsApp product support
                      </div>

                      <div className="mt-0.5 text-xs text-white/60">
                        Contact us for current stock and pricing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={`tel:${siteConfig.phonePrimaryRaw}`}
                className="flex flex-col items-center gap-2 rounded-2xl bg-red-600 p-4 text-center font-bold text-white transition-all hover:bg-red-700 active:scale-95"
              >
                <Phone size={20} />
                <span className="text-sm">Call Now</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20TRUECOLOURS%2C%20I%20need%20help%20with%20a%20paint%20or%20refinish%20product`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl bg-green-600 p-4 text-center font-bold text-white transition-all hover:bg-green-700 active:scale-95"
              >
                <MessageCircle size={20} />
                <span className="text-sm">WhatsApp Enquiry</span>
              </a>

              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl bg-blue-700 p-4 text-center font-bold text-white transition-all hover:bg-blue-800 active:scale-95"
              >
                <Navigation size={20} />
                <span className="text-sm">Open Maps</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl"
            style={{ minHeight: "400px" }}
          >
            <iframe
              title="TRUECOLOURS location map"
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-400">
            Prices and stock change. Please WhatsApp or visit the shop for current availability.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
