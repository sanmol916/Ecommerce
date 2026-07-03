"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

const NAV = [
  { label: "New In", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Kurtis", href: "/categories/kurtis" },
  { label: "Kurta Sets", href: "/categories/kurta-sets" },
  { label: "Co-ords", href: "/categories/co-ord-sets" },
  { label: "Dresses", href: "/categories/dresses" },
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
      <div className="bg-ink py-2 text-center text-xs text-white">
        Free shipping on orders above ₹1299 · COD available across India
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MenuIcon />
        </button>

        <Link href="/" className="flex items-center">
          <span className="font-serif text-2xl tracking-wide text-ink">
            Bhama<span className="text-brand-600"> Vision</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-ink/75 transition hover:text-brand-700"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 rounded-full px-3 py-2 text-ink hover:bg-brand-50"
          aria-label="Open cart"
        >
          <BagIcon />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-semibold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-black/5 bg-cream md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm text-ink/80"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
