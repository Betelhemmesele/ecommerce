import { closeEditModal } from "@/actions/modals.actions";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const initialState = {
    title: "",
    description: "",
    price:"",
    category:"",
    tags: [],
  };

const AddProductEdit = ({isOpen, productData}) => {

    // const [productData, setProductData] = useState(productData);
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const { error, userProducts } = useSelector((state) => ({
      ...state.product,
    }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useRouter();

    const { title, description, price, category, tags } = ProductData;

    useEffect(() => {
        if (id) {
          const singleProduct = userProducts.find((product) => product._id === id);
          console.log(singleProduct);
          setProductData({ ...singleProduct });
        }
    
      }, [id]);

      useEffect(() => {
        error && toast.error(error);
      }, [error]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!tags.length) {
          setTagErrMsg("Please provide some tags");
        }
        if (title && description && price && category && tags) {
          const updatedProductData = { ...productData, name: user?.result?.name };
    
          if (!id) {
            dispatch(createProduct({ updatedProductData, navigate, toast }));
          } else {
            dispatch(updateProduct({ id, updatedProductData, toast, navigate }));
          }
          handleClear();
        }
      };
    
      const onInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
      };

      const handleClear = () => {
        setProdcutData({ title: "", description: "", price:"", category:"" , tags: [] });
      };

      const removeTagData = deleteTag => {

        setTourData({
          ...productData,
          tags: productData.tags.filter((tag) => tag !== deleteTag),
        });
      };

      const addTagData = event => {

        setTagErrMsg(null);
        if (event.target.value !== '') {
          setProdcutData({ ...productrData, tags: [...productData.tags, event.target.value] });
          event.target.value = '';
        }
      };
    
    
      const onImageChange = event => {
        console.log(event.target.files[0]);
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
    
        reader.onload = (e) => {
    
          setProductData({ ...productData, imageFile: e.target.result })
        }
    
      };

  return (
    <div open={isOpen}>
      <div className="container-fluid">
        <div className="form-box">
          {/* <h1>Add</h1> */}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                type="text"
                value={title || ""}
                name="title"
                placeholder="Name"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Description</label>
              <textarea
                className="form-control"
                id="message"
                value={description}
                name="description"
                placeholder="description"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                className="form-control"
                id="price"
                type="number"
                value={price || ""}
                name="price"
                placeholder="0"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group">
              <label for="category">Select the category:</label>
              <select id="category" name="category">
                <option value={ category || "computers"}>Computers and Laptops</option>
                <option value={ category || "mobile"}>Mobile Devices</option>
                <option value={ category || "tv"}>Televisions and Home Theater</option>
                <option value="audio">Audio and Headphones</option>
                <option value="cameras">Cameras and Photography</option>
                <option value="gaming">Gaming</option>
                <option value="appliances">Home Appliances</option>
                <option value="smart-home">Smart Home Devices</option>
                <option value="wearable">Wearable Technology</option>
                <option value="accessories">Accessories and Cables</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Image</label>
              <input
                className="form-control"
                accept="image/*"
                onChange={onImageChange}
                type="file"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Tag</label>
              <div className="tag-input">
                <ul className="tags">
                  {tags &&
                    tags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span className="tag-title">{tag}</span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeTagData(tag)}
                        >
                          x
                        </span>
                      </li>
                    ))}
                </ul>
                <input
                  className="tag_input"
                  type="text"
                  onKeyUp={(event) =>
                    event.key === "Enter" ? addTagData(event) : null
                  }
                  placeholder="Press enter to add a tag"
                />
              </div>
            </div>

            <input
              className="btn btn-primary"
              type="submit"
              defaultValue="Submit"
              onClick={()=>dispatch(closeEditModal())}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductEdit;
