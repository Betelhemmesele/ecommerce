// import { closeEditModal } from "@/actions/modals.actions"
// import { createProduct, updateProduct } from "@/actions/product.actions";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { v4 as uuidv4} from 'uuid'


// function useProductDetails(tit="", desc="", pri="", cat="", ta=[], id, initialState = {
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     tags: [],
//   }) {

//     const [title, setTitle] = useState(tit);
//     const [description, setDescription] = useState(desc);
//     const [price, setPrice] = useState(pri);
//     const [category, setCategory] = useState(cat);
//     const [tag, setTag] =useState(ta);


//   const [productData, setProductData] = useState(initialState);

    

//     const dispatch = useDispatch();

//     useEffect(()=>{
//         setTitle(tit)
//         setDescription(desc);
//         setPrice(pri);
//         setCategory(cat);
//         setTag(ta);
//     },[tit, desc, pri, cat, ta]);

//     function editProduct(id){
//         dispatch(
//             updateProduct(
//                 id,
//                 {
//                     id,
//                     userid,
//                     title,
//                     description,
//                     price,
//                     category,
//                     tag,
//                 },)
//         )
//         dispatch(closeEditModal())
//         resetValues()
//     }
//     function addProduct() {
//         dispatch(createProduct({
//             id: uuidv4(),
//             useid: id,
//             title,
//             description,
//             price,
//             category,
//             tag,
//         }))
//         resetValues()
//     }

//     // function handleSubmit() {
//     //     if (!tag.length) {
//     //       setTagErrMsg("Please provide some tags");
//     //     }
//     //     if (title && description && price && category && tags) {
//     //       const updatedProductData = { ...productData, name: user?.result?.name };
      
//     //       if (!id) {
//     //         dispatch(createProduct({ updatedProductData, navigate, toast }));
//     //       } else {
//     //         dispatch(updateProduct({ id, updatedProductData, toast, navigate }));
//     //       }
//     //       handleClear();
//     //     }
//     //   };
//     function resetValues(){
//         setTitle('');
//         setDescription('');
//         setPrice('');
//         setCategory('');
//         setTag([]);
//     }
    

//     return {
//         title, setTitle, description, setDescription, price, setPrice, category, setCategory, tag, setTag,  addProduct, editProduct, setProductData, productData
//     }
// }

// export default useProductDetails