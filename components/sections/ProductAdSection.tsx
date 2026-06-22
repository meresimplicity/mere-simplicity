"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const FEATURED_PRODUCTS = [
  {
    name: "2K Fast Hardener",
    size: "1L & 5L",
    img: siteConfig.productImages.fastHardener2k,
    tag: "Fast mover",
    accent: "#E53935",
  },
  {
    name: "2K Clear Coat",
    size: "1L & 5L",
    img: siteConfig.productImages.clearCoat2k,
    tag: "Gloss finish",
    accent: "#1565C0",
  },
  {
    name: "Body Filler",
    size: "1kg & 5kg",
    img: siteConfig.productImages.bodyFiller,
    tag: "Panel repair",
    accent: "#F9A825",
  },
  {
    name: "Primers",
    size: "Surface prep",
    img: siteConfig.productImages.primers,
    tag: "Prep essential",
    accent: "#2E7D32",
  },
];

const PRODUCT_PILLS = [
  "2K Fast Hardener",
  "2K Clear Coat",
  "Body Filler",
  "Primers",
  "Masking Tapes",
  "Stone Chip",
  "Sandpaper",
  "Production Paper",
  "Thinners",
  "Luxline Black",
];

type FeaturedProduct = (typeof FEATURED_PRODUCTS)[number];

export default function ProductAdSection() {
  const shouldReduceMotion = useReducedMotion();
  const floatMotion = shouldReduceMotion ? { y: 0 } : { y: [0, -12, 0] };
  const stripMotion = shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] };

  function FloatingProduct({
    product,
    large = false,
  }: {
    product: FeaturedProduct;
    large?: boolean;
  }) {
    return (
      <motion.article
        animate={floatMotion}
        transition={{ duration: large ? 5.8 : 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -16, scale: 1.03 }}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] shadow-2xl backdrop-blur-xl"
      >
        <div className={large ? "relative h-[270px]" : "relative h-[220px]"}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(180deg, ${product.accent}33, transparent 60%)`,
            }}
          />

          <Image
            src={product.img}
            alt={product.name}
            fill
            sizes={large ? "310px" : "270px"}
            className="object-contain p-5"
          />

          <div
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black text-white"
            style={{ background: product.accent }}
          >
            {product.tag}
          </div>
        </div>

        <div className="border-t border-white/10 p-5">
          <h3
            className="text-2xl font-black leading-none tracking-normal text-white"
            style={{ fontFamily: "var(--font-barlow-condensed)" }}
          >
            {product.name}
          </h3>

          <p className="mt-1 text-sm font-semibold text-white/45">{product.size}</p>
        </div>
      </motion.article>
    );
  }

  function FloatingPill({
    text,
    color,
    className,
  }: {
    text: string;
    color: string;
    className: string;
  }) {
    return (
      <motion.div
        animate={shouldReduceMotion ? { y: 0, rotate: 0 } : { y: [0, -12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute hidden rounded-full px-5 py-2 text-xs font-black uppercase tracking-normal text-gray-950 shadow-xl md:block ${className}`}
        style={{ background: color }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#05070d] py-20 text-white md:py-28">
      <Image
        src={siteConfig.productImages.productBanner}
        alt="TRUECOLOURS popular refinish products"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.15]"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,7,13,0.98) 0%, rgba(5,7,13,0.9) 44%, rgba(5,7,13,0.76) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(135deg, rgba(229,57,53,0.22), transparent 26%, rgba(21,101,192,0.18) 62%, transparent)",
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none text-[18vw] font-black leading-none tracking-normal text-white/[0.035] md:block"
        style={{ fontFamily: "var(--font-barlow-condensed)" }}
      >
        FINISH
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Popular shop products
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="text-5xl font-black leading-none tracking-normal md:text-7xl"
              style={{ fontFamily: "var(--font-barlow-condensed)" }}
            >
              Most Asked For.
              <br />
              <span className="text-red-400">Ready for the Job.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
            >
              Hardeners, clearcoats, primers, fillers, masking tapes, thinners, sandpaper and
              protective products - available through TRUECOLOURS. Ask for current stock and
              pricing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hi TRUECOLOURS, I want to ask about popular products."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-green-950/30 transition hover:bg-green-700 active:scale-95"
              >
                <MessageCircle size={17} />
                WhatsApp Product Enquiry
              </a>

              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-gray-950 transition hover:bg-gray-100 active:scale-95"
              >
                <BookOpen size={17} />
                Open Catalogue
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {FEATURED_PRODUCTS.map((product) => (
                <FloatingProduct key={product.name} product={product} />
              ))}
            </div>

            <div className="relative hidden min-h-[560px] lg:block">
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -8 }}
                whileInView={{ opacity: 1, y: 0, rotate: -8 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="absolute left-0 top-28 w-[270px]"
              >
                <FloatingProduct product={FEATURED_PRODUCTS[0]} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="absolute left-[34%] top-0 w-[310px]"
              >
                <FloatingProduct product={FEATURED_PRODUCTS[1]} large />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 7 }}
                whileInView={{ opacity: 1, y: 0, rotate: 7 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: 0.34, ease: [0.23, 1, 0.32, 1] }}
                className="absolute right-0 top-40 w-[270px]"
              >
                <FloatingProduct product={FEATURED_PRODUCTS[2]} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: 0.46, ease: [0.23, 1, 0.32, 1] }}
                className="absolute bottom-0 left-[28%] w-[300px]"
              >
                <FloatingProduct product={FEATURED_PRODUCTS[3]} />
              </motion.div>

              <FloatingPill text="PREP" className="left-[8%] top-2" color="#F9A825" />
              <FloatingPill text="CLEARCOAT" className="right-[8%] top-8" color="#1565C0" />
              <FloatingPill text="FILLERS" className="right-[20%] bottom-20" color="#E53935" />
              <FloatingPill text="STOCK CHECK" className="left-[4%] bottom-24" color="#2E7D32" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 overflow-hidden rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-gray-950">
              <Sparkles size={16} />
              Popular Products
            </div>

            <div className="relative flex-1 overflow-hidden">
              <motion.div
                className="flex w-max gap-3"
                animate={stripMotion}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              >
                {[...PRODUCT_PILLS, ...PRODUCT_PILLS].map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-normal text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
