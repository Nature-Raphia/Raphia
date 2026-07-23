import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'

export function CartDrawer() {
  const { lang, t } = useLang()
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, totalCount, openQuoteModal } =
    useCart()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[var(--color-olive)]/40 backdrop-blur-sm transition-opacity ${
          isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[var(--color-ivory)] shadow-2xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-olive)]/10 px-6 py-5">
          <h2 className="font-serif text-xl text-[var(--color-olive)]">
            {t.cart.title}
            {totalCount > 0 && (
              <span className="ml-2 text-sm font-sans text-[var(--color-olive)]/50">({totalCount})</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label={t.cart.close}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-olive)] hover:bg-[var(--color-sand)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="font-medium text-[var(--color-olive)]">{t.cart.empty}</p>
            <p className="text-sm text-[var(--color-olive)]/60">{t.cart.emptyHint}</p>
          </div>
        ) : (
          <div className="thin-scrollbar flex-1 overflow-y-auto px-6 py-4">
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name[lang]}
                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base text-[var(--color-olive)]">
                        {item.product.name[lang]}
                      </h3>
                      <p className="mt-0.5 text-xs text-[var(--color-olive)]/55">
                        {item.product.description[lang]}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-[var(--color-olive)]/15 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-olive)] hover:bg-[var(--color-sand)]"
                          aria-label="-"
                        >
                          –
                        </button>
                        <span className="w-5 text-center text-sm font-medium text-[var(--color-olive)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-olive)] hover:bg-[var(--color-sand)]"
                          aria-label="+"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs font-medium text-[var(--color-terracotta)] hover:underline"
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-[var(--color-olive)]/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-[var(--color-olive)]/70">{t.cart.total}</span>
              <span className="font-semibold text-[var(--color-olive)]">
                {totalCount} {t.cart.itemsCount}
              </span>
            </div>
            <button
              onClick={openQuoteModal}
              className="w-full rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[var(--color-terracotta-dark)]"
            >
              {t.cart.checkoutCta}
            </button>
            <button
              onClick={closeCart}
              className="mt-2 w-full rounded-full px-6 py-2.5 text-sm font-medium text-[var(--color-olive)]/70 hover:text-[var(--color-olive)]"
            >
              {t.cart.continueCta}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
