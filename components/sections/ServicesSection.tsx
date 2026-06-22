"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Disc, Droplets, Factory, FlaskConical, Layers, Palette, Truck, Wrench } from "lucide-react";

const SERVICES = [
  {
    icon: Palette,
    title: "Paint Colour Matching",
    desc: "Match vehicle colours using paint codes, samples, fuel caps, or body panels.",
    bg: "#E53935",
  },
  {
    icon: Layers,
    title: "Automotive Refinish Paints",
    desc: "Basecoats, 2K systems, toners, clearcoats, primers, hardeners, and thinners.",
    bg: "#1565C0",
  },
  {
    icon: Truck,
    title: "Commercial Vehicle Coatings",
    desc: "Paint systems for trucks, trailers, machinery, equipment, and fleet work.",
    bg: "#F9A825",
  },
  {
    icon: FlaskConical,
    title: "Fillers & Putties",
    desc: "Body fillers, micro fine stoppers, spray fillers, spot putties, and fibreglass fillers.",
    bg: "#2E7D32",
  },
  {
    icon: Factory,
    title: "Protective & Industrial Coatings",
    desc: "QD enamels, DTM coatings, self-etch primers, road marking paints, and protective coatings.",
    bg: "#7B1FA2",
  },
  {
    icon: Droplets,
    title: "Solvents & Thinners",
    desc: "300D thinners, lacquer thinners, 2K thinners, enamel thinners, basecoat thinners, and body prep.",
    bg: "#E65100",
  },
  {
    icon: Disc,
    title: "Abrasives & Surface Prep",
    desc: "Sandpaper, sanding discs, sponges, pads, compounds, and surface preparation tools.",
    bg: "#37474F",
  },
  {
    icon: Wrench,
    title: "Masking & Workshop Supplies",
    desc: "Masking tape, masking film, paint strainers, tack rags, dust masks, and accessories.",
    bg: "#111827",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-1.5 w-10 rounded-full bg-red-600" />
              <span className="text-sm font-bold uppercase tracking-widest text-red-600">
                What We Supply
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
              Everything for the Job.
              <br />
              <span style={{ color: "#E53935" }}>From Prep to Finish.</span>
            </h2>
          </div>

          <p className="max-w-sm text-base leading-relaxed text-gray-500 lg:text-right">
            From paint matching to refinish systems, fillers, solvents, masking, abrasives and
            workshop supplies — TRUECOLOURS helps you complete the full job.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isDark = service.bg !== "#F9A825";

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative cursor-default overflow-hidden rounded-2xl p-6 transition-all duration-300"
                style={{ background: service.bg }}
              >
                <div
                  className="pointer-events-none absolute -bottom-4 -right-3 select-none text-[7rem] font-black leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    color: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                  }}
                >
                  <Icon size={20} color={isDark ? "white" : "#333"} />
                </div>

                <h3
                  className="mb-2 text-lg leading-tight"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontWeight: 700,
                    color: isDark ? "white" : "#111",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
                  }}
                >
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}