// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { numberOfSeats, price } = body
        if (!price || isNaN(price)) {
          return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Test Product',
                },
                unit_amount: Math.round(price * 100), 
              },
              quantity: numberOfSeats, 
            },
          ],
          success_url: `${req.headers.get("origin")}/booking/success`,
          cancel_url: `${req.headers.get("origin")}/booking/cancel`,
        });
      
        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        return NextResponse.json({ error: 'Failed to create Stripe session' }, { status: 500 });
    }
}
