
"use client";
import { closeEditModal } from '@/actions/modals.actions';
import { deleteProduct, getProductsByUser } from '@/actions/product.actions';
import AddProductEdit from '@/components/AddProductEdit';
import ProductCard from '@/components/ProductCard';
import useProductDetails from '@/hooks/useProductDetails';
// import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Products() {

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userProducts, loading } = useSelector((state) => ({ ...state.product }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  const {id} = useSelector((state) => ({...state.modal}))

  useEffect(() => {
    if (userId) {
      dispatch(getProductsByUser());
    }
  }, [userId]);

  // if (loading) {
  //   return <span className="loading loading-spinner loading-md"></span>;
  // }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteProduct({ id, toast }));
    }
  };
  const  productUpdate = useProductDetails(userProducts.title, userProducts.description, userProducts.price, userProducts.category, userProducts.tags )

  return (
<div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <button className="btn mb-10" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Product</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p> */}
          <AddProductEdit id/>
          <div className="modal-action">
            <form method="dialog" className='flex gap-10 '>
              {/* if there is a button in form, it will close the modal */}
              
              <button className="w-24 px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"  onClick={()=>productUpdate.addProduct()}>Save</button>
              <button className="w-24 px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gray-500 hover:bg-gray-600 hover:shadow-lg focus:outline-none"  onClick={()=>dispatch(closeEditModal())}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
          {/* {products.map((product) => ( */}
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
      </div>
    </div>
  );
}
