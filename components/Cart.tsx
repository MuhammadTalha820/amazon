"use client"
import React from 'react'
import ShoppingCart from './ShoppingCart'
import ProccedToBuy from './ProccedToBuy'
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';

const Cart = () => {
    const cart = useAppSelector(getCart);

    let totalPrice = 0;
    cart.forEach((item: any) => {
        totalPrice = item.price * item.quantity

    })
    return (
        <div className='flex'>
            <ShoppingCart cart={cart} totalPrice={totalPrice} />
            <ProccedToBuy length={cart.length} totalPrice={totalPrice} />
        </div>
    )
}

export default Cart
