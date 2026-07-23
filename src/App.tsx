import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { Atelier } from './sections/Atelier'
import { Showroom } from './sections/Showroom'
import { Engagements } from './sections/Engagements'
import { Contact } from './sections/Contact'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { CartDrawer } from './components/CartDrawer'
import { QuoteModal } from './components/QuoteModal'
import { useLang } from './context/LangContext'

function App() {
  const { t } = useLang()

  useEffect(() => {
    document.title = t.meta.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', t.meta.description)
  }, [t])

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Navbar />
      <main>
        <Hero />
        <Atelier />
        <Showroom />
        <Engagements />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
      <QuoteModal />
    </div>
  )
}

export default App
