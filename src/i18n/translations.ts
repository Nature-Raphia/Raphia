import type { Lang } from '../types'

export interface Translation {
  meta: {
    title: string
    description: string
  }
  nav: {
    atelier: string
    showroom: string
    engagements: string
    contact: string
    cart: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    scroll: string
  }
  atelier: {
    eyebrow: string
    title: string
    intro: string
    steps: { title: string; text: string }[]
    ctaLabel: string
  }
  showroom: {
    eyebrow: string
    title: string
    intro: string
    filters: { all: string; sacs: string; chapeaux: string; decoration: string }
    addToCart: string
    added: string
    instagramTitle: string
    instagramSubtitle: string
    instagramCta: string
  }
  engagements: {
    eyebrow: string
    title: string
    intro: string
    cards: { title: string; text: string; figure: string }[]
    quoteText: string
    quoteAuthor: string
  }
  contact: {
    eyebrow: string
    title: string
    intro: string
    addressLabel: string
    landmark: string
    phoneLabel: string
    emailLabel: string
    hoursLabel: string
    hoursValue: string
    hoursClosed: string
    mapCaption: string
    b2bTitle: string
    b2bIntro: string
    form: {
      name: string
      company: string
      email: string
      country: string
      message: string
      submit: string
      sending: string
      success: string
    }
  }
  cart: {
    title: string
    empty: string
    emptyHint: string
    quantity: string
    remove: string
    total: string
    itemsCount: string
    checkoutCta: string
    continueCta: string
    modalTitle: string
    modalIntro: string
    formName: string
    formEmail: string
    formCountry: string
    formCountryPlaceholder: string
    formProfile: string
    profileParticulier: string
    profileGrossiste: string
    submit: string
    submitting: string
    successTitle: string
    successText: string
    close: string
    recapTitle: string
  }
  whatsapp: {
    label: string
    tooltip: string
    defaultMessage: string
  }
  footer: {
    tagline: string
    linksTitle: string
    contactTitle: string
    hoursTitle: string
    rights: string
    craftedIn: string
  }
  common: {
    from: string
    langSwitch: string
  }
}

