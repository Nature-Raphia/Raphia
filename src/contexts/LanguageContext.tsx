import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.collections': { fr: 'Collections', en: 'Collections' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.b2b': { fr: 'B2B', en: 'B2B' },
  'nav.atelier': { fr: 'L\'Atelier', en: 'The Workshop' },
  'nav.showroom': { fr: 'Le Showroom', en: 'Showroom' },
  'nav.engagements': { fr: 'Engagements', en: 'Commitments' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.admin': { fr: 'Admin', en: 'Admin' },

  // Hero
  'hero.location': { fr: 'Antsirabe · Madagascar', en: 'Antsirabe · Madagascar' },
  'hero.title': { fr: 'De la fibre sauvage à l\'accessoire d\'exception.', en: 'From wild fibre to an exceptional accessory.' },
  'hero.subtitle': { fr: 'Depuis les hautes terres d\'Antsirabe, nos artisanes tissent chaque pièce à la main, tressant héritage, patience et beauté brute dans une signature 100% Madagascar.', en: 'From the highlands of Antsirabe, our artisans weave each piece by hand, braiding heritage, patience and raw beauty into a 100% Madagascar signature.' },
  'hero.cta.collection': { fr: 'Découvrir la collection', en: 'Discover the collection' },
  'hero.cta.atelier': { fr: 'Notre Histoire', en: 'Our Story' },
  'hero.scroll': { fr: 'Faire défiler', en: 'Scroll down' },

  // Atelier
  'atelier.label': { fr: 'L\'Atelier · Nature Raphia', en: 'The Workshop · Nature Raphia' },
  'atelier.title': { fr: 'Un savoir-faire tissé à la main.', en: 'Handcrafted expertise.' },
  'atelier.eyebrow': { fr: 'L\'Atelier', en: 'The Workshop' },
  'atelier.subtitle': { fr: 'Depuis douze ans, nos artisanes transforment le raphia sauvage en pièces d\'exception. Chaque geste — récolte, teinture végétale, crochet — porte la mémoire des hautes terres malgaches.', en: 'For twelve years, our artisans have transformed wild raphia into exceptional pieces. Each gesture — harvest, plant dyeing, crochet — carries the memory of the Malagasy highlands.' },
  'atelier.cta': { fr: 'Notre Histoire', en: 'Our Story' },
  'atelier.intro': { fr: 'Depuis douze ans, nos artisanes transforment le raphia sauvage en pièces d’exception. Chaque geste — récolte, teinture végétale, crochet — porte la mémoire des hautes terres malgaches.', en: 'For twelve years, our artisans have transformed wild raphia into exceptional pieces. Each gesture — harvest, plant dyeing, crochet — carries the memory of the Malagasy highlands.' },
  'atelier.stepLabel': { fr: 'Etape', en: 'Step' },
  // Story page
  'story.title': { fr: 'Née à Antsirabe, tissée pour durer.', en: 'Born in Antsirabe, woven to last.' },
  'story.subtitle': { fr: 'Douze ans d\'atelier, quatre gestes ancestraux, quarante femmes artisanes. Une aventure familiale devenue une signature.', en: 'Twelve years of workshop, four ancestral gestures, forty women artisans. A family adventure turned into a signature.' },
  'story.cta': { fr: 'Notre Histoire', en: 'Our Story' },
  'story.step1.title': { fr: 'Récolte & Tri', en: 'Harvest & Sorting' },
  'story.step1.desc': { fr: 'Le raphia est récolté sur les palmiers des côtes malgaches, sans jamais abattre l\'arbre, puis trié manuellement dans notre atelier d\'Antsirabe.', en: 'Raphia is harvested from Madagascar\'s coastal palm trees without ever felling the tree, then manually sorted in our Antsirabe workshop.' },
  'story.step2.title': { fr: 'Teinture Éco-responsable', en: 'Eco-responsible Dyeing' },
  'story.step2.desc': { fr: 'Pigments végétaux et colorants certifiés donnent naissance à une palette organique : indigo, terre brûlée, olive douce, rose de sable.', en: 'Plant-based pigments and certified dyes give birth to an organic palette: indigo, burnt earth, soft olive, sand rose.' },
  'story.step3.title': { fr: 'Crochet & Tissage d\'Art', en: 'Art Crochet & Weaving' },
  'story.step3.desc': { fr: 'Techniques ancestrales des hautes terres, transmises entre générations. Chaque motif est un geste d\'une précision millimétrée.', en: 'Ancestral highland techniques, passed down between generations. Each pattern is a gesture of millimeter precision.' },
  'story.step4.title': { fr: 'Finitions d\'Exception', en: 'Exceptional Finishing' },
  'story.step4.desc': { fr: 'Boucles en corne de zébu locale et anses en cuir à tannage végétal viennent signer la pièce, entre bijou et objet.', en: 'Local zebu horn clasps and vegetable-tanned leather straps sign the piece, between jewelry and object.' },
  'story.impact.label': { fr: 'Notre Impact', en: 'Our Impact' },
  'story.impact.title': { fr: 'Un modèle lent, juste, et vivant.', en: 'A slow, fair, and living model.' },
  'story.stat1': { fr: 'Femmes artisanes', en: 'Women artisans' },
  'story.stat2': { fr: 'Biodégradable', en: 'Biodegradable' },
  'story.stat3': { fr: 'Palmier abattu', en: 'Palm trees felled' },
  'story.stat4': { fr: 'Ans d\'atelier', en: 'Years of workshop' },
  'story.stat1.desc': { fr: 'Indépendance financière et salaires équitables pour les femmes des coopératives d\'Antsirabe.', en: 'Financial independence and fair wages for women in Antsirabe cooperatives.' },
  'story.stat2.desc': { fr: 'Fibre végétale, teintures naturelles, cuir tanné aux plantes : nos matières retournent à la terre.', en: 'Plant-based fibre, natural dyes, vegetable-tanned leather: our materials return to the earth.' },
  'story.stat3.desc': { fr: 'Le raphia est récolté sans détruire l\'arbre — préservant la biodiversité malgache.', en: 'Raphia is harvested without destroying the tree — preserving Madagascar\'s biodiversity.' },
  'story.stat4.desc': { fr: 'Une aventure familiale née à Antsirabe et devenue une signature reconnue à l\'international.', en: 'A family story born in Antsirabe, now a recognized signature internationally.' },
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
  'showroom.atelierImageAlt': { fr: 'Artisan travaillant dans l\'atelier', en: 'Artisan working in the workshop' },
  'showroom.filter.all': { fr: 'Tous', en: 'All' },
  'showroom.add': { fr: 'Ajouter à la sélection', en: 'Add to selection' },
  'showroom.outofstock': { fr: 'Épuisé', en: 'Out of stock' },
  'showroom.viewall': { fr: 'Voir toute la collection', en: 'View full collection' },
  'home.featured.title': { fr: 'Nos pièces coup de cœur', en: 'Our favourites' },

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
  'contact.address.value': { fr: 'Route d\'Ambositra, en face Hôtel Royal Palace, Antsirabe Afovoany, Madagascar 110', en: 'Route d\'Ambositra, opposite Hôtel Royal Palace, Antsirabe Afovoany, Madagascar 110' },
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
  'footer.navigation': { fr: 'Navigation', en: 'Navigation' },
  'footer.rights': { fr: '© 2026 Nature Raphia & Boutique Mahalia. Tous droits réservés.', en: '© 2026 Nature Raphia & Boutique Mahalia. All rights reserved.' },
  'footer.made': { fr: 'Fait avec ♥ à Antsirabe, Madagascar', en: 'Made with ♥ in Antsirabe, Madagascar' },

  // Admin
  'admin.title': { fr: 'Espace Administration', en: 'Administration Space' },
  'admin.dashboard': { fr: 'Tableau de bord', en: 'Dashboard' },
  'admin.products': { fr: 'Produits', en: 'Products' },
  'admin.quotes': { fr: 'Demandes de devis', en: 'Quote Requests' },
  'admin.login': { fr: 'Connexion Admin', en: 'Admin Login' },

  // B2B
  'b2b.hero.title': { fr: 'Un partenariat sur mesure.', en: 'A tailored partnership.' },
  'b2b.hero.subtitle': { fr: 'Concept-stores, boutiques hôtelières, e-shops premium : nous accompagnons vos sélections avec des éditions exclusives, des délais dédiés et un service white-glove.', en: 'Concept stores, hotel boutiques, premium e-shops: we support your selections with exclusive editions, dedicated timelines and white-glove service.' },
  'b2b.hero.cta': { fr: 'Explorer la collection', en: 'Explore the collection' },
  'b2b.features.title': { fr: 'Nos engagements', en: 'Our commitments' },
  'b2b.feature1.title': { fr: 'Éditions exclusives', en: 'Exclusive editions' },
  'b2b.feature1.desc': { fr: 'Formes, motifs et coloris développés pour votre univers.', en: 'Shapes, patterns and colors developed for your universe.' },
  'b2b.feature2.title': { fr: 'MOQ accessibles', en: 'Accessible MOQs' },
  'b2b.feature2.desc': { fr: 'Petites séries à partir de 20 pièces par référence.', en: 'Small batches from 20 pieces per reference.' },
  'b2b.feature3.title': { fr: 'Livraison mondiale', en: 'Worldwide shipping' },
  'b2b.feature3.desc': { fr: 'Expéditions sécurisées depuis Madagascar vers l\'Europe, l\'Asie et les États-Unis.', en: 'Secure shipments from Madagascar to Europe, Asia and the United States.' },
  'b2b.feature4.title': { fr: 'Suivi dédié', en: 'Dedicated support' },
  'b2b.feature4.desc': { fr: 'Un contact unique, du brief à la livraison finale.', en: 'A single point of contact, from brief to final delivery.' },
  'b2b.form.title': { fr: 'Demande de partenariat', en: 'Partnership request' },
  'b2b.form.structure': { fr: 'Nom de la structure', en: 'Organization name' },
  'b2b.form.contact': { fr: 'Nom complet', en: 'Full name' },
  'b2b.form.email': { fr: 'Adresse email', en: 'Email address' },
  'b2b.form.country': { fr: 'Pays', en: 'Country' },
  'b2b.form.projectType': { fr: 'Type de projet', en: 'Project type' },
  'b2b.form.volume': { fr: 'Volume estimé', en: 'Estimated volume' },
  'b2b.form.message': { fr: 'Message (optionnel)', en: 'Message (optional)' },
  'b2b.form.submit': { fr: 'Demander le catalogue', en: 'Request the catalog' },
  'b2b.form.ph.structure': { fr: 'Votre structure', en: 'Your organization' },
  'b2b.form.ph.contact': { fr: 'Votre nom', en: 'Your name' },
  'b2b.form.ph.email': { fr: 'email@example.com', en: 'you@company.com' },
  'b2b.form.ph.country': { fr: 'Votre pays', en: 'Your country' },
  'b2b.form.ph.projectType': { fr: 'Ex: Concept-store, hôtel...', en: 'E.g. Concept store, hotel...' },
  'b2b.form.ph.volume': { fr: 'Ex: 50 pièces/mois', en: 'E.g. 50 pieces/month' },
  'b2b.form.ph.message': { fr: 'Décrivez votre projet...', en: 'Describe your project...' },
  'b2b.form.success': { fr: 'Demande envoyée avec succès !', en: 'Request sent successfully!' },
  'b2b.form.whatsapp': { fr: 'WhatsApp ouvert pour confirmation', en: 'WhatsApp open for confirmation' },
  'b2b.cta.whatsapp': { fr: 'Discuter avec la Boutique', en: 'Chat with the boutique' },
  'showroom.backHome': { fr: 'Retour à l\'accueil', en: 'Back to home' },
  'showroom.filter': { fr: 'Filtrer', en: 'Filter' },
  'showroom.itemsCount': { fr: 'produits', en: 'items' },
  'showroom.category': { fr: 'Catégorie', en: 'Category' },
  'showroom.material': { fr: 'Matière', en: 'Material' },
  'showroom.price': { fr: 'Prix', en: 'Price' },
  'showroom.sort': { fr: 'Trier par', en: 'Sort by' },
  'showroom.apply': { fr: 'Appliquer', en: 'Apply' },
  'showroom.ctaTitle': { fr: 'Vous souhaitez une pièce unique ?', en: 'Would you like a custom piece?' },
  'showroom.ctaText': { fr: 'Contactez-nous pour une création sur mesure, adaptée à vos envies.', en: 'Contact us for a custom creation, tailored to your preferences.' },
  'showroom.ctaAlt': { fr: 'Création sur mesure', en: 'Custom creation' },
  'showroom.contactUs': { fr: 'Nous contacter', en: 'Contact us' },
  'showroom.all': { fr: 'Tous', en: 'All' },
  'showroom.adding': { fr: 'Ajouté !', en: 'Added!' },
  'showroom.noProducts': { fr: 'Aucun produit dans cette catégorie', en: 'No products in this category' },
  'showroom.loading': { fr: 'Chargement des produits...', en: 'Loading products...' },
  'showroom.outOfStock': { fr: 'Épuisé', en: 'Out of stock' },
  'home.featured.label': { fr: 'Nos pièces coup de cœur', en: 'Our favourites' },
  'home.featured.subtitle': { fr: 'Une sélection des créations les plus emblématiques de l\'atelier — sacs, chapeaux et objets d\'art.', en: 'A selection of the workshop\'s most iconic creations — bags, hats and art pieces.' },
  'home.b2b.title': { fr: 'Vous êtes un professionnel ?', en: 'Are you a professional?' },
  'home.b2b.label': { fr: 'Espace professionnel', en: 'Professional space' },
  'home.b2b.alt': { fr: 'Nature Raphia - Espace professionnel', en: 'Nature Raphia - Professional space' },
  'home.b2b.subtitle': { fr: 'Concept-stores, boutiques hôtelières, e-shops premium : nous accompagnons vos sélections avec des éditions exclusives, des délais dédiés et un service white-glove.', en: 'Concept stores, hotel boutiques, premium e-shops: we support your selections with exclusive editions, dedicated timelines and white-glove service.' },
  'home.b2b.cta': { fr: 'Accéder à l\'Espace B2B', en: 'Access the B2B Space' },
  'home.b2b.contact.title': { fr: 'Contactez notre équipe', en: 'Contact our team' },
  'home.b2b.contact.desc': { fr: 'Pour toute demande professionnelle, nous répondons sous 24h.', en: 'For any professional request, we respond within 24h.' },
  'home.b2b.contact.phoneLabel': { fr: 'Téléphone', en: 'Phone' },
  'home.b2b.contact.emailLabel': { fr: 'Email', en: 'Email' },
  'home.b2b.contact.whatsapp': { fr: 'WhatsApp B2B', en: 'WhatsApp B2B' },
  'home.gallery.label': { fr: 'L\'Atelier', en: 'The Workshop' },
  'home.gallery.title': { fr: 'Dans l\'atelier', en: 'In the workshop' },
  'home.gallery.alt.recolte': { fr: 'Récolte', en: 'Harvest' },
  'home.gallery.alt.peignage': { fr: 'Peignage', en: 'Combing' },
  'home.gallery.alt.crochage': { fr: 'Crochage', en: 'Crocheting' },
  'home.gallery.alt.creation': { fr: 'Création', en: 'Creation' },
  'home.gallery.alt.nature': { fr: 'Nature', en: 'Nature' },
  'home.gallery.alt.teinture': { fr: 'Teinture', en: 'Dyeing' },
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
