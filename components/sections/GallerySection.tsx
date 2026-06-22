"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera } from "lucide-react";
import { siteConfig } from "@/config/site";

const GALLERY_ITEMS = [
  {
    img: siteConfig.images.colourMatching,
    title: "Colour Matching",
    desc: "Precision matching with fan decks, samples and paint codes",
    accent: "#E53935",
  },
  {
    img: siteConfig.images.sprayPaint,
    title: "Spray Work",
    desc: "Automotive refinish and professional spray preparation",
    accent: "#1565C0",
  },
  {
    img: siteConfig.images.paintCans,
    title: "Product Range",
    desc: "Automotive paints, primers, thinners and supporting products",
    accent: "#F9A825",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    title: "Surface Preparation",
    desc: "Sanding, filling, masking and repair preparation",
    accent: "#2E7D32",
  },
  {
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80",
    title: "Workshop Supplies",
    desc: "Refinish tools, consumables and professional advice",
    accent: "#7B1FA2",
  },
  {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
    title: "Finished Vehicles",
    desc: "The right colour, preparation and finish on every job",
    accent: "#E65100",
  },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-1.5 w-10 rounded-full bg-green-700" />
              <span className="text-sm font-bold uppercase tracking-widest text-green-700">
                Gallery
              </span>
            </div>

            <h2
              className="text-gray-900"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Colour.
              <br />
              <span style={{ color: "#2E7D32" }}>Craft. Confidence.</span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-relaxed text-gray-500 lg:text-right">
            From colour matching to product supply, prep materials and finished vehicles —
            this is the TRUECOLOURS world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title + i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative cursor-default overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
              style={{ height: "260px" }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to top, ${item.accent}CC 0%, ${item.accent}22 50%, transparent 100%)`,
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-bold text-white"
                  style={{ background: item.accent }}
                >
                  {item.desc}
                </div>

                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-barlow-condensed)" }}
                >
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-2xl border-2 border-dashed border-green-100 bg-green-50 p-6 text-center"
        >
          <Camera size={28} className="mx-auto mb-3 text-green-300" />

          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">Real shop photos coming soon.</strong> Images
            of TRUECOLOURS stock, mixing area, supplier products, shelves and customer vehicles
            will be added here.
          </p>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-bold text-green-700 underline underline-offset-2 hover:text-green-800"
          >
            Send project photos on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}