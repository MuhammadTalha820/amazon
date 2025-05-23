'use client'

import React, { useEffect } from 'react'
import SingleProduct from '@/components/SingleProduct'
import { useParams } from 'next/navigation'
import { useSupabase } from '@/lib/supabase/hooks/useSupabase'

const ProductPage = () => {
    const { id } = useParams()
    const { singleProduct, getSingleProduct } = useSupabase()

    useEffect(() => {
        if (id) {
            getSingleProduct(Number(id))
        }
    }, [id, getSingleProduct]) // ✅ added getSingleProduct to deps

    return (
        <div>
            {singleProduct.length > 0 ? (
                <SingleProduct singleProduct={singleProduct} />
            ) : (
                <p className='text-center mt-10'>Loading product...</p>
            )}
        </div>
    )
}

export default ProductPage