export const translations: Record<Lang, Translation> = {
  fr: {
    meta: {
      title: 'Nature Raphia & Mahalia — Artisanat en raphia, Antsirabe Madagascar',
      description:
        "Nature Raphia & Boutique Mahalia : sacs, chapeaux et décoration en raphia tressés à la main à Antsirabe, Madagascar. De la fibre sauvage à l'accessoire d'exception.",
    },
    nav: {
      atelier: "L'Atelier",
      showroom: 'Le Showroom',
      engagements: 'Engagements',
      contact: 'Contact',
      cart: 'Ma sélection',
    },
    hero: {
      eyebrow: 'Antsirabe · Madagascar',
      title: "De la fibre sauvage à l'accessoire d'exception.",
      subtitle:
        "Depuis les hautes terres d'Antsirabe, nos artisanes tressent chaque pièce à la main, mêlant héritage, patience et beauté brute dans une signature 100% malgache.",
      ctaPrimary: 'Découvrir le Showroom',
      ctaSecondary: "Voir l'Atelier",
      scroll: 'Faites défiler',
    },
    atelier: {
      eyebrow: 'Nature Raphia',
      title: 'Un savoir-faire tissé à la main.',
      intro:
        "Depuis douze ans, nos artisanes d'Antsirabe transforment le raphia sauvage en pièces d'exception. Chaque geste — récolte, teinture végétale, crochetage — porte la mémoire des hautes terres malgaches. Rien n'est industriel, tout est vivant.",
      steps: [
        {
          title: 'Récolte côtière',
          text: 'Les palmes de raphia sont prélevées à la main sur le littoral, sans jamais abattre le palmier, dans le respect du cycle naturel de la plante.',
        },
        {
          title: 'Peignage & Tri',
          text: "Chaque fibre est peignée, triée et calibrée à la main selon sa finesse, pour ne conserver que les brins destinés aux pièces les plus précieuses.",
        },
        {
          title: 'Teinture végétale',
          text: "Les fibres prennent couleur au contact de teintures naturelles et éthiques — argile, écorces, indigo — révélant la palette terracotta et ivoire de la maison.",
        },
        {
          title: "Crochetage d'art",
          text: "Le crochet à la main façonne le fil en volumes, motifs et rosaces, puis chaque pièce est ajustée de cuir végétal ou de corne de zébu à Antsirabe.",
        },
      ],
      ctaLabel: 'Étape',
    },
    showroom: {
      eyebrow: 'Boutique Mahalia',
      title: 'Nos pièces coup de cœur.',
      intro:
        'Une sélection des créations les plus emblématiques de l’atelier — sacs, chapeaux et objets de décoration. Composez votre sélection, nous nous occupons du reste.',
      filters: {
        all: 'Tout voir',
        sacs: 'Sacs',
        chapeaux: 'Chapeaux',
        decoration: 'Décoration',
      },
      addToCart: 'Ajouter à ma sélection',
      added: 'Ajouté ✓',
      instagramTitle: 'Suivez-nous',
      instagramSubtitle: '@natureraphia.mahalia — les coulisses de la boutique et de l’atelier.',
      instagramCta: 'Voir sur Instagram',
    },
    engagements: {
      eyebrow: 'Responsabilité',
      title: 'Une promesse simple et vivante.',
      intro:
        "Le raphia n'est pas qu'une matière : c'est un engagement envers la terre d'Antsirabe et les femmes qui la façonnent, génération après génération.",
      cards: [
        {
          title: '100% Raphia Naturel',
          text: 'Fibre végétale récoltée sans jamais abattre le palmier, dans une logique de cueillette durable et respectueuse des cycles naturels.',
          figure: '100%',
        },
        {
          title: 'Fait main à Antsirabe',
          text: 'Chaque pièce est tressée, teinte et crochetée à la main dans notre atelier, sans chaîne de production industrielle.',
          figure: '12 ans',
        },
        {
          title: 'Commerce Équitable',
          text: "Plus de 40 femmes artisanes rémunérées justement, formées et autonomisées au cœur de la filière vannerie malgache.",
          figure: '40+',
        },
      ],
      quoteText:
        "« Chaque pièce que nous tressons porte une part de notre histoire, de notre terre et de notre fierté. »",
      quoteAuthor: "Les artisanes de l'atelier Nature Raphia, Antsirabe",
    },
    contact: {
      eyebrow: 'Nous trouver',
      title: 'Localisation & Contact',
      intro:
        "La Boutique Mahalia vous accueille au cœur d'Antsirabe, étape incontournable de la RN7. Professionnels, grossistes et concept-stores : notre équipe vous accompagne.",
      addressLabel: 'Adresse',
      landmark: "À proximité immédiate du Grand Hôtel / Avenue de la Gare",
      phoneLabel: 'Téléphone',
      emailLabel: 'Courriel',
      hoursLabel: 'Horaires',
      hoursValue: 'Lundi – Samedi : 08h30 – 18h00',
      hoursClosed: 'Dimanche : Fermé',
      mapCaption: "Boutique Mahalia, Rue de l'Indépendance, Antsirabe",
      b2bTitle: 'Vous êtes un professionnel ?',
      b2bIntro:
        'Concept-stores, boutiques hôtelières, grossistes internationaux : présentez-nous votre projet, nous vous répondons sous 48h.',
      form: {
        name: 'Nom complet',
        company: 'Société (optionnel)',
        email: 'Adresse e-mail',
        country: 'Pays',
        message: 'Votre message',
        submit: 'Envoyer la demande',
        sending: 'Envoi en cours…',
        success: 'Merci ! Votre demande a bien été transmise à notre équipe.',
      },
    },
    cart: {
      title: 'Ma sélection',
      empty: 'Votre sélection est vide.',
      emptyHint: 'Parcourez le Showroom pour ajouter vos pièces favorites.',
      quantity: 'Quantité',
      remove: 'Retirer',
      total: 'Articles',
      itemsCount: 'pièce(s)',
      checkoutCta: 'Valider ma demande de devis',
      continueCta: 'Continuer mes achats',
      modalTitle: 'Ma demande de devis',
      modalIntro:
        'Renseignez vos coordonnées : notre équipe valide la disponibilité et revient vers vous avec un chiffrage personnalisé, incluant les frais d’expédition.',
      formName: 'Nom complet',
      formEmail: 'Adresse e-mail',
      formCountry: 'Pays de destination',
      formCountryPlaceholder: 'Ex : France, Madagascar, Italie…',
      formProfile: "Profil de l'acheteur",
      profileParticulier: 'Particulier',
      profileGrossiste: 'Grossiste / B2B',
      submit: 'Valider ma demande',
      submitting: 'Envoi en cours…',
      successTitle: 'Demande envoyée !',
      successText:
        'Votre récapitulatif a été transmis à l’équipe de la Boutique Mahalia. Nous revenons vers vous très rapidement par e-mail ou WhatsApp.',
      close: 'Fermer',
      recapTitle: 'Récapitulatif',
    },
    whatsapp: {
      label: 'Discuter sur WhatsApp',
      tooltip: 'Une question ? Écrivez-nous directement !',
      defaultMessage:
        "Bonjour Nature Raphia & Mahalia, je souhaiterais avoir plus d'informations sur vos créations.",
    },
    footer: {
      tagline: "L'atelier Nature Raphia et la Boutique Mahalia — artisanat en raphia depuis Antsirabe, Madagascar.",
      linksTitle: 'Navigation',
      contactTitle: 'Contact',
      hoursTitle: 'Horaires',
      rights: 'Tous droits réservés.',
      craftedIn: 'Conçu avec soin à Antsirabe, Madagascar.',
    },
    common: {
      from: 'à partir de',
      langSwitch: 'EN',
    },
  },
  en: {
    meta: {
      title: 'Nature Raphia & Mahalia — Handcrafted Raphia, Antsirabe Madagascar',
      description:
        'Nature Raphia & Boutique Mahalia: handwoven raphia bags, hats and home decor from Antsirabe, Madagascar. From wild fiber to fashion accessory.',
    },
    nav: {
      atelier: 'The Workshop',
      showroom: 'The Showroom',
      engagements: 'Commitments',
      contact: 'Contact',
      cart: 'My Selection',
    },
    hero: {
      eyebrow: 'Antsirabe · Madagascar',
      title: 'From wild fiber to a fashion accessory of exception.',
      subtitle:
        'From the highlands of Antsirabe, our artisans hand-weave every piece, blending heritage, patience and raw beauty into a 100% Malagasy signature.',
      ctaPrimary: 'Discover the Showroom',
      ctaSecondary: 'See the Workshop',
      scroll: 'Scroll to explore',
    },
    atelier: {
      eyebrow: 'Nature Raphia',
      title: 'A craft woven entirely by hand.',
      intro:
        'For twelve years, our artisans in Antsirabe have transformed wild raphia into pieces of exception. Every gesture — harvest, natural dye, crochet — carries the memory of the Malagasy highlands. Nothing is industrial, everything is alive.',
      steps: [
        {
          title: 'Coastal Harvest',
          text: 'Raphia palms are hand-picked along the coast, without ever felling the palm tree, respecting the plant’s natural cycle.',
        },
        {
          title: 'Combing & Sorting',
          text: 'Each fiber is combed, sorted and graded by hand according to its fineness, keeping only the strands destined for our most precious pieces.',
        },
        {
          title: 'Natural Dyeing',
          text: 'The fibers take on color through natural, ethical dyes — clay, bark, indigo — revealing the house’s signature terracotta and ivory palette.',
        },
        {
          title: 'Artisan Crochet',
          text: 'Hand crochet shapes the thread into volumes, motifs and rosettes; each piece is then finished with vegetable leather or zebu horn in Antsirabe.',
        },
      ],
      ctaLabel: 'Step',
    },
    showroom: {
      eyebrow: 'Boutique Mahalia',
      title: 'Our favorite pieces.',
      intro:
        'A selection of the workshop’s most emblematic creations — bags, hats and home decor. Build your selection, we take care of the rest.',
      filters: {
        all: 'View All',
        sacs: 'Bags',
        chapeaux: 'Hats',
        decoration: 'Home Decor',
      },
      addToCart: 'Add to My Selection',
      added: 'Added ✓',
      instagramTitle: 'Follow Us',
      instagramSubtitle: '@natureraphia.mahalia — behind the scenes of the boutique and the workshop.',
      instagramCta: 'View on Instagram',
    },
    engagements: {
      eyebrow: 'Responsibility',
      title: 'A simple, living promise.',
      intro:
        'Raphia is not just a material: it is a commitment to the land of Antsirabe and the women who shape it, generation after generation.',
      cards: [
        {
          title: '100% Natural Raphia',
          text: 'Plant fiber harvested without ever felling the palm tree, following a sustainable, cycle-respectful harvesting logic.',
          figure: '100%',
        },
        {
          title: 'Handmade in Antsirabe',
          text: 'Every piece is woven, dyed and crocheted by hand in our workshop, with no industrial production line.',
          figure: '12 yrs',
        },
        {
          title: 'Fair Trade',
          text: 'More than 40 women artisans fairly paid, trained and empowered at the heart of the Malagasy basketry industry.',
          figure: '40+',
        },
      ],
      quoteText:
        '"Every piece we weave carries a part of our story, our land and our pride."',
      quoteAuthor: 'The artisans of Nature Raphia workshop, Antsirabe',
    },
    contact: {
      eyebrow: 'Find Us',
      title: 'Location & Contact',
      intro:
        'Boutique Mahalia welcomes you in the heart of Antsirabe, an unmissable stop on the RN7. Professionals, wholesalers and concept-stores: our team is here for you.',
      addressLabel: 'Address',
      landmark: 'Right next to the Grand Hôtel / Avenue de la Gare',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      hoursLabel: 'Opening Hours',
      hoursValue: 'Monday – Saturday: 8:30 AM – 6:00 PM',
      hoursClosed: 'Sunday: Closed',
      mapCaption: 'Boutique Mahalia, Rue de l’Indépendance, Antsirabe',
      b2bTitle: 'Are you a professional?',
      b2bIntro:
        'Concept-stores, hotel boutiques, international wholesalers: tell us about your project, we reply within 48h.',
      form: {
        name: 'Full name',
        company: 'Company (optional)',
        email: 'Email address',
        country: 'Country',
        message: 'Your message',
        submit: 'Send request',
        sending: 'Sending…',
        success: 'Thank you! Your request has been sent to our team.',
      },
    },
    cart: {
      title: 'My Selection',
      empty: 'Your selection is empty.',
      emptyHint: 'Browse the Showroom to add your favorite pieces.',
      quantity: 'Quantity',
      remove: 'Remove',
      total: 'Items',
      itemsCount: 'item(s)',
      checkoutCta: 'Submit My Quote Request',
      continueCta: 'Continue Browsing',
      modalTitle: 'My Quote Request',
      modalIntro:
        'Share your details: our team checks availability and comes back to you with a tailored quote, including shipping costs.',
      formName: 'Full name',
      formEmail: 'Email address',
      formCountry: 'Destination country',
      formCountryPlaceholder: 'E.g. France, Madagascar, Italy…',
      formProfile: 'Buyer profile',
      profileParticulier: 'Individual',
      profileGrossiste: 'Wholesaler / B2B',
      submit: 'Submit My Request',
      submitting: 'Sending…',
      successTitle: 'Request Sent!',
      successText:
        'Your recap has been sent to the Boutique Mahalia team. We will get back to you very soon by email or WhatsApp.',
      close: 'Close',
      recapTitle: 'Summary',
    },
    whatsapp: {
      label: 'Chat on WhatsApp',
      tooltip: 'A question? Message us directly!',
      defaultMessage: 'Hello Nature Raphia & Mahalia, I would like more information about your creations.',
    },
    footer: {
      tagline: 'Nature Raphia workshop and Boutique Mahalia — raphia craftsmanship from Antsirabe, Madagascar.',
      linksTitle: 'Navigation',
      contactTitle: 'Contact',
      hoursTitle: 'Opening Hours',
      rights: 'All rights reserved.',
      craftedIn: 'Thoughtfully crafted in Antsirabe, Madagascar.',
    },
    common: {
      from: 'from',
      langSwitch: 'FR',
    },
  },
}
