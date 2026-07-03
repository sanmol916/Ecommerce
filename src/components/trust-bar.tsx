const items = [
  { title: "100% Pure Cotton", sub: "Breathable fabric for Indian weather" },
  { title: "Free Shipping", sub: "On all orders above ₹1299" },
  { title: "Loved by 1 Lakh+ Women", sub: "7-day hassle-free returns" },
  { title: "COD Available", sub: "Pay when your order arrives" },
];

export function TrustBar() {
  return (
    <section className="border-y border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="text-center">
            <p className="text-sm font-semibold text-ink">{it.title}</p>
            <p className="mt-1 text-xs text-ink/55">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
