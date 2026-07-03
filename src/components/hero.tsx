import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[70vh] w-full sm:min-h-[80vh]">
        <Image
          src="https://picsum.photos/seed/bhama-hero/1920/1200"
          alt="Bhama Vision new collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative mx-auto flex h-full min-h-[70vh] max-w-6xl items-center px-4 sm:min-h-[80vh]">
          <div className="max-w-xl text-white">
            <p className="text-sm font-medium uppercase tracking-[0.25em]">
              Fresh drops, every week
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">
              Kurtis crafted for every mood, every occasion.
            </h1>
            <p className="mt-4 max-w-md text-base text-white/85">
              Breathable pure-cotton silhouettes, designed in India and loved by
              thousands of women. Starting at just ₹649.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/collections/new-arrivals"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink transition hover:bg-brand-50"
              >
                Shop New In
              </Link>
              <Link
                href="/collections/best-sellers"
                className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Best Sellers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
