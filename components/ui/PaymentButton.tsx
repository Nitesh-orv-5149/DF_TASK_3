'use client';

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentButton({disabled, onSuccess, priceObject} : {disabled:boolean, onSuccess: () => void, priceObject: {numberOfSeats: number, price: number}}) {

    const handleCheckout = async () => {
        const response = await axios.post('/api/checkout', priceObject);
        const { id: sessionId } = response.data;
        console.log("Stripe session ID:", sessionId);
    
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({ sessionId });
    
        if (result?.error) {
            console.error("Stripe redirect error:", result.error.message);
        }
    
        onSuccess();
    };    

    return (
        <button onClick={handleCheckout}
                disabled={disabled}
                className="disabled:cursor-not-allowed disabled:bg-dark-1 mt-6 w-full p-3 border-2 rounded-full font-extrabold text-dark-2 bg-light-1 hover:bg-light-2 duration-100 transition-all"
        >
            pay now
        </button>
    )
}