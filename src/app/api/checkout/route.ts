import { NextResponse } from 'next/server'

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'Stripe is not configured. See .env.example for setup instructions.' },
      { status: 501 }
    )
  }

  // Dynamic import so the app works without stripe installed in production
  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(key)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'DevTools Pro - Lifetime Access',
            description: 'Unlock all premium features forever',
          },
          unit_amount: 999,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/?pro=activated`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/`,
  })

  return NextResponse.json({ url: session.url })
}
