import type { Product } from '../types'
import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLang()
  const { addItem, lastAddedId } = useCart()
  const justAdded = lastAddedId === product.id

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white/40 shadow-sm shadow-[var(--color-olive)]/5 ring-1 ring-[var(--color-olive)]/5 transition-shadow hover:shadow-md hover:shadow-[var(--color-olive)]/10">
      <div className="relative aspect-square overflow-hidden bg-[var(--color-sand)]">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-lg text-[var(--color-olive)]">{product.name[lang]}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-[var(--color-olive)]/65">
          {product.description[lang]}
        </p>
        <button
          onClick={() => addItem(product)}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
            justAdded
              ? 'bg-[var(--color-olive)] text-[var(--color-ivory)]'
              : 'bg-[var(--color-terracotta)] text-white hover:bg-[var(--color-terracotta-dark)]'
          }`}
        >
          {justAdded ? t.showroom.added : t.showroom.addToCart}
        </button>
      </div>
    </div>
  )
}
