import type { Product } from '../types'
import cabasSolstice from '../assets/images/product-cabas-solstice.webp'
import capelineRuban from '../assets/images/product-capeline-ruban.webp'
import pochetteLune from '../assets/images/product-pochette-lune.webp'
import panierIvoire from '../assets/images/product-panier-ivoire.webp'
import fedoraOlive from '../assets/images/product-fedora-olive.webp'
import clutchFleur from '../assets/images/product-clutch-fleur.webp'

export const products: Product[] = [
  {
    id: 'cabas-solstice',
    name: { fr: 'Cabas Solstice', en: 'Solstice Tote' },
    description: {
      fr: 'Raphia crocheté, motif rosace terracotta',
      en: 'Crocheted raphia, terracotta rosette pattern',
    },
    category: 'sacs',
    image: cabasSolstice,
  },
  {
    id: 'capeline-ruban-noir',
    name: { fr: 'Capeline Ruban Noir', en: 'Black Ribbon Capeline' },
    description: {
      fr: 'Paille de raphia fine, ruban gros-grain',
      en: 'Fine raphia straw, grosgrain ribbon',
    },
    category: 'chapeaux',
    image: capelineRuban,
  },
  {
    id: 'pochette-lune-indigo',
    name: { fr: 'Pochette Lune Indigo', en: 'Indigo Moon Pouch' },
    description: {
      fr: 'Teinture indigo naturelle, anse cuir végétal',
      en: 'Natural indigo dye, vegetable leather strap',
    },
    category: 'sacs',
    image: pochetteLune,
  },
  {
    id: 'panier-ivoire-terracotta',
    name: { fr: 'Panier Ivoire Terracotta', en: 'Ivory Terracotta Basket' },
    description: {
      fr: 'Grand format, bande signature',
      en: 'Large format, signature stripe',
    },
    category: 'decoration',
    image: panierIvoire,
  },
  {
    id: 'fedora-olive',
    name: { fr: 'Fedora Olive', en: 'Olive Fedora' },
    description: {
      fr: 'Tressage main, bandeau olive végétal',
      en: 'Hand-woven, olive vegetable hatband',
    },
    category: 'chapeaux',
    image: fedoraOlive,
  },
  {
    id: 'clutch-fleur-antsirabe',
    name: { fr: "Clutch Fleur d'Antsirabe", en: "Antsirabe Flower Clutch" },
    description: {
      fr: 'Broderie fleurie, fermoir corne de zébu',
      en: 'Floral embroidery, zebu horn clasp',
    },
    category: 'sacs',
    image: clutchFleur,
  },
]
