import emailjs from '@emailjs/browser';
import { QuoteRequest } from '../types';

// Initialiser EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const emailService = {
  // Envoyer un email de confirmation au client
  async sendQuoteConfirmation(quote: QuoteRequest): Promise<void> {
    try {
      // Construire la liste des articles
      const itemsList = quote.items.map(item => 
        `- ${item.product.name.fr} x${item.quantity} : ${(item.product.price * item.quantity).toLocaleString()} Ar`
      ).join('\n');

      // Préparer les paramètres du template
      const templateParams = {
        // Destinataire (la personne qui fait la demande)
        to_email: quote.customer.email,
        to_name: quote.customer.name,
        
        // Informations du devis
        quote_id: quote.id,
        quote_date: new Date(quote.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        
        // Informations client
        customer_name: quote.customer.name,
        customer_email: quote.customer.email,
        customer_phone: quote.customer.phone || 'Non renseigné',
        customer_company: quote.customer.company || 'Non renseigné',
        customer_country: quote.customer.country || 'Non renseigné',
        customer_message: quote.customer.message || 'Aucun message',
        
        // Articles et total
        items: itemsList,
        total: (quote.totalEstimate || 0).toLocaleString(),
        
        // Message personnalisé
        message: `Bonjour ${quote.customer.name},\n\nMerci pour votre demande de devis. Voici les détails de votre demande :\n\n${itemsList}\n\nTotal estimé : ${(quote.totalEstimate || 0).toLocaleString()} Ar\n\nNotre équipe vous contactera dans les plus brefs délais pour finaliser votre commande.\n\nCordialement,\nL'équipe Nature Raphia`,
        
        // Réponse
        reply_to: 'contact@nature-raphia.com',
        
        // Sujet
        subject: `Demande de devis - ${quote.id}`
      };

      console.log('📧 Envoi de l\'email à:', quote.customer.email);
      
      // Envoyer l'email
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Email envoyé avec succès à', quote.customer.email);
      return response;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  },

  // Envoyer une notification à l'admin (optionnel)
  async sendAdminNotification(quote: QuoteRequest): Promise<void> {
    try {
      const itemsList = quote.items.map(item => 
        `- ${item.product.name.fr} x${item.quantity} : ${(item.product.price * item.quantity).toLocaleString()} Ar`
      ).join('\n');

      const templateParams = {
        to_email: 'admin@nature-raphia.com',
        to_name: 'Admin Nature Raphia',
        subject: `📋 Nouvelle demande de devis - ${quote.id}`,
        quote_id: quote.id,
        customer_name: quote.customer.name,
        customer_email: quote.customer.email,
        customer_phone: quote.customer.phone || 'Non renseigné',
        customer_company: quote.customer.company || 'Non renseigné',
        customer_country: quote.customer.country || 'Non renseigné',
        customer_message: quote.customer.message || 'Aucun message',
        items: itemsList,
        total: (quote.totalEstimate || 0).toLocaleString(),
        message: `Nouvelle demande de devis reçue de ${quote.customer.name}.\n\nDétails :\n${itemsList}\n\nTotal estimé : ${(quote.totalEstimate || 0).toLocaleString()} Ar\n\nVeuillez traiter cette demande dans les plus brefs délais.`
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Notification admin envoyée');
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de la notification admin:', error);
    }
  }
};