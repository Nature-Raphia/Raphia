import { useMemo, useState } from 'react'
import { useLang } from '../context/LangContext'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import type { ProductCategory } from '../types'

type FilterKey = 'all' | ProductCategory

const FILTERS: FilterKey[] = ['all', 'sacs', 'chapeaux', 'decoration']

const INSTAGRAM_IMAGES = [
  products[0].image,
  products[1].image,
  products[2].image,
  products[3].image,
  products[4].image,
  products[5].image,
]

export function Showroom() {
  const { t } = useLang()
  const [filter, setFilter] = useState<FilterKey>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="showroom" className="bg-[var(--color-sand)]/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
            {t.showroom.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-[var(--color-olive)] sm:text-4xl">
            {t.showroom.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-olive)]/75 sm:text-base">
            {t.showroom.intro}
          </p>
        </div>

        {/* Filtres */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-colors ${
                filter === key
                  ? 'bg-[var(--color-olive)] text-[var(--color-ivory)]'
                  : 'bg-white text-[var(--color-olive)]/70 hover:bg-[var(--color-olive)]/10'
              }`}
            >
              {t.showroom.filters[key]}
            </button>
          ))}
        </div>

        {/* Grille produits */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Instagram grid */}
        <div className="mt-24 text-center">
          <h3 className="font-serif text-2xl text-[var(--color-olive)] sm:text-3xl">
            {t.showroom.instagramTitle}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-olive)]/65 sm:text-base">
            {t.showroom.instagramSubtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {INSTAGRAM_IMAGES.map((img, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt="Instagram Nature Raphia"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-olive)]/0 transition-colors group-hover:bg-[var(--color-olive)]/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-olive)]/25 px-6 py-2.5 text-sm font-semibold text-[var(--color-olive)] transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
          >
            {t.showroom.instagramCta}
          </a>
        </div>
      </div>
    </section>
  )
}
