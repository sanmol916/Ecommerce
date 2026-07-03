import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Kurtis", href: "/categories/kurtis" },
      { label: "Kurta Sets", href: "/categories/kurta-sets" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Order", href: "#" },
      { label: "Returns & Exchange", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Bhama Vision", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <span className="font-serif text-2xl text-white">
            Bhama<span className="text-brand-400"> Vision</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Thoughtfully designed Indian womenswear. Pure fabrics, honest
            pricing, and fits made to be lived in.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/60 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Bhama Vision. Crafted in India. All rights reserved.
      </div>
    </footer>
  );
}
