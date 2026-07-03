import Image from "next/image";

export function InstagramGallery() {
  const tiles = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 text-center">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">
          Our beautiful customers
        </h2>
        <p className="mt-1 text-sm text-ink/60">Tag us @bhamavision</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {tiles.map((n) => (
          <a
            key={n}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={`https://picsum.photos/seed/bhama-ig-${n}/500/500`}
              alt={`Customer photo ${n}`}
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
          </a>
        ))}
      </div>
    </section>
  );
}
