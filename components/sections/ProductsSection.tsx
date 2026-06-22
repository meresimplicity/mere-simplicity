"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brush, Car, Droplets, Factory, FlaskConical, PackageCheck, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

const PRODUCT_SYSTEMS = [
  {
    icon: Car,
    title: "Automotive Refinish Systems",
    desc: "Basecoat systems, metallic toners, silvers, pearls, 2K systems, primers, hardeners, clearcoats and accessories.",
    accent: "#E53935",
  },
  {
    icon: PackageCheck,
    title: "Commercial Vehicle Refinish",
    desc: "2K twinpack systems, toners, hardeners, primers and durable coatings for trucks, trailers and machinery.",
    accent: "#1565C0",
  },
  {
    icon: ShieldCheck,
    title: "Fillers, Putties & Repair",
    desc: "Body fillers, micro fine stopper, ultra light fillers, fusion filler, fibreglass filler, spray filler and spot putty.",
    accent: "#F9A825",
    darkText: true,
  },
  {
    icon: Factory,
    title: "Protective Coatings",
    desc: "Quick-drying enamels, air-drying enamels, DTM coatings, self-etch primers, road marking paint and industrial finishes.",
    accent: "#2E7D32",
  },
  {
    icon: Brush,
    title: "Wood Finish",
    desc: "Clear lacquers, pigmented lacquers, primers, stains, catalysts, additives, gloss toners and tinted colours.",
    accent: "#7B1FA2",
  },
  {
    icon: Droplets,
    title: "Solvents",
    desc: "300D thinners, lacquer thinners, 2K thinners, enamel thinners, basecoat thinners, acetone, benzine and body prep.",
    accent: "#E65100",
  },
  {
    icon: FlaskConical,
    title: "Refinish Equipment & Supplies",
    desc: "Abrasives, masking products, paint guns, sanding tools, polishing products, colour tools, repair tools and accessories.",
    accent: "#37474F",
  },
];

const PRODUCTS = [
  { name: "Basecoat Systems", bg: "#E53935" },
  { name: "2K Twinpack", bg: "#1565C0" },
  { name: "Clearcoats", bg: "#0097A7" },
  { name: "Primers", bg: "#5D4037" },
  { name: "Hardeners", bg: "#7B1FA2" },
  { name: "Thinners", bg: "#E65100" },
  { name: "Solvents", bg: "#37474F" },
  { name: "Body Fillers", bg: "#C62828" },
  { name: "Spot Putty", bg: "#AD1457" },
  { name: "Spray Filler", bg: "#283593" },
  { name: "Fibreglass Resin", bg: "#00695C" },
  { name: "Protective Coatings", bg: "#2E7D32" },
  { name: "QD Enamel", bg: "#1B5E20" },
  { name: "DTM Coatings", bg: "#4E342E" },
  { name: "Road Marking Paint", bg: "#F9A825" },
  { name: "Wood Lacquers", bg: "#6D4C41" },
  { name: "Abrasives", bg: "#455A64" },
  { name: "Sandpaper", bg: "#263238" },
  { name: "Masking Tape", bg: "#FBC02D" },
  { name: "Masking Film", bg: "#0288D1" },
  { name: "Paint Strainers", bg: "#00897B" },
  { name: "Paint Guns", bg: "#3949AB" },
  { name: "Polishes", bg: "#8E24AA" },
  { name: "Compounds", bg: "#D84315" },
  { name: "Dust Masks", bg: "#607D8B" },
  { name: "Tack Rags", bg: "#5D4037" },
  { name: "Colour Tools", bg: "#E53935" },
  { name: "Workshop Accessories", bg: "#111827" },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="products" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div
              className="absolute -left-4 -top-4 h-2/3 w-2/3 rounded-3xl"
              style={{ background: "#1565C0", zIndex: 0 }}
            />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ zIndex: 1 }}>
              <img
                src={siteConfig.images.paintCans}
                alt="TRUECOLOURS paint products"
                className="h-80 w-full object-cover lg:h-[480px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2">
                  {["Basecoats", "2K Systems", "Hardeners", "Thinners"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl lg:-right-8"
              style={{ zIndex: 2 }}
            >
              <div className="text-center">
                <div
                  className="text-5xl font-black leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    color: "#1565C0",
                  }}
                >
                  7+
                </div>

                <div className="mt-1 text-xs font-medium text-gray-500">
                  Refinish Systems
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="mb-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1.5 w-10 rounded-full bg-blue-700" />
                <span className="text-sm font-bold uppercase tracking-widest text-blue-700">
                  Product Range
                </span>
              </div>

              <h2
                className="mb-4 text-gray-900"
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontWeight: 900,
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                Product Systems
                <br />
                <span style={{ color: "#1565C0" }}>We Supply</span>
              </h2>

              <p className="text-base leading-relaxed text-gray-500">
                We stock and source products for the full refinishing workflow — from colour
                and coating systems to prep, masking, sanding, polishing and workshop consumables.
              </p>

              <p
                className="mt-4 text-xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                Paint. Prep. Protect. Finish. All through TRUECOLOURS.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.025,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="cursor-default rounded-xl px-4 py-2.5 text-sm font-bold transition-shadow hover:shadow-lg"
                  style={{
                    color:
                      product.name === "Masking Tape" ||
                      product.name === "Road Marking Paint"
                        ? "#111"
                        : "white",
                    background: product.bg,
                  }}
                >
                  {product.name}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <div className="flex flex-wrap gap-3">
                <a
                  href="/catalogue"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-gray-800 active:scale-95"
                >
                  View Full Catalogue
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20TRUECOLOURS%2C%20I%20need%20a%20current%20price%20or%20stock%20check%20for%20a%20product`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 active:scale-95"
                >
                  Ask About Current Stock
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_SYSTEMS.map((system, i) => {
            const Icon = system.icon;
            const textColor = system.darkText ? "#111111" : "white";
            const muted = system.darkText ? "rgba(0,0,0,0.62)" : "rgba(255,255,255,0.72)";

            return (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="relative overflow-hidden rounded-2xl p-6"
                style={{ background: system.accent }}
              >
                <div
                  className="pointer-events-none absolute -bottom-5 -right-2 select-none text-[7rem] font-black leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    color: system.darkText ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.09)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: system.darkText ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)",
                  }}
                >
                  <Icon size={20} color={textColor} />
                </div>

                <h3
                  className="relative z-10 mb-2 text-xl font-black leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    color: textColor,
                  }}
                >
                  {system.title}
                </h3>

                <p className="relative z-10 text-sm leading-relaxed" style={{ color: muted }}>
                  {system.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
