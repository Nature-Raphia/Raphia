import emailjs from '@emailjs/browser';

// Vérifier la configuration
const checkConfiguration = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

  console.log('📧 EmailJS Configuration:', {
    publicKey: publicKey ? '✅ Présente' : '❌ Manquante',
    serviceId: serviceId ? '✅ Présent' : '❌ Manquant',
    templateId: templateId ? '✅ Présent' : '❌ Manquant'
  });

  if (publicKey) {
    emailjs.init(publicKey);
    return true;
  }
  return false;
};

// Initialiser au chargement
checkConfiguration();

export const contactEmailService = {
  async sendContactEmail(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    type: 'contact' | 'b2b';
  }): Promise<void> {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Vérifications
      if (!publicKey) {
        throw new Error('VITE_EMAILJS_PUBLIC_KEY manquant dans .env');
      }
      if (!serviceId) {
        throw new Error('VITE_EMAILJS_SERVICE_ID manquant dans .env');
      }
      if (!templateId) {
        throw new Error('VITE_EMAILJS_CONTACT_TEMPLATE_ID manquant dans .env');
      }

      console.log('📧 Envoi de l\'email de contact...');
      console.log('📧 Service ID:', serviceId);
      console.log('📧 Template ID:', templateId);
      console.log('📧 Destinataire: admin@nature-raphia.com');

      const templateParams = {
        to_email: 'admin@nature-raphia.com',
        to_name: 'Admin Nature Raphia',
        contact_name: data.name,
        contact_email: data.email,
        contact_phone: data.phone || 'Non renseigné',
        contact_subject: data.subject,
        contact_message: data.message,
        contact_type: data.type === 'b2b' ? '📋 Demande B2B / Grossiste' : '📧 Message de contact',
        date: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        subject: `📩 Nouveau message de contact - ${data.name}`
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('✅ Email envoyé avec succès!', response);
      return response;

    } catch (error: any) {
      console.error('❌ Erreur détaillée:', error);
      throw error;
    }
  }
};