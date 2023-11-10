
"use client";
// import { deleteProduct } from '@/actions/product.actions';
import Link from 'next/link';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// export default function Products() {

//   const { user } = useSelector((state) => ({ ...state.auth }));
//   const { userProducts, loading } = useSelector((state) => ({ ...state.product }));
//   const userId = user?.result?._id;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (userId) {
//       dispatch(getProductsByUser(userId));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   const excerpt = (str) => {
//     if (str.length > 40) {
//       str = str.substring(0, 40) + " ...";
//     }
//     return str;
//   };

//   if (loading) {
//     return <Spinner />;
//   }

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this tour ?")) {
//       dispatch(deleteProduct({ id, toast }));
//     }
//   };

//   return (
//     <div className="container mt-5">
//     <div className="row">
//       <div className="col-md-12 text-center ">
//       <Link to={`/add`} href="#" className="card-link">Add Data</Link>
//         {userProducts.length === 0 && (
//           <h3 className="text-center">No product available with the user: {user?.result?.name}</h3>

//         )}

//         {userProducts.length > 0 && (
//           <>
//             <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
//             <hr style={{ maxWidth: "570px" }} />
//           </>
//         )}
//       </div>

//       {userProducts &&
//         userProducts.map((item,index) => (
//           <div className='col-md-3' key={index}>
//             <div className="card mb-3" >
//               <img src={item.imageFile} className="card-img-top img-thumbnail rounded" alt={item.title} />
//               <div className="card-body">
//                 <h5 className="card-title">{item.title}</h5>
//                 <p className="card-text"> {excerpt(item.description)}</p>
//                 <Link to={`/edit/${item._id}`} href="#" className="card-link">Edit</Link>
//                 <Link  to="#" className="card-link" onClick={() => handleDelete(item._id)}>Delete</Link>
//                 <Link to={`/view/${item._id}`} href="#" className="card-link">View</Link>

//               </div>
//             </div>

//           </div>
//         ))}

//     </div>
//   </div>
//   );
// }

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import AddProductEdit from '@/components/AddProductEdit';
import { openEditModal } from '@/actions/modals.actions';

export default function Page() {
  // const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  const { isOpen } = useSelector((state) => ({ ...state.modal }));
 
  const { user } = useSelector((state) => ({ ...state.auth }));
    const { userProducts, loading } = useSelector((state) => ({ ...state.product }));
    const userId = user?.result?._id;

  return (
    <>
    <div className="container mt-5">
         <div className="row">
           <div className="col-md-12 text-center ">
           <Link to={`/add`} href="#" onClick={()=>dispatch(openEditModal({id}))} className="card-link" >Add Data</Link>
           {userProducts.length === 0 && (
              <h3 className="text-center">No product available with the user: {user?.result?.name}</h3>
    
            )}
    
           {userProducts.length > 0 && (
              <>
                <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
                <hr style={{ maxWidth: "570px" }} />
              </>
            )}
          </div>
    
          {userProducts &&
            userProducts.map((item,index) => (
              <div className='col-md-3' key={index}>
                <div className="card mb-3" >
                  <img src={item.imageFile} className="card-img-top img-thumbnail rounded" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text"> {excerpt(item.description)}</p>
                    <Link to={`/edit/${item._id}`} href="#" className="card-link">Edit</Link>
                    <Link  to="#" className="card-link" onClick={() => handleDelete(item._id)}>Delete</Link>
                    <Link to={`/view/${item._id}`} href="#" className="card-link">View</Link>
    
                  </div>
                </div>
    
              </div>
            ))}
    
        </div>
      </div>
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

              <AddProductEdit />
              {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel> */}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
