export type Lang = 'fr' | 'en'

export type ProductCategory = 'sacs' | 'chapeaux' | 'decoration'

export interface LocalizedText {
  fr: string
  en: string
}

export interface Product {
  id: string
  name: LocalizedText
  description: LocalizedText
  category: ProductCategory
  image: string
  instagram?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export type BuyerProfile = 'particulier' | 'grossiste'

export interface QuoteRequestPayload {
  name: string
  email: string
  country: string
  buyerProfile: BuyerProfile
  items: CartItem[]
}
