"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 129900;

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, keyOf, clear } = useCart();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 7900;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">Your bag is empty</h1>
        <p className="mt-2 text-ink/60">Discover kurtis, sets and dresses made to be lived in.</p>
        <Link
          href="/collections/new-arrivals"
          className="mt-6 inline-block rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 font-serif text-3xl text-ink">Shopping Bag</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-black/5">
          {items.map((i) => {
            const key = keyOf(i);
            return (
              <div key={key} className="flex gap-4 py-5">
                <Link href={`/products/${i.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src={i.image} alt={i.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <Link href={`/products/${i.slug}`} className="font-medium text-ink hover:text-brand-700">
                      {i.name}
                    </Link>
                    <span className="font-semibold text-ink">{formatINR(i.price * i.quantity)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/55">Size {i.size} · {i.color}</p>
                  <div className="mt-auto flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-black/10">
                      <button className="px-3 py-1.5 text-ink/70" onClick={() => setQuantity(key, i.quantity - 1)}>−</button>
                      <span className="min-w-7 text-center text-sm">{i.quantity}</span>
                      <button className="px-3 py-1.5 text-ink/70" onClick={() => setQuantity(key, i.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeItem(key)} className="text-sm text-ink/45 hover:text-brand-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="pt-4">
            <button onClick={clear} className="text-sm text-ink/45 hover:text-brand-600">
              Clear bag
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h2 className="font-serif text-xl text-ink">Order Summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/70">Subtotal</dt>
              <dd className="font-medium text-ink">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/70">Shipping</dt>
              <dd className="font-medium text-ink">
                {shipping === 0 ? "Free" : formatINR(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-black/5 pt-3 text-base">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-semibold text-ink">{formatINR(total)}</dd>
            </div>
          </dl>

          <button className="mt-6 w-full rounded-full bg-brand-600 py-3.5 text-sm font-semibold text-white hover:bg-brand-700">
            Proceed to Checkout
          </button>

          <p className="mt-3 text-center text-xs text-ink/50">
            Checkout is handled securely by Shopify once connected. COD & UPI supported.
          </p>
        </aside>
      </div>
    </div>
  );
}
