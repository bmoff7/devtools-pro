import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!key || !webhookSecret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 501 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(key)

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

    if (event.type === 'checkout.session.completed') {
      // Payment successful - you could store this in a database
      // For now, the client-side handles activation via URL parameter
      console.log('Payment received:', event.data.object)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
