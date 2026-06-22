"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";

const FAQS = [
  {
    q: "Do I need my car paint code?",
    a: "It helps, but it is not required. You can also bring a fuel cap, colour sample, or painted panel so the colour can be checked and matched.",
  },
  {
    q: "Do you only sell paint?",
    a: "No. TRUECOLOURS also supplies hardeners, thinners, primers, fillers, abrasives, masking products, solvents, polishing products, and workshop supplies.",
  },
  {
    q: "Do you stock 2K products?",
    a: "Yes. We supply 2K paint systems, clearcoats, hardeners, primers, thinners, and related refinish products.",
  },
  {
    q: "Can you help me choose the right thinner or hardener?",
    a: "Yes. Tell us the paint system or product you are using and we will help you choose the correct supporting product.",
  },
  {
    q: "Do you sell body fillers and putties?",
    a: "Yes. We supply body fillers, micro fine stoppers, spray fillers, spot putties, fibreglass fillers, and repair materials.",
  },
  {
    q: "Do you supply masking and sanding products?",
    a: "Yes. We supply masking tape, masking film, sandpaper, sanding discs, abrasives, pads, and related surface preparation products.",
  },
  {
    q: "Can I ask for supplier products by code?",
    a: "Yes. Send us the product code, name, or picture on WhatsApp and we will check availability.",
  },
  {
    q: "Do you show prices online?",
    a: "No. Supplier prices and stock change, so customers should WhatsApp or visit for current pricing.",
  },
  {
    q: "Where are you located?",
    a: "We are at Stand No 01 Ga-Thoka R71, Mankweng, Limpopo. Walk-ins are welcome.",
  },
];

function FAQItem({
  q,
  a,
  index,
  inView,
}: {
  q: string;
  a: string;
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50 md:p-6"
      >
        <span
          className="text-base font-semibold leading-snug text-gray-900"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "1.08rem",
          }}
        >
          {q}
        </span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-50"
        >
          <ChevronDown size={16} className="text-red-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-50 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-500 md:px-6">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
            FAQ
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
            Common Questions
          </h2>

          <p className="text-lg text-gray-500">
            Everything you need to know before your first visit or product enquiry.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 rounded-2xl border border-red-100 bg-red-50 p-6 text-center"
        >
          <p className="mb-3 font-medium text-gray-700">Still have a question?</p>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20TRUECOLOURS%2C%20I%20have%20a%20question%20about%20a%20paint%20or%20refinish%20product`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-green-700 active:scale-95"
          >
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}