"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Filter,
  MessageCircle,
  Minus,
  PackageSearch,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import {
  catalogueCategories,
  catalogueDisclaimers,
  catalogueProducts,
  type CatalogueCategory,
  type CatalogueProduct,
} from "@/data/catalogue";
import {
  getCatalogueProductImage,
  getCatalogueProductImageAlt,
  getCatalogueProductImages,
} from "@/data/catalogueImageResolver";
import { ProductImage } from "@/components/catalogue/ProductImage";
import { siteConfig } from "@/config/site";

type Product = CatalogueProduct;
type CartItem = {
  id: string;
  name: string;
  category?: string;
  supplier?: string;
  brand?: string;
  image?: string;
  quantity: number;
};

const ALL = "All";
const CATALOGUE_TITLE = "Catalogue";
const CART_STORAGE_KEY = "truecolours-enquiry-cart";

const catalogueLetterVariants = {
  hidden: {
    opacity: 0,
    y: -64,
    rotateX: -16,
    scale: 1.06,
    filter: "blur(7px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.12 + index * 0.055,
      type: "spring",
      stiffness: 175,
      damping: 19,
      mass: 0.82,
    },
  }),
};

function unique(values: string[]) {
  return Array.from(new Set(values)).filter(Boolean).sort();
}

function uniqueImages(values: (string | undefined)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[]));
}

