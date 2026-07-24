export interface WhatsAppSendPayload {
  to: string;
  message: string;
}

export const whatsappService = {
  async sendMessage(payload: WhatsAppSendPayload): Promise<boolean> {
    const response = await fetch('/api/whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Échec d’envoi WhatsApp: ${response.status} ${errorText}`);
    }

    return true;
  }
};
