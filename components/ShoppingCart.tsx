"use client"

import { useAppDispatch, useAppSelector } from '@/lib/supabase/hooks/redux';
import { clearAllCart, decrementQuantity, getCart, incrementQuantity, removeFromTheCart } from '@/redux/cartSlice'; // later you can add increment/decrement actions
import Image from 'next/image';
import React from 'react';
import Subtotal from './shared/SubTotal';

const ShoppingCart = ({ cart, totalPrice }: { cart: any, totalPrice: number }) => {
    const dispatch = useAppDispatch();

    return (
        <div className='w-[90%] md:w-[70%] mx-auto'>
            <div className='flex justify-between items-center border-b border-gray-300 py-5'>
                <h1 className='font-bold text-2xl'>Shopping Cart</h1>
                <h1 className='font-medium'>Price</h1>
            </div>

            {cart.length === 0 ? (
                <p className='text-center py-10 text-gray-500'>Your cart is empty.</p>
            ) : (
                cart.map((product: any) => (
                    <div key={product.id} className='py-4 flex justify-between border-b border-gray-200'>
                        <div className='flex'>
                            <Image src={product.image} width={100} height={100} alt={product.title} />
                            <div className='ml-4'>
                                <h1 className='font-medium'>{product.title}</h1>
                                <p className='text-[#007600] font-bold my-1 text-xs'>In Stock</p>
                                <button
                                    onClick={() => dispatch(removeFromTheCart(product.id))}
                                    className='font-bold text-red-600 cursor-pointer w-fit'
                                >
                                    REMOVE
                                </button>
                                <div className='flex text-xl my-4 font-medium items-center bg-gray-200 rounded-md px-5 py-1 w-fit'>
                                    <button
                                        onClick={() =>
                                            product.quantity > 1 &&
                                            dispatch(decrementQuantity(product))}
                                        className='cursor-pointer mr-4'
                                    >
                                        -
                                    </button>
                                    <div>{product.quantity}</div>
                                    <button
                                        onClick={() => dispatch(incrementQuantity(product))}
                                        className='cursor-pointer ml-4'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-bold text-xl'>${product.price}</h1>
                            <p className='text-xs py-1'>
                                M.R.P.: <span className='line-through'>₹3,995.00</span>
                            </p>
                        </div>
                    </div>
                ))
            )}

            {cart.length > 0 && (
                <h1
                    onClick={() => dispatch(clearAllCart())}
                    className='text-red-600 font-bold cursor-pointer py-4 text-center'
                >
                    CLEAR ALL
                </h1>
            )}

            <Subtotal left={false} length={cart.length} totalPrice={totalPrice} />
            <h1>${totalPrice}</h1>
        </div>
    );
};

export default ShoppingCart;
