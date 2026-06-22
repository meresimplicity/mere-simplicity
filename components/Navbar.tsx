"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const NAV_LINKS = [
  { label: "Services", href: "#services", type: "section" },
  { label: "Products", href: "#products", type: "section" },
  { label: "Catalogue", href: "/catalogue", type: "page" },
  { label: "How It Works", href: "#how-it-works", type: "section" },
  { label: "Gallery", href: "#gallery", type: "section" },
  { label: "FAQ", href: "#faq", type: "section" },
  { label: "Contact", href: "#contact", type: "section" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = `/${href}`;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <a
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center"
            >
              <img
                src={siteConfig.images.logo}
                alt="TRUECOLOURS Automotive & Industrial Paints logo"
                className="h-10 w-auto object-contain md:h-12 lg:h-14"
              />
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) =>
                link.type === "page" ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      scrolled
                        ? "text-gray-700 hover:bg-red-50 hover:text-red-600"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      scrolled
                        ? "text-gray-700 hover:bg-red-50 hover:text-red-600"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${siteConfig.phonePrimaryRaw}`}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-95"
              >
                <Phone size={14} />
                Call Now
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 active:scale-95"
              >
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`rounded-lg p-2 transition-colors lg:hidden ${
                scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed left-0 right-0 top-16 z-40 border-b border-gray-100 bg-white/95 shadow-xl backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) =>
                  link.type === "page" ? (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-4 py-3 text-left text-base font-medium text-gray-800 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      {link.label}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      onClick={() => handleNavClick(link.href)}
                      className="rounded-lg px-4 py-3 text-left text-base font-medium text-gray-800 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      {link.label}
                    </motion.button>
                  )
                )}

                <div className="mt-3 flex gap-3 border-t border-gray-100 pt-3">
                  <a
                    href={`tel:${siteConfig.phonePrimaryRaw}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-sm font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Phone size={14} />
                    Call Now
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    WhatsApp
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
