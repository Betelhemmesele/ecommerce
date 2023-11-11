import { closeEditModal } from "@/actions/modals.actions"
import { createProduct, updateProduct } from "@/actions/product.actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4} from 'uuid'


function useProductDetails(tit="", desc="", pri="", cat="", ta=[]) {

    const [title, setTitle] = useState(tit);
    const [description, setDescription] = useState(desc);
    const [price, setPrice] = useState(pri);
    const [category, setCategory] = useState(cat);
    const [tag, setTag] =useState(ta);

    const dispatch = useDispatch();

    useEffect(()=>{
        setTitle(tit)
        setDescription(desc);
        setPrice(pri);
        setCategory(cat);
        setTag(ta);
    },[tit, desc, pri, cat, ta]);

    function editProduct(id){
        dispatch(
            updateProduct(
                id,
                {
                    id,
                    title,
                    description,
                    price,
                    category,
                    tag,
                },)
        )
        dispatch(closeEditModal())
        resetValues()
    }
    function addProduct() {
        dispatch(createProduct({
            id: uuidv4(),
            title,
                    description,
                    price,
                    category,
                    tag,
        }))
        resetValues()
    }
    function resetValues(){
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setTag([]);
    }
    

    return {
        title, setTitle, description, setDescription, price, setPrice, category, setCategory, tag, setTag, addProduct, editProduct
    }
}

export default useProductDetails