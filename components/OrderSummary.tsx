'use client'

import { useAppSelector } from '@/lib/supabase/hooks/redux'
import { supabase } from '@/lib/supabase/products'
import { getCart } from '@/redux/cartSlice'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY! || "pk_test_51Qw54rCFG39077d0Rbtg1NUuCAzNay1cvI2ytBTs58hTSmnD8o7HmGjtuNwVhn1W2PGohFW8bRp5g4WUZ2lwSUNm00U6B67l01")

const OrderSummary = ({ totalPrice }: { totalPrice: number }) => {
    const cart = useAppSelector(getCart)

    const createStripeSession = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const stripe = await stripePromise

        const response = await fetch("/api/checkout-sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: cart,
                email: user?.email
            })
        });

        const checkoutSession = await response.json();

        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.id
        });

        if (result?.error) {
            console.log(result.error.message);
        }
    };

    return (
        <div>
            <div className='border border-gray p-4 mt-5 h-fit'>
                <div>
                    <h1 className='font-bold text-xl mb-5'>Order Summary</h1>
                    <div className='text-xs'>
                        <div className='flex items-center justify-between'>
                            <p>items</p>
                            <p>₹749.00</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Delivery:</p>
                            <p>₹40.00</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Total:</p>
                            <p>₹789.00</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Promotion Applied:</p>
                            <p>-₹40.00</p>
                        </div>
                        <div className='flex justify-between text-2xl font-bold text-[#B12704] py-2 border-t border-b border-gray-300 my-1'>
                            <h1>Order Total: </h1>
                            <h1>${totalPrice}</h1>
                        </div>
                    </div>
                    <button
                        onClick={createStripeSession}
                        className='bg-[#FFD814] w-full rounded-md px-4 py-1 my-3'>Place Your Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
