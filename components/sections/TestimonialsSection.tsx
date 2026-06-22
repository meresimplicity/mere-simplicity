"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const AUTO_PLAY_MS = 5000;
const ease = [0.23, 1, 0.32, 1] as const;
const accentColours = ["#E53935", "#1565C0", "#F9A825", "#2E7D32"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeTestimonial = testimonials[activeIndex];
  const activeAccent = accentColours[activeIndex % accentColours.length];

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  function previousTestimonial() {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }

  function nextTestimonial() {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }

  return (
    <motion.section
      id="testimonials"
      className="relative isolate overflow-hidden bg-[#050608] px-4 py-16 text-white md:py-24 lg:px-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.7, ease }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="pointer-events-none absolute left-[-12%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[#E53935]/25 blur-[120px]"
        animate={{ x: [0, 34, -12, 0], y: [0, -18, 24, 0], scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-14%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-[#1565C0]/28 blur-[130px]"
        animate={{ x: [0, -38, 18, 0], y: [0, 26, -14, 0], scale: [1, 0.96, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#2E7D32]/12 blur-[120px]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.72)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs font-black uppercase tracking-[0.28em] text-white/38">
            Sample customer voices
          </p>
          <h2
            className="mt-4 text-3xl font-black leading-none tracking-normal text-white md:text-5xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            What Customers Say
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Support with colour matching, panel repairs, product advice, and the right supplies for
            the job.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-10 min-h-[330px] max-w-5xl md:mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center lg:flex">
            <motion.button
              type="button"
              onClick={previousTestimonial}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.055] text-white/[0.65] backdrop-blur-xl transition hover:bg-white/[0.1] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </motion.button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center lg:flex">
            <motion.button
              type="button"
              onClick={nextTestimonial}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.055] text-white/[0.65] backdrop-blur-xl transition hover:bg-white/[0.1] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </motion.button>
          </div>

          <div className="mx-auto flex min-h-[330px] max-w-[880px] flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTestimonial.name}
                className="flex w-full flex-col items-center"
                initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.62, ease }}
              >
                <motion.div
                  className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white/75 backdrop-blur-md md:h-12 md:w-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.38, ease }}
                >
                  <Quote size={23} fill="currentColor" strokeWidth={0} />
                </motion.div>

                <motion.blockquote
                  className="mx-auto max-w-[22ch] text-[clamp(1.55rem,3.9vw,3.65rem)] font-extrabold leading-[1.16] tracking-normal text-white sm:max-w-[27ch] lg:max-w-[31ch]"
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-live="polite"
                >
                  {activeTestimonial.quote}
                </motion.blockquote>

                <motion.div
                  className="mt-7 flex flex-col items-center gap-3 sm:flex-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.22, ease }}
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-xs font-black text-white shadow-lg shadow-black/20"
                    style={{
                      background: `linear-gradient(135deg, ${activeAccent}, ${
                        accentColours[(activeIndex + 1) % accentColours.length]
                      })`,
                    }}
                    initial={{ scale: 0.96 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.22, ease }}
                  >
                    {getInitials(activeTestimonial.name)}
                  </motion.div>

                  <div className="text-center sm:text-left">
                    <p className="text-base font-bold text-white">{activeTestimonial.name}</p>
                    <p className="mt-1 text-sm font-medium text-white/[0.46]">
                      {activeTestimonial.role} · {activeTestimonial.location}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:hidden">
            <motion.button
              type="button"
              onClick={previousTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/70 backdrop-blur-xl transition hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={19} />
            </motion.button>
            <motion.button
              type="button"
              onClick={nextTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white/70 backdrop-blur-xl transition hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={19} />
            </motion.button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="h-1.5 rounded-full bg-white/[0.18] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{ width: index === activeIndex ? 34 : 12 }}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-current={index === activeIndex}
              >
                <motion.span
                  className="block h-full rounded-full"
                  animate={{
                    backgroundColor: index === activeIndex ? activeAccent : "rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.3, ease }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