function productSearchText(product: Product) {
  return [
    product.name,
    product.category,
    product.filter,
    product.subcategory,
    product.supplier,
    product.brand,
    product.code,
    product.size,
    product.colour,
    product.source,
    ...product.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function productLabel(product: Product) {
  return [
    product.name,
    product.code ? `code ${product.code}` : null,
    product.size ? product.size : null,
    product.colour ? product.colour : null,
  ]
    .filter(Boolean)
    .join(" - ");
}

function cartItemMessageLines(item: CartItem, index: number) {
  const lines = [
    `${index + 1}. ${item.name}`,
    `Quantity: ${item.quantity}`,
    `Category: ${item.category || "Catalogue product"}`,
    `Supplier: ${item.supplier || "TRUECOLOURS"}`,
  ];

  if (item.brand) {
    lines.push(`Brand: ${item.brand}`);
  }

  lines.push("");
  return lines;
}

function useMobileDrawerMotion() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function CatalogueClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [supplier, setSupplier] = useState(ALL);
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(
    () => [ALL, ...unique(catalogueProducts.map((product) => product.category))],
    []
  );

  const suppliers = useMemo(
    () => [ALL, ...unique(catalogueProducts.map((product) => product.supplier))],
    []
  );

  const categoryMeta = useMemo(() => {
    return new Map(catalogueCategories.map((item) => [item.title, item]));
  }, []);

  const filteredProducts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return catalogueProducts.filter((product) => {
      const matchesQuery =
        cleanQuery.length === 0 || productSearchText(product).includes(cleanQuery);
      const matchesCategory = category === ALL || product.category === category;
      const matchesSupplier = supplier === ALL || product.supplier === supplier;

      return matchesQuery && matchesCategory && matchesSupplier;
    });
  }, [query, category, supplier]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce<Record<string, Product[]>>((groups, product) => {
      groups[product.category] = groups[product.category] ?? [];
      groups[product.category].push(product);
      return groups;
    }, {});
  }, [filteredProducts]);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartItem[];

        if (Array.isArray(parsedCart)) {
          setCartItems(
            parsedCart
              .filter((item) => item?.id && item?.name)
              .map((item) => ({
                ...item,
                quantity: Math.max(1, Number(item.quantity) || 1),
              }))
          );
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setCartReady(true);
    }
  }, []);

  useEffect(() => {
    if (!cartReady) return;

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, cartReady]);

  const cartQuantities = useMemo(() => {
    return cartItems.reduce<Record<string, number>>((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
    }, {});
  }, [cartItems]);

  const totalSelectedProducts = cartItems.length;
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const whatsappText =
    cartItems.length > 0
      ? [
          "Hi TRUECOLOURS, I would like to enquire about these products:",
          "",
          ...cartItems.flatMap(cartItemMessageLines),
          "Please confirm current stock and pricing.",
        ].join("\n")
      : "Hi TRUECOLOURS, I want to ask about a catalogue product. I can send the product name, code, picture, or job requirement.";

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    whatsappText
  )}`;

  const addToCart = (product: Product) => {
    const image = getCatalogueProductImage(product);

    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1, image } : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          supplier: product.supplier,
          brand: product.brand,
          image,
          quantity: 1,
        },
      ];
    });

    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1200);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory(ALL);
    setSupplier(ALL);
  };

  const categoryAccent = (item: string) => categoryMeta.get(item)?.accent ?? "#111827";
  const hasActiveFilters = query.trim().length > 0 || category !== ALL || supplier !== ALL;
  const visibleGroupCount = Object.keys(groupedProducts).length;

  return (
    <div className="bg-white text-gray-950">
      <section className="relative flex min-h-[54vh] items-center overflow-hidden pt-24 text-white sm:min-h-[58vh] md:pt-28 lg:min-h-[64vh]">
        <div className="absolute inset-0">
          <img
            src={siteConfig.images.heroBg}
            alt="Colourful TRUECOLOURS paint splash background"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/48" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/12 to-black/46" />
        </div>

        <div className="container relative z-10 mx-auto flex max-w-7xl items-center justify-center px-4 py-20 text-center lg:px-8 lg:py-24">
          <motion.h1
            aria-label={CATALOGUE_TITLE}
            initial="hidden"
            animate="visible"
            className="max-w-full whitespace-nowrap font-black leading-none text-white"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(3.7rem, 14vw, 12rem)",
              letterSpacing: "0",
              perspective: 900,
            }}
          >
            {Array.from(CATALOGUE_TITLE).map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                aria-hidden="true"
                custom={index}
                variants={catalogueLetterVariants}
                className="inline-block origin-bottom will-change-transform"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.18)",
                  textShadow:
                    "0 7px 0 rgba(229,57,53,0.22), 0 18px 44px rgba(0,0,0,0.54), 0 -1px 20px rgba(249,168,37,0.22)",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-gray-200 bg-white/92 px-4 py-4 shadow-sm backdrop-blur-xl md:top-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, codes, suppliers, sizes or job type..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-semibold text-gray-900 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen((current) => !current)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-black text-gray-700 transition hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
              <ChevronDown
                size={16}
                className={`transition ${mobileFiltersOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`grid gap-3 lg:flex lg:items-center ${
                mobileFiltersOpen ? "grid" : "hidden lg:flex"
              }`}
            >
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === ALL ? "All categories" : item}
                  </option>
                ))}
              </select>

              <select
                value={supplier}
                onChange={(event) => setSupplier(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
              >
                {suppliers.map((item) => (
                  <option key={item} value={item}>
                    {item === ALL ? "All suppliers" : item}
                  </option>
                ))}
              </select>

              <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-950 px-4 py-3 text-sm font-black text-white">
                <PackageSearch size={16} />
                {filteredProducts.length} of {catalogueProducts.length}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-black text-red-700 transition hover:bg-red-100"
                >
                  <X size={15} />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="catalogue-products" className="bg-gray-50 px-4 py-10 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-36 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
              <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-2 text-sm font-black text-gray-950">
                  <Filter size={16} className="text-red-600" />
                  Browse Catalogue
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  Filter the product reference by TRUECOLOURS supply section.
                </p>
              </div>

              <div className="max-h-[58vh] space-y-1 overflow-y-auto p-3">
                {categories.map((item) => {
                  const active = category === item;
                  const count =
                    item === ALL
                      ? catalogueProducts.length
                      : catalogueProducts.filter((product) => product.category === item).length;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${
                        active
                          ? "text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                      }`}
                      style={active ? { backgroundColor: categoryAccent(item) } : undefined}
                    >
                      <span>{item}</span>
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs ${
                          active ? "bg-white/18 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 p-4">
                <div className="rounded-xl bg-red-50 p-4">
                  <div className="text-sm font-black text-red-700">No online prices</div>
                  <p className="mt-1 text-xs leading-relaxed text-red-700/70">
                    Ask TRUECOLOURS for current stock and pricing before ordering.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div>
            {totalSelectedProducts > 0 && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-lg shadow-gray-200/60">
                <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h2
                      className="text-3xl font-black leading-none text-gray-950"
                      style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
                    >
                      My Product Enquiry
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {totalSelectedProducts} products selected, {totalQuantity} total quantity.
                      Prices and stock will be confirmed by TRUECOLOURS.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCartOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
                    >
                      <ShoppingCart size={16} />
                      Review Cart
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
                    >
                      <MessageCircle size={16} />
                      Send WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-1.5 w-10 rounded-full bg-blue-700" />
                  <span className="text-sm font-bold uppercase tracking-widest text-blue-700">
                    Product Index
                  </span>
                </div>

                <h2
                  className="text-4xl font-black leading-none text-gray-950 md:text-5xl"
                  style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
                >
                  Searchable supplier references
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Showing {visibleGroupCount} grouped sections with live search and filters.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-gray-200 transition hover:bg-gray-800"
              >
                <ShoppingCart size={17} />
                My Enquiry
                {totalSelectedProducts > 0 && (
                  <span className="rounded-lg bg-red-600 px-2 py-0.5 text-xs text-white">
                    {totalSelectedProducts}
                  </span>
                )}
              </button>
            </div>

            <div className="space-y-5">
              {Object.entries(groupedProducts).map(([groupName, products]) => (
                <CatalogueGroup
                  key={groupName}
                  groupName={groupName}
                  meta={categoryMeta.get(groupName)}
                  products={products}
                  openProductId={openProductId}
                  setOpenProductId={setOpenProductId}
                  cartQuantities={cartQuantities}
                  recentlyAddedId={recentlyAddedId}
                  addToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-lg shadow-gray-200/50">
                <PackageSearch size={42} className="mx-auto mb-3 text-gray-300" />
                <h3
                  className="text-3xl font-black text-gray-950"
                  style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
                >
                  No products found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try a simpler word like paint, thinner, masking, filler, pad, gun or primer.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 pb-16 pt-2 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-950 p-6 text-white shadow-2xl md:p-8">
          <img
            src="/images/products/product-banner.webp"
            alt="TRUECOLOURS product range"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/88 to-gray-950/55" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2
                className="text-4xl font-black leading-none md:text-5xl"
                style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
              >
                Looking for a specific product?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/66">
                Send us the product name, supplier brand, product code, picture, catalogue page or
                the job you are doing. TRUECOLOURS will help confirm the correct product, current
                stock and pricing.
              </p>
            </div>

            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-sm font-black text-white transition hover:bg-red-700"
              >
                <MessageCircle size={18} />
                WhatsApp Product Enquiry
              </a>

              <div className="mt-4 space-y-2">
                {catalogueDisclaimers.map((line) => (
                  <div key={line} className="flex gap-2 text-xs leading-relaxed text-white/58">
                    <AlertTriangle size={14} className="mt-0.5 flex-shrink-0 text-amber-300" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingEnquiryButton
        totalSelectedProducts={totalSelectedProducts}
        totalQuantity={totalQuantity}
        onOpen={() => setCartOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        cartItems={cartItems}
        totalSelectedProducts={totalSelectedProducts}
        totalQuantity={totalQuantity}
        whatsappUrl={whatsappUrl}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  );
}

function FloatingEnquiryButton({
  totalSelectedProducts,
  totalQuantity,
  onOpen,
}: {
  totalSelectedProducts: number;
  totalQuantity: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-24 right-5 z-50 inline-flex items-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-black text-white shadow-2xl shadow-gray-950/25 transition hover:bg-gray-800 md:bottom-6 md:right-24"
      aria-label={`Open product enquiry cart with ${totalSelectedProducts} selected products`}
    >
      <ShoppingCart size={18} />
      <span>My Enquiry</span>
      <span className="rounded-xl bg-red-600 px-2 py-0.5 text-xs text-white">
        {totalSelectedProducts}
      </span>
      {totalQuantity > 0 && (
        <span className="hidden rounded-xl bg-white/12 px-2 py-0.5 text-xs text-white/80 sm:inline">
          Qty {totalQuantity}
        </span>
      )}
    </motion.button>
  );
}

function CartDrawer({
  open,
  cartItems,
  totalSelectedProducts,
  totalQuantity,
  whatsappUrl,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: {
  open: boolean;
  cartItems: CartItem[];
  totalSelectedProducts: number;
  totalQuantity: number;
  whatsappUrl: string;
  onClose: () => void;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
}) {
  const isMobileDrawer = useMobileDrawerMotion();
  const drawerMotion = isMobileDrawer
    ? {
        initial: { opacity: 0, y: 84 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 84 },
      }
    : {
        initial: { opacity: 0, x: 84 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 84 },
      };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close product enquiry cart"
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="My Product Enquiry"
            initial={drawerMotion.initial}
            animate={drawerMotion.animate}
            exit={drawerMotion.exit}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88vh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:h-full md:max-h-none md:w-[460px] md:rounded-l-2xl md:rounded-tr-none"
          >
            <div className="border-b border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    className="text-4xl font-black leading-none text-gray-950"
                    style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
                  >
                    My Product Enquiry
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Review your selected products before sending them to TRUECOLOURS for current
                    stock and pricing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                  aria-label="Close product enquiry cart"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                  <ShoppingCart size={38} className="mx-auto mb-3 text-gray-300" />
                  <h3
                    className="text-3xl font-black text-gray-950"
                    style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
                  >
                    No products selected
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Add catalogue products to build an enquiry before sending it to TRUECOLOURS.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[56px_1fr] gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      <ProductImage
                        src={item.image}
                        alt={`${item.name} product image`}
                        className="h-14 w-14 shrink-0 rounded-xl"
                      />

                      <div className="min-w-0">
                        <h3
                          className="text-xl font-black leading-tight text-gray-950 sm:text-2xl"
                          style={{
                            fontFamily: "var(--font-barlow-condensed)",
                            letterSpacing: "0",
                          }}
                        >
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-gray-500">
                          {[item.brand, item.supplier].filter(Boolean).join(" / ") ||
                            "TRUECOLOURS"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {item.category || "Catalogue product"}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                            <button
                              type="button"
                              onClick={() => onDecrease(item.id)}
                              disabled={item.quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-10 px-2 text-center text-sm font-black text-gray-950">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onIncrease(item.id)}
                              className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:bg-white"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-700 transition hover:bg-red-100"
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-5">
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <div className="text-[10px] font-black uppercase text-gray-400">
                    Products selected
                  </div>
                  <div className="mt-1 text-2xl font-black text-gray-950">
                    {totalSelectedProducts}
                  </div>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <div className="text-[10px] font-black uppercase text-gray-400">
                    Total quantity
                  </div>
                  <div className="mt-1 text-2xl font-black text-gray-950">{totalQuantity}</div>
                </div>
              </div>

              <p className="mb-4 rounded-xl bg-yellow-50 p-3 text-xs font-bold leading-relaxed text-yellow-900">
                Prices and stock will be confirmed by TRUECOLOURS.
              </p>

              <div className="grid gap-2">
                {cartItems.length > 0 && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
                  >
                    <MessageCircle size={16} />
                    Send on WhatsApp
                  </a>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onClear}
                    disabled={cartItems.length === 0}
                    className="rounded-xl bg-red-50 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Clear Cart
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl bg-gray-950 px-5 py-3 text-sm font-black text-white transition hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CatalogueGroup({
  groupName,
  meta,
  products,
  openProductId,
  setOpenProductId,
  cartQuantities,
  recentlyAddedId,
  addToCart,
}: {
  groupName: string;
  meta?: CatalogueCategory;
  products: Product[];
  openProductId: string | null;
  setOpenProductId: (id: string | null) => void;
  cartQuantities: Record<string, number>;
  recentlyAddedId: string | null;
  addToCart: (product: Product) => void;
}) {
  const [open, setOpen] = useState(true);
  const subcategories = unique(products.map((product) => product.subcategory));
  const accent = meta?.accent ?? "#1565c0";
  const previewImages = uniqueImages(
    products.map((product) => getCatalogueProductImage(product))
  ).slice(0, 3);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-50"
      >
        <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />

        <div>
          <div className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
            {products.length} products
          </div>

          <h2
            className="mt-1 text-3xl font-black leading-none text-gray-950"
            style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
          >
            {groupName}
          </h2>

          <p className="mt-2 max-w-3xl text-sm text-gray-500">
            {meta?.description ??
              `${subcategories.slice(0, 4).join(", ")}${
                subcategories.length > 4 ? ` + ${subcategories.length - 4} more` : ""
              }`}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <CatalogueGroupPreview images={previewImages} groupName={groupName} />

          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: accent }}
          >
            <ChevronDown size={22} className={`transition ${open ? "rotate-180" : ""}`} />
          </span>
        </div>
      </button>

      {open && (
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              open={openProductId === product.id}
              onToggle={() =>
                setOpenProductId(openProductId === product.id ? null : product.id)
              }
              quantity={cartQuantities[product.id] ?? 0}
              recentlyAdded={recentlyAddedId === product.id}
              onAdd={() => addToCart(product)}
              accent={accent}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CatalogueGroupPreview({ images, groupName }: { images: string[]; groupName: string }) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="hidden -space-x-2 sm:flex" aria-label={`${groupName} product images`}>
      {images.map((imageUrl, index) => (
        <span key={`${imageUrl}-${index}`} className="relative">
          <ProductImage
            src={imageUrl}
            alt=""
            className="h-12 w-12 rounded-xl border-2 border-white"
          />
          <span className="sr-only">
            {groupName} product preview {index + 1}
          </span>
        </span>
      ))}
    </div>
  );
}

function ProductRow({
  product,
  open,
  onToggle,
  quantity,
  recentlyAdded,
  onAdd,
  accent,
}: {
  product: Product;
  open: boolean;
  onToggle: () => void;
  quantity: number;
  recentlyAdded: boolean;
  onAdd: () => void;
  accent: string;
}) {
  const imageUrl = getCatalogueProductImage(product);
  const productImages = getCatalogueProductImages(product);
  const isInCart = quantity > 0;
  const productMessage = `Hi TRUECOLOURS, I want to ask about ${productLabel(
    product
  )}. Please confirm current stock and pricing.`;

  return (
    <article className="bg-white transition hover:bg-gray-50/70">
      <div className="grid grid-cols-[96px_1fr] gap-4 p-4 md:grid-cols-[112px_1fr_auto] md:items-center">
        <ProductImage
          src={imageUrl}
          alt={getCatalogueProductImageAlt(product)}
          className="h-24 w-24 shrink-0 md:h-28 md:w-28"
        />

        <button type="button" onClick={onToggle} className="text-left">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
              {product.subcategory}
            </span>

            {product.brand && (
              <span
                className="rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: accent }}
              >
                {product.brand}
              </span>
            )}
          </div>

          <h3
            className="text-2xl font-black leading-none text-gray-950"
            style={{ fontFamily: "var(--font-barlow-condensed)", letterSpacing: "0" }}
          >
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {product.supplier}
            {product.code ? ` - Code: ${product.code}` : ""}
            {product.size ? ` - Size: ${product.size}` : ""}
          </p>

          <p className="mt-2 inline-flex rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
            Available through TRUECOLOURS
          </p>
        </button>

        <div className="col-span-2 flex flex-wrap gap-2 md:col-span-1 md:justify-end">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-black text-gray-700 transition hover:bg-gray-50"
          >
            <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
            View Details
          </button>

          <button
            type="button"
            onClick={onAdd}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${
              recentlyAdded || isInCart
                ? "bg-green-50 text-green-700"
                : "bg-gray-950 text-white hover:bg-gray-800"
            }`}
          >
            {recentlyAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
            {recentlyAdded ? "Added" : isInCart ? `Add (${quantity})` : "Add"}
          </button>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              productMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-green-500 bg-green-50 px-4 py-2.5 text-xs font-black text-green-700 transition hover:bg-green-100"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white px-4 py-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(260px,360px)_1fr]">
            <div>
              <ProductImage
                src={imageUrl}
                alt={getCatalogueProductImageAlt(product)}
                className="mx-auto h-72 w-full max-w-md"
              />

              {productImages.length > 1 && (
                <div
                  className="mx-auto mt-3 flex max-w-md flex-wrap justify-center gap-2"
                  aria-label={`${product.name} image gallery`}
                >
                  {productImages.map((galleryImage, index) => (
                    <ProductImage
                      key={`${galleryImage}-${index}`}
                      src={galleryImage}
                      alt={`${product.name} product image ${index + 1}`}
                      className="h-16 w-16 rounded-xl"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-4">
                <Info label="Category" value={product.category} />
                <Info label="Subcategory" value={product.subcategory} />
                <Info label="Supplier" value={product.supplier} />
                <Info label="Brand" value={product.brand || "Not specified"} />
                <Info label="Code" value={product.code || "Ask in-store"} />
                <Info label="Size" value={product.size || "Ask in-store"} />
                <Info label="Supplier product reference" value={product.source || "Supplier range"} />
                <Info label="Pricing" value="Ask for current stock and pricing" />
                <Info label="Availability" value="Supplied and sourced through TRUECOLOURS" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-gray-600 shadow-sm ring-1 ring-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-bold text-gray-800">{value}</div>
    </div>
  );
}
