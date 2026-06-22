"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const heroItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.18 + index * 0.12,
      duration: 0.65,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={siteConfig.images.heroBg}
          alt="Colourful paint splashes background"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/25 via-transparent to-blue-900/25" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-24 lg:px-8">
        <div className="max-w-4xl">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="flex max-w-[12ch] flex-col text-white sm:max-w-[13ch] md:max-w-[14ch]"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 900,
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "0",
              textShadow: "0 4px 28px rgba(0,0,0,0.42)",
            }}
          >
            <motion.span custom={0} variants={heroItemVariants}>
              AUTOMOTIVE &
            </motion.span>
            <motion.span
              custom={1}
              variants={heroItemVariants}
              className="bg-gradient-to-r from-[#1565C0] via-[#2E7D32] to-[#F9A825] bg-clip-text text-transparent"
            >
              INDUSTRIAL
            </motion.span>
            <motion.span
              custom={2}
              variants={heroItemVariants}
              className="bg-gradient-to-r from-[#E53935] via-[#F9A825] to-[#2E7D32] bg-clip-text text-transparent"
            >
              PAINTS
            </motion.span>
          </motion.h1>

          <motion.p
            custom={3}
            variants={heroItemVariants}
            initial="hidden"
            animate="visible"
            className="mt-5 text-2xl font-black uppercase leading-none text-yellow-300 md:text-4xl"
            style={{
              fontFamily: "var(--font-inter)",
              letterSpacing: "0",
              textShadow: "0 3px 18px rgba(0,0,0,0.45)",
            }}
          >
            EST 2022
          </motion.p>

          <motion.div
            custom={4}
            variants={heroItemVariants}
            initial="hidden"
            animate="visible"
            className="mt-9 flex"
          >
            <motion.a
              href="#contact"
              className="flex items-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-red-900/35 transition-all duration-200 hover:bg-red-700 active:scale-95"
              whileHover={{ scale: 1.03, boxShadow: "0 18px 34px rgba(229, 57, 53, 0.34)" }}
              whileTap={{ scale: 0.97 }}
            >
              <MapPin size={16} />
              Find Our Store
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
