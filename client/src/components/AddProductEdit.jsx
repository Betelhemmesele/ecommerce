"use client";
import { closeEditModal } from "@/actions/modals.actions";
import { createProduct, updateProduct } from "@/actions/product.actions";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  tags: ["black", "small", "slim", "LED"],
  image: null,
  userId: "",
};

const authSelector = (state) => state.auth;
const userInfoSelector = createSelector(authSelector, (auth) => auth.userInfo);

const AddProductEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [productData, setProductData] = useState(initialState);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const userInfo = useSelector(userInfoSelector);

  const { title, description, price, category, tags } = productData;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    setProductData((prevState) => ({
      ...prevState,
      userId: userInfo.id,
    }));
  };

  const removeTagData = (deleteTag) => {
    setProductData({
      ...productData,
      tags: productData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const addTagData = (event) => {
    setTagErrMsg(null);
    if (event.target.value !== "") {
      setProductData({
        ...productData,
        tags: [...productData.tags, event.target.value],
      });
      event.target.value = "";
    }
  };

  // const onImageChange = (event) => {
  //   console.log(event.target.files[0]);
  //    setSelectedFile(event.target.files[0]);
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(selectedFile);
  //   reader.onload = () => {
  //     const blob = new Blob([reader.result], { type: selectedFile.type });
  //     uploadImage(blob);
  //   }
  // };

  // const uploadImage = (blob) => {
  //   const formData = new FormData();
  //   formData.append('image', blob, selectedFile.name);

  //   setProductData({ ...productData, images: formData });
  // }

  const onImageChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
    setProductData({ ...productData, image: selectedFiles });
  };

  const renderPreviewImages = () => {
    return selectedFiles.map((file, index) => (
      <img
        key={index}
        src={URL.createObjectURL(file)}
        alt="Preview"
        style={{ width: "30%" }}
      />
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    if (id) {
      dispatch(updateProduct({ id, productData }));
    } else {
      dispatch(createProduct(productData));
    }
    setProductData({});
  };

  return (
    <form
      action="/upload"
      method="POST"
      enctype="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="relative  flex  justify-center bg-center bg-gray-50 py-[25px] px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover  items-center">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full  p-10 bg-white rounded-xl shadow-lg z-10">
          <div className="grid  gap-8 grid-cols-1">
            <div className="flex flex-col ">
              <div className="flex flex-col sm:flex-row items-center">
                <h2 className="font-semibold text-lg mr-auto">Product Info</h2>
                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
              </div>
              <div className="mt-5">
                <div className="form">
                  <div className="md:space-y-2 mb-3">
                    <label className="text-xs font-semibold text-gray-600 py-2">
                      Product image
                      <abbr className="hidden" title="required">
                        *
                      </abbr>
                    </label>
                    <div className="flex gap-1">
                      <div className="w-[180px]">{renderPreviewImages()}</div>
                      <label className="cursor-pointer ">
                        <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                          Browse image
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          multiple="multiple"
                          // accept="image/*"
                          onChange={onImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        Product Name <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="iphone, Mac"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="title"
                        id="name"
                        value={title || ""}
                        onChange={onInputChange}
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <label className="font-semibold text-gray-600 py-2">
                        Price <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="1000 in birr"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="number"
                        name="price"
                        id="price"
                        value={price || ""}
                        onChange={onInputChange}
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        Give tag
                      </label>
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
                        placeholder="Press enter to add a tag"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        type="text"
                        name="tag"
                        id="tag"
                        onKeyUp={(event) =>
                          event.key === "Enter" ? addTagData(event) : null
                        }
                      />
                    </div>
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        Category<abbr title="required">*</abbr>
                      </label>
                      <select
                        className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                        required="required"
                        name="category"
                        id="category"
                        value={category || ""}
                        onChange={onInputChange}
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="text-gray-500"
                        >
                          Select the category
                        </option>
                        <option value={"computers"}>
                          Computers and Laptops
                        </option>
                        <option value={"mobile"}>Mobile Devices</option>
                        <option value={"tv"}>
                          Televisions and Home Theater
                        </option>
                        <option value="audio">Audio and Headphones</option>
                        <option value="cameras">Cameras and Photography</option>
                        <option value="gaming">Gaming</option>
                        <option value="appliances">Home Appliances</option>
                        <option value="smart-home">Smart Home Devices</option>
                        <option value="wearable">Wearable Technology</option>
                        <option value="accessories">
                          Accessories and Cables
                        </option>
                      </select>
                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div className="flex-auto w-full mb-1 text-xs space-y-2">
                    <label className="font-semibold text-gray-600 py-2">
                      Description
                    </label>
                    <textarea
                      required=""
                      name="description"
                      id="message"
                      className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                      placeholder="Enter your Product info"
                      spellCheck="false"
                      value={description || ""}
                      onChange={onInputChange}
                    ></textarea>
                    <p className="text-xs text-gray-400 text-left my-3">
                      You inserted 0 characters
                    </p>
                  </div>
                  <p className="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk{" "}
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-action">
        <div className="flex gap-10 ">
          <button
            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            onClick={() => dispatch(closeEditModal())}
          >
            Cancel
          </button>
          <button
            className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
            type="submit"
            onClick={() => dispatch(closeEditModal())}
          >
            Save
          </button>
        </div>
        {/* </form> */}
      </div>
    </form>
  );
};

export default AddProductEdit;
