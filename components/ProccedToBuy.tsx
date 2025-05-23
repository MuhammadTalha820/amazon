import React from 'react'
import Subtotal from './shared/SubTotal'
import { useRouter } from 'next/navigation'

const ProccedToBuy = ({ length, totalPrice }: { length: number, totalPrice: number }) => {
    const router = useRouter()

    return (
        <div className="md:w-[20%] border border-gray-300 rounded-lg p-4 shadow-sm ml-0 md:ml-4 bg-white">
            <p className="text-sm text-gray-700 mb-3">
                <span className="text-[#007600] font-semibold">Your order is eligible for FREE Delivery. </span>
                Choose FREE Delivery option at checkout.
            </p>

            <Subtotal left={true} length={length} totalPrice={totalPrice} />

            <button
                onClick={() => router.push("/checkout")}
                className="bg-[#FFD814] hover:bg-yellow-300 transition-colors duration-200 w-full py-2 rounded-md shadow font-medium text-sm mt-4"
            >
                Proceed to Buy
            </button>
        </div>
    )
}

export default ProccedToBuy
