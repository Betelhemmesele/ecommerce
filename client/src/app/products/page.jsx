
"use client";
import { openEditModal } from '@/actions/modals.actions';
import { getProductsByUser } from '@/actions/product.actions';
import AddProductEdit from '@/components/AddProductEdit';
import ProductCard from '@/components/ProductCard';
import { startPolling } from '@/reduxSlices/ProductSlice';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const productSelector = (state) => state.product;
const loadingSelector = createSelector(productSelector, (product) => product.loading);
const productsSelector = createSelector(productSelector, (product) => product.userProducts);

const authSelector = (state) => state.auth;
const userInfoSelector = createSelector(authSelector, (auth) => auth.userInfo);

export default function Products() {

  const dispatch = useDispatch();

  const {isOpen} = useSelector((state)=>({...state.modal}))

  const loading = useSelector(loadingSelector);
  const userProducts = useSelector(productsSelector);

  const userInfo = useSelector(userInfoSelector);

  useEffect(() => {
    dispatch(getProductsByUser(userInfo.id));
    console.log('products',userProducts)
}, [userProducts]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <button type="button" className="flex mb-10 items-center justify-center bg-green-500 border border-green-400 rounded-sm shadow-sm font-semibold text-white px-5 py-2.5 hover:bg-green-400 hover:shadow-md active:bg-green-600 active:border-green-600" onClick={()=>dispatch(openEditModal())}>
          <span className="mr-3">Add Product</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="h-5 w-5">
            <line y2="19" y1="5" x2="12" x1="12"></line>
            <line y2="12" y1="12" x2="19" x1="5"></line>
          </svg>
        </button>
        <dialog className="modal" open={isOpen}>
          <div className="modal-box">
            <AddProductEdit />
          </div>
        </dialog>
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-3 gap-[80px]">
        {typeof userProducts === 'object' && userProducts !== null? Object.values(userProducts).map((product)=> (
          <ProductCard key={product.id} product={product}/>
)):null}
        </div>
      </div>
    </div>
  );
}
