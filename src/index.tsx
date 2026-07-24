import { Hono } from 'hono'
import { renderer } from './renderer'

interface WhatsAppBindings {
  WHATSAPP_ACCESS_TOKEN?: string
  WHATSAPP_PHONE_ID?: string
  WHATSAPP_API_VERSION?: string
  WHATSAPP_API_URL?: string
}

const app = new Hono<{ Bindings: WhatsAppBindings }>()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

app.post('/api/whatsapp', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({})) as { to?: string; message?: string }
    const to = body.to
    const message = body.message
    const accessToken = c.env.WHATSAPP_ACCESS_TOKEN
    const phoneId = c.env.WHATSAPP_PHONE_ID
    const apiVersion = c.env.WHATSAPP_API_VERSION || 'v20.0'
    const apiBaseUrl = c.env.WHATSAPP_API_URL || 'https://graph.facebook.com'

    if (!accessToken || !phoneId || !to || !message) {
      return c.json({ success: false, error: 'Configuration WhatsApp incomplète' }, 400)
    }

    const response = await fetch(`${apiBaseUrl}/${apiVersion}/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      return c.json({ success: false, error: result }, response.status)
    }

    return c.json({ success: true, result })
  } catch (error) {
    return c.json({ success: false, error: 'Échec de l’envoi WhatsApp' }, 500)
  }
})

export default app
