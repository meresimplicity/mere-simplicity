"use client";

import { MapPin, Phone } from "lucide-react";
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

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5 inline-flex rounded-2xl bg-white p-3 shadow-lg">
              <img
                src={siteConfig.images.logo}
                alt="TRUECOLOURS logo"
                className="h-14 w-auto object-contain md:h-16"
              />
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Professional paint colour matching, automotive refinish systems, 2K products,
              primers, hardeners, thinners, fillers, abrasives, masking and workshop supplies.
              Serving Mankweng and Limpopo since 2022.
            </p>
          </div>

          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-widest text-white"
              style={{ fontFamily: "var(--font-barlow-condensed)" }}
            >
              Quick Links
            </h4>

            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) =>
                link.type === "page" ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-left text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>
          </div>

          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-widest text-white"
              style={{ fontFamily: "var(--font-barlow-condensed)" }}
            >
              Contact
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-red-400" />
                <span className="text-sm leading-relaxed text-white/50">
                  Stand No 01 Ga-Thoka R71
                  <br />
                  Mankweng, Limpopo
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={14} className="flex-shrink-0 text-blue-400" />

                <div className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${siteConfig.phonePrimaryRaw}`}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {siteConfig.phonePrimary}
                  </a>

                  <a
                    href={`tel:${siteConfig.phoneSecondaryRaw}`}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {siteConfig.phoneSecondary}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={`tel:${siteConfig.phonePrimaryRaw}`}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700"
              >
                Call
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-green-700"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row lg:px-8">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} TRUECOLOURS. Automotive & Industrial Paints.
            Mankweng, Limpopo.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["Paint Matching", "2K Systems", "Fillers", "Abrasives", "Industrial Coatings"].map(
              (tag) => (
                <span key={tag} className="text-xs text-white/20">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
