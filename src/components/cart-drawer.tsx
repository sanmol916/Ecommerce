"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 129900; // ₹1299 in paise

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    setQuantity,
    removeItem,
    keyOf,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h2 className="font-serif text-xl text-ink">Your Bag</h2>
          <button onClick={closeCart} aria-label="Close cart" className="text-ink/60 hover:text-ink">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-ink/70">Your bag is empty.</p>
            <button
              onClick={closeCart}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-black/5 bg-brand-50 px-5 py-3 text-center text-xs text-ink/70">
              {remaining > 0 ? (
                <>Add {formatINR(remaining)} more for <b>free shipping</b> 🎉</>
              ) : (
                <>You&apos;ve unlocked <b>free shipping</b>! 🎉</>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.map((i) => {
                const key = keyOf(i);
                return (
                  <div key={key} className="flex gap-3 border-b border-black/5 py-4">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={i.image} alt={i.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-medium text-ink">{i.name}</p>
                        <button
                          onClick={() => removeItem(key)}
                          className="text-xs text-ink/40 hover:text-brand-600"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-ink/55">
                        {i.size} · {i.color}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-black/10">
                          <button
                            className="px-3 py-1 text-ink/70"
                            onClick={() => setQuantity(key, i.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm">{i.quantity}</span>
                          <button
                            className="px-3 py-1 text-ink/70"
                            onClick={() => setQuantity(key, i.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ink">
                          {formatINR(i.price * i.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-black/5 p-5">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-ink/70">Subtotal</span>
                <span className="font-semibold text-ink">{formatINR(subtotal)}</span>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block rounded-full bg-brand-600 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700"
              >
                Checkout
              </Link>
              <p className="mt-2 text-center text-xs text-ink/50">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
