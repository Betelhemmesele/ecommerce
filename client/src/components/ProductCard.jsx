import { openEditModal } from "@/actions/modals.actions";
import { deleteProduct } from "@/actions/product.actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddProductEdit from "./AddProductEdit";


function ProductCard({product}) {
  const dispatch = useDispatch();

  const {isOpen} = useSelector((state)=>({...state.modal}))

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product info ?")) {
      dispatch(deleteProduct({ id, toast }));
    }
  };
  
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg h-[300px]"
          src="https://media.istockphoto.com/id/951065424/photo/smart-watch-isolated.jpg?s=612x612&w=0&k=20&c=gnopenHjgIKJIb_WcYqgxEXwEnv2-E_xaqlu-o9jbno="
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {/* Noteworthy technology acquisitions 2021 */}
            {product.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {/* Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order. */}
          {product.description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.price}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.tag}
        </p>
        <div className="card-actions justify-between">
          <button className="flex items-center justify-center bg-white border border-gray-200 rounded-sm shadow-sm font-medium text-green-800 px-5 py-2.5 hover:bg-gray-100 hover:text-gray-600 hover:shadow-md active:bg-gray-200 active:text-gray-600"
          onClick={()=>dispatch(openEditModal())}>
            Edit
          </button>
          <button onClick={()=>{handleDelete(product.id)}} className="flex items-center justify-center bg-white border border-gray-200 rounded-sm shadow-sm font-medium text-red-800 px-5 py-2.5 hover:bg-gray-100 hover:text-gray-600 hover:shadow-md active:bg-gray-200 active:text-gray-600">
            Delete
          </button>
        </div>
        <dialog className="modal" open={isOpen}>
          <div className="modal-box">
            <AddProductEdit id={product.id}/>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default ProductCard;
