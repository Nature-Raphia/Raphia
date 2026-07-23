import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  'nav.atelier': { fr: 'L\'Atelier', en: 'The Workshop' },
  'nav.showroom': { fr: 'Le Showroom', en: 'Showroom' },
  'nav.engagements': { fr: 'Engagements', en: 'Commitments' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.admin': { fr: 'Admin', en: 'Admin' },

  // Hero
  'hero.location': { fr: 'Antsirabe · Madagascar', en: 'Antsirabe · Madagascar' },
  'hero.title': { fr: 'De la fibre sauvage\nà l\'accessoire\nd\'exception.', en: 'From wild fibre\nto an exceptional\naccessory.' },
  'hero.subtitle': { fr: 'Depuis les hautes terres d\'Antsirabe, nos artisanes tissent chaque pièce à la main, tressant héritage, patience et beauté brute dans une signature 100% Madagascar.', en: 'From the highlands of Antsirabe, our artisans weave each piece by hand, braiding heritage, patience and raw beauty into a 100% Madagascar signature.' },
  'hero.cta.collection': { fr: 'Découvrir la collection', en: 'Discover the collection' },
  'hero.cta.atelier': { fr: 'Voir l\'Atelier', en: 'See the Workshop' },
  'hero.scroll': { fr: 'Faire défiler', en: 'Scroll down' },

  // Atelier
  'atelier.label': { fr: 'L\'Atelier · Nature Raphia', en: 'The Workshop · Nature Raphia' },
  'atelier.title': { fr: 'Un savoir-faire tissé à la main.', en: 'Handcrafted expertise.' },
  'atelier.subtitle': { fr: 'Depuis douze ans, nos artisanes transforment le raphia sauvage en pièces d\'exception. Chaque geste — récolte, teinture végétale, crochet — porte la mémoire des hautes terres malgaches.', en: 'For twelve years, our artisans have transformed wild raphia into exceptional pieces. Each gesture — harvest, plant dyeing, crochet — carries the memory of the Malagasy highlands.' },
  'atelier.step1.title': { fr: 'Récolte Côtière', en: 'Coastal Harvest' },
  'atelier.step1.desc': { fr: 'Le raphia est récolté à la main sur les palmiers côtiers de Madagascar sans abattre l\'arbre, préservant ainsi l\'écosystème local.', en: 'Raphia is hand-harvested from Madagascar\'s coastal palm trees without felling them, preserving the local ecosystem.' },
  'atelier.step2.title': { fr: 'Peignage & Tri', en: 'Combing & Sorting' },
  'atelier.step2.desc': { fr: 'Les fibres sont méticuleusement peignées et triées par longueur et qualité, seules les meilleures fibres rejoignent l\'atelier.', en: 'Fibres are meticulously combed and sorted by length and quality, only the finest fibres reach the workshop.' },
  'atelier.step3.title': { fr: 'Teinture Végétale', en: 'Plant Dyeing' },
  'atelier.step3.desc': { fr: 'Les teintures sont extraites de plantes locales : indigo, henné, écorces. Zéro produit chimique, 100% biodégradable.', en: 'Dyes are extracted from local plants: indigo, henna, tree bark. Zero chemicals, 100% biodegradable.' },
  'atelier.step4.title': { fr: 'Crochetage d\'Art', en: 'Artisan Crocheting' },
  'atelier.step4.desc': { fr: 'Chaque pièce est crochetée à la main par nos artisanes. Un sac de taille moyenne représente entre 15 et 25 heures de travail.', en: 'Each piece is hand-crocheted by our artisans. A medium-sized bag represents 15 to 25 hours of work.' },

  // Showroom
  'showroom.label': { fr: 'Le Showroom · Boutique Mahalia', en: 'Showroom · Mahalia Boutique' },
  'showroom.title': { fr: 'Notre collection.', en: 'Our collection.' },
  'showroom.subtitle': { fr: 'Chaque pièce est unique, façonnée à la main dans notre atelier d\'Antsirabe.', en: 'Each piece is unique, handcrafted in our Antsirabe workshop.' },
  'showroom.filter.all': { fr: 'Tous', en: 'All' },
  'showroom.add': { fr: 'Ajouter à ma sélection', en: 'Add to selection' },
  'showroom.outofstock': { fr: 'Épuisé', en: 'Out of stock' },
  'showroom.viewall': { fr: 'Voir toute la collection', en: 'View full collection' },

  // Cart
  'cart.title': { fr: 'Ma Sélection', en: 'My Selection' },
  'cart.empty': { fr: 'Votre sélection est vide', en: 'Your selection is empty' },
  'cart.empty.desc': { fr: 'Ajoutez des pièces à votre sélection pour demander un devis.', en: 'Add pieces to your selection to request a quote.' },
  'cart.total': { fr: 'Total estimé', en: 'Estimated total' },
  'cart.cta': { fr: 'Valider ma demande de devis', en: 'Submit my quote request' },
  'cart.added': { fr: 'Ajouté à la sélection !', en: 'Added to selection!' },

  // Quote form
  'quote.title': { fr: 'Demande de Devis', en: 'Quote Request' },
  'quote.subtitle': { fr: 'Notre équipe vous contactera sous 24h pour confirmer les disponibilités et le tarif d\'expédition.', en: 'Our team will contact you within 24h to confirm availability and shipping rates.' },
  'quote.name': { fr: 'Nom complet', en: 'Full name' },
  'quote.email': { fr: 'Adresse e-mail', en: 'Email address' },
  'quote.phone': { fr: 'Téléphone (optionnel)', en: 'Phone (optional)' },
  'quote.country': { fr: 'Pays de destination', en: 'Destination country' },
  'quote.profile': { fr: 'Profil acheteur', en: 'Buyer profile' },
  'quote.profile.particulier': { fr: 'Particulier', en: 'Individual' },
  'quote.profile.grossiste': { fr: 'Grossiste / B2B', en: 'Wholesaler / B2B' },
  'quote.message': { fr: 'Message (optionnel)', en: 'Message (optional)' },
  'quote.submit': { fr: 'Envoyer ma demande', en: 'Send my request' },
  'quote.success.title': { fr: 'Demande envoyée !', en: 'Request sent!' },
  'quote.success.desc': { fr: 'Merci pour votre intérêt. Notre équipe vous contactera sous 24h.', en: 'Thank you for your interest. Our team will contact you within 24h.' },

  // RSE
  'rse.label': { fr: 'Nos Engagements', en: 'Our Commitments' },
  'rse.title': { fr: 'Une promesse simple et vivante.', en: 'A simple and living promise.' },
  'rse.card1.title': { fr: '100% Raphia Naturel', en: '100% Natural Raphia' },
  'rse.card1.desc': { fr: 'Fibre végétale récoltée sans abattre le palmier, préservant l\'écosystème côtier de Madagascar.', en: 'Plant fibre harvested without felling the palm tree, preserving Madagascar\'s coastal ecosystem.' },
  'rse.card2.title': { fr: 'Fait main à Antsirabe', en: 'Handmade in Antsirabe' },
  'rse.card2.desc': { fr: 'Chaque pièce est tressée à la main dans notre atelier par des artisanes locales expertes.', en: 'Each piece is hand-woven in our workshop by expert local artisans.' },
  'rse.card3.title': { fr: 'Commerce Équitable', en: 'Fair Trade' },
  'rse.card3.desc': { fr: '40+ femmes artisanes rémunérées justement, avec accès à la formation et à la protection sociale.', en: '40+ female artisans fairly compensated, with access to training and social protection.' },
  'rse.card4.title': { fr: 'Zéro Déchet Chimique', en: 'Zero Chemical Waste' },
  'rse.card4.desc': { fr: 'Teintures 100% végétales, eaux de teinture retraitées, emballages recyclables.', en: '100% plant-based dyes, reprocessed dye water, recyclable packaging.' },
  'rse.women.title': { fr: 'L\'autonomisation des femmes artisanes', en: 'Empowering women artisans' },
  'rse.women.desc': { fr: 'Notre atelier emploie plus de 40 femmes artisanes d\'Antsirabe. Au-delà d\'un emploi, nous offrons formation, épargne solidaire et accès aux soins — une chaîne de valeur humaine au cœur de notre modèle.', en: 'Our workshop employs more than 40 women artisans from Antsirabe. Beyond employment, we offer training, solidarity savings and healthcare access — a human value chain at the heart of our model.' },

  // Testimonials
  'testimonials.title': { fr: 'Ils nous font confiance', en: 'They trust us' },
  'testimonials.subtitle': { fr: 'Regards de nos partenaires.', en: 'Words from our partners.' },

  // Contact
  'contact.label': { fr: 'Localisation & Contact', en: 'Location & Contact' },
  'contact.title': { fr: 'Trouvez-nous à Antsirabe.', en: 'Find us in Antsirabe.' },
  'contact.address': { fr: 'Adresse', en: 'Address' },
  'contact.address.value': { fr: 'Rue de l\'Indépendance, Antsirabe 110, Madagascar', en: 'Rue de l\'Indépendance, Antsirabe 110, Madagascar' },
  'contact.hours': { fr: 'Horaires', en: 'Opening Hours' },
  'contact.hours.value': { fr: 'Lun–Sam : 08h30–18h00 | Dimanche : Fermé', en: 'Mon–Sat: 08:30–18:00 | Sunday: Closed' },
  'contact.phone': { fr: 'Téléphones', en: 'Phones' },
  'contact.email': { fr: 'E-mail', en: 'Email' },
  'contact.b2b.title': { fr: 'Espace Professionnel B2B', en: 'B2B Professional Space' },
  'contact.b2b.subtitle': { fr: 'Concept-stores, boutiques hôtelières, e-shops : découvrez notre programme grossiste.', en: 'Concept stores, hotel boutiques, e-shops: discover our wholesale program.' },
  'contact.b2b.name': { fr: 'Nom de l\'entreprise', en: 'Company name' },
  'contact.b2b.contact': { fr: 'Nom du contact', en: 'Contact name' },
  'contact.b2b.submit': { fr: 'Envoyer la demande B2B', en: 'Send B2B request' },
  'contact.b2b.success': { fr: 'Demande B2B envoyée ! Nous vous contacterons sous 48h.', en: 'B2B request sent! We will contact you within 48h.' },

  // Footer
  'footer.tagline': { fr: 'De la fibre sauvage à l\'accessoire d\'exception, depuis Antsirabe.', en: 'From wild fibre to exceptional accessories, from Antsirabe.' },
  'footer.rights': { fr: '© 2026 Nature Raphia & Boutique Mahalia. Tous droits réservés.', en: '© 2026 Nature Raphia & Boutique Mahalia. All rights reserved.' },
  'footer.made': { fr: 'Fait avec ♥ à Antsirabe, Madagascar', en: 'Made with ♥ in Antsirabe, Madagascar' },

  // Admin
  'admin.title': { fr: 'Espace Administration', en: 'Administration Space' },
  'admin.dashboard': { fr: 'Tableau de bord', en: 'Dashboard' },
  'admin.products': { fr: 'Produits', en: 'Products' },
  'admin.quotes': { fr: 'Demandes de devis', en: 'Quote Requests' },
  'admin.login': { fr: 'Connexion Admin', en: 'Admin Login' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('fr');

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
};
