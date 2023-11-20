
"use client";

import { getProducts } from '@/actions/product.actions';
// import { selectProducts } from '@/reduxSlices/ProductSlice';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const productSelector = (state) => state.product;
const loadingSelector = createSelector(productSelector, (product) => product.loading);
const productsSelector = createSelector(productSelector, (product) => product.products);

const page = () => {

  // const { products, loading } =useSelector((state) => ({ ...state.product}))
  const loading = useSelector(loadingSelector);
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();

  // if (loading) {
  //     return <span className="loading loading-spinner loading-md"></span>;
  //   }
  
  useEffect(() => {
    dispatch(getProducts());
    console.log( 'product',products)
}, [products]);

// let products = dispatch(getProducts());

  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {typeof products === 'object' && products !== null? Object.values(products).map((product)=> (
        <a key={product.id} href={product.href} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            {/* <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            /> */}
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
        </a>
        )):null}
      </div>
    </div>
  </div>
  )
}

export default page