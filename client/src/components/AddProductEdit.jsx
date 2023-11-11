"use client";
import { closeEditModal } from "@/actions/modals.actions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  tags: [],
};

const AddProductEdit = ({ id }) => {
  const [productData, setProductData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, userProducts } = useSelector((state) => ({
    ...state.product,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const { title, description, price, category, tags } = productData;

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

  const removeTagData = (deleteTag) => {
    setTourData({
      ...productData,
      tags: productData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const addTagData = (event) => {
    setTagErrMsg(null);
    if (event.target.value !== "") {
      setProductData({
        ...productrData,
        tags: [...productData.tags, event.target.value],
      });
      event.target.value = "";
    }
  };

  const onImageChange = (event) => {
    console.log(event.target.files[0]);
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setProductData({ ...productData, imageFile: e.target.result });
    };
  };

  const [showError, setShowError] = useState(false);

  return (
    <div>
      {/* <div className="container-fluid">
        <div className="form-box">
          {/* <h1>Add</h1> 

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
          </form>
        </div>
      </div> */}

      <div className="bg-gray-100 p-0 sm:p-[12px]">
        <div className="mx-auto px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Create your product</h1>
          <form id="form">
            <div className="relative z-0 w-full mb-5">
              <input
                id="name"
                type="text"
                value={title || ""}
                name="title"
                placeholder="Title of the product"
                onChange={onInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <span
                className={`text-sm text-red-600 ${showError ? "" : "hidden"}`}
                id="error"
              >
                Name is required
              </span>
            </div>

            <div>
              <textarea
                className="w-full rounded-lg border-gray-600 p-3 text-sm"
                placeholder="Give some description for the product"
                rows="8"
                id="message"
                onChange={onInputChange}
              ></textarea>
            </div>

            <div className="relative z-0 w-full mb-5">
              <select
                id="category"
                name="category"
                onClick={(e) => e.target.setAttribute("value", e.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              >
                <option
                  value=""
                  selected
                  disabled
                  hidden
                  className="text-gray-500"
                ></option>
                <option value={category || "computers"}>
                  Computers and Laptops
                </option>
                <option value={category || "mobile"}>Mobile Devices</option>
                <option value={category || "tv"}>
                  Televisions and Home Theater
                </option>
                <option value="audio">Audio and Headphones</option>
                <option value="cameras">Cameras and Photography</option>
                <option value="gaming">Gaming</option>
                <option value="appliances">Home Appliances</option>
                <option value="smart-home">Smart Home Devices</option>
                <option value="wearable">Wearable Technology</option>
                <option value="accessories">Accessories and Cables</option>
              </select>
              <span
                className={`text-sm text-red-600 ${showError ? "" : "hidden"}`}
                id="error"
              >
                Option has to be selected
              </span>
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                className="form-control"
                id="price"
                type="number"
                value={price || ""}
                name="price"
                placeholder="0"
                onChange={onInputChange}
              />
              <span
                className={`text-sm text-red-600 ${showError ? "" : "hidden"}`}
                id="error"
              >
                Price is required
              </span>
            </div>

            <div className="relative z-0 w-full mb-5">
            <label htmlFor="image" className="text-gray-500">Add Image</label>
            <input
              accept="image/*"
              onChange={onImageChange}
              name="image"
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
            />
            <span
                className={`text-sm text-red-600 ${showError ? "" : "hidden"}`}
                id="error"
              >
              Image file is required
            </span>
            </div>

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
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  type="text"
                  onKeyUp={(event) =>
                    event.key === "Enter" ? addTagData(event) : null
                  }
                  placeholder="Press enter to add a tag"
                />
                <span
                className={`text-sm text-red-600 ${showError ? "" : "hidden"}`}
                id="error"
              >
              Tag is required
            </span>
              </div>

            {/* Rest of the form code goes here */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductEdit;
