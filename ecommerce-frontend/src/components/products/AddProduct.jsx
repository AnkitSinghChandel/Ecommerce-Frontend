import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/AddProduct.css";
import "../../styles/NewInput.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "../../layouts/Header";
import CancelPopup from "../../dialogs/CancelPopup";
import addicon from "../../assets/icons/addicon.svg";
import singleUser from "../../assets/icons/singleUser.svg";
import setting from "../../assets/icons/setting.svg";
import ASC22 from "../../assets/images/ASC22.jpg";
import DownArrowOption from "../../assets/icons/DownArrowOption.svg";
import Xicon from "../../assets/icons/Xicon.svg";
import searchicon from "../../assets/icons/search.svg";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import doubleUser from "../../assets/icons/doubleUser.svg";
import {
  addProduct,
  fetchProductById,
  updateProductById,
} from "../../redux/actions/productAction";
import { ADD_PRODUCT } from "../../redux/constance/productType";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Spin } from "antd";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../../notification-alert/CustomToastify";
import moment from "moment";
import NoData from "../../common/NoData";
import GlobalButtons from "../../buttons/GlobalButtons3";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const isUpdating = Boolean(params.id);
  const [Ankit] = useAutoAnimate();
  const hiddenFileInput = useRef(null);

  const addProductRes = useSelector((state) => state.product.addProductRes);
  const fetchProductByIdRes = useSelector(
    (state) => state.product.fetchProductByIdRes
  );
  const updateProductByIdRes = useSelector(
    (state) => state.product.updateProductByIdRes
  );

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [attachmentData, setAttachmentData] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productID, setProductID] = useState("");
  const [warning, setWarning] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = (e) => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  useEffect(() => {
    if (addProductRes?.status === true) {
      setShowLoader(false);

      toast.success(`${productName} Added successfully`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      navigate("/products-list");

      dispatch({
        type: ADD_PRODUCT,
        data: {},
      });
    } else if (addProductRes?.status === false) {
      toast.error(`Failed to add product ${productName}`, {
        // autoClose: 3000,
        onOpen: playErrorSound,
      });
    }
  }, [addProductRes]);

  const handleAddProduct = () => {
    if (
      productName === "" ||
      productImage === "" ||
      productTitle === "" ||
      productDescription === "" ||
      productPrice === ""
    ) {
      setWarning(true);
      return false;
    }
    dispatch(
      addProduct(
        productName,
        productImage,
        productTitle,
        productDescription,
        productPrice
      )
    );
    setShowLoader(true);
  };

  // fetch and update products below👇
  useEffect(() => {
    if (isUpdating) {
      dispatch(fetchProductById(params.id));
    }
  }, [isUpdating]);

  useEffect(() => {
    if (fetchProductByIdRes.status === true) {
      setProductName(fetchProductByIdRes.data.productName);
      setProductImage(fetchProductByIdRes.data.productImage);
      setProductTitle(fetchProductByIdRes.data.productTitle);
      setProductDescription(fetchProductByIdRes.data.productDescription);
      setProductPrice(fetchProductByIdRes.data.productPrice);
    }
  }, [fetchProductByIdRes]);

  const handleUpdateProduct = () => {
    if (
      productName === "" ||
      productImage === "" ||
      productTitle === "" ||
      productDescription === "" ||
      productPrice === ""
    ) {
      setWarning(true);
      return false;
    }
    dispatch(
      updateProductById(
        params.id,
        productName,
        productImage,
        productTitle,
        productDescription,
        productPrice
      )
    );
    setShowLoader(true);
  };

  useEffect(() => {
    if (updateProductByIdRes?.status === true) {
      setShowLoader(false);

      toast.success(`${productName} Updated successfully`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      navigate("/products-list");

      // dispatch({
      //   type: ADD_PRODUCT,
      //   data: {},
      // });
    } else if (updateProductByIdRes?.status === false) {
      toast.error(`Failed to update product ${productName}`, {
        // autoClose: 3000,
        onOpen: playErrorSound,
      });
    }
  }, [updateProductByIdRes]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddProduct();
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        placeholder={"You are in add product..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products List */}
            </p>
          </div>
        }
      />

      {cancelPopupShow && (
        <CancelPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleYes}
          title={""}
          keyboard={true}
        />
      )}

      <div className="flex justify-center md:justify-end flex-wrap gap-4 pt-15 p-6">
        <GlobalButtons.Cancel
          label={"Cancel"}
          onClick={() => {
            if (typeInScreen !== "") {
              setCancelPopupShow(true);
            } else {
              // history.goBack();
              navigate(-1);
            }
          }}
        />

        <GlobalButtons.Submit
          disabled={showLoader}
          // onClick={handleAddProduct}
          onClick={() => {
            isUpdating ? handleUpdateProduct() : handleAddProduct();
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="addButton"
          extraComponent={
            showLoader ? (
              <div>
                <Spin size="small" className="team-custom-spin" />
                <span className="px-2">Updating...</span>
              </div>
            ) : (
              <div className="flex gap-5 justify-center pe-4">
                <img
                  className="icons mx-"
                  src={btnHover ? addicon : doubleUser}
                  alt=""
                />
                {isUpdating ? "Update Product" : "Add Product"}
              </div>
            )
          }
        />
      </div>

      <Row gutter={[32, 16]} className="pt-6">
        <Col xs={24} sm={12} md={12} lg={12}>
          {/* circle img div start */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              // const droppedFile = Array.from(e.dataTransfer.files);
              // if (droppedFile.length > 0) {
              //   console.log("drop imgs", droppedFile);
              //   setAttachmentData(droppedFile);
              // }

              // single file upload👇
              const fileUploaded = e.dataTransfer.files[0];
              if (fileUploaded) {
                const imageLink = URL.createObjectURL(fileUploaded);
                // setProductImage({ url: imageLink, name: fileUploaded.name }); // Store both URL and name.
                setProductImage(imageLink);
                setTypeInScreen(imageLink);
              }
            }}
          >
            {/* no need to use ref if we use setting img under label */}
            <label>
              <img src={setting} alt="" width={20} />
              <input
                type="file"
                ref={hiddenFileInput}
                multiple
                accept="image/*"
                // accept=".doc,.docx,.pdf,.xls,.xlsx,.xml,"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log("fileList", e.target.files);
                  // setAttachmentData(e.target.files[0]); // single file upload.
                  const selectedFiles = Array.from(e.target.files);
                  setAttachmentData(selectedFiles);

                  // single file upload👇
                  const fileUploaded = e.target.files[0];
                  if (fileUploaded) {
                    const imageLink = URL.createObjectURL(fileUploaded);
                    // setProductImage({ url: imageLink, name: fileUploaded.name }); // Store both URL and name.
                    setProductImage(imageLink);
                    setTypeInScreen(imageLink);
                  }
                }}
              />
            </label>
            {/* circle input img start */}
            <div className="circle-input-img m-auto">
              {productImage ? (
                <img
                  src={productImage}
                  alt=""
                  className="selectedImg"
                  onClick={handleClick}
                />
              ) : (
                <>
                  <img
                    src={setting}
                    alt=""
                    width={20}
                    className="pointer"
                    onClick={handleClick}
                  />
                  <br />
                  <p>Add or Drag a photo</p>
                </>
              )}
            </div>
            {/* circle input img end */}
          </div>
          {/* circle img div start */}
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <div className="pt-4" ref={Ankit}>
            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Product Name</label>
              <input
                type="text"
                // disabled
                autoFocus={true}
                className="asc-Normal-Input"
                style={{
                  border: warning && !productName && "1.5px solid #dc3545",
                }}
                placeholder="Enter your Product Name"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  setTypeInScreen(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {warning && !productName && "Please fill product name!"}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Product Title</label>
              <input
                type="text"
                // disabled
                className="asc-Normal-Input"
                style={{
                  border: warning && !productTitle && "1.5px solid #dc3545",
                }}
                placeholder="Enter your Product Title"
                value={productTitle}
                onChange={(e) => {
                  setProductTitle(e.target.value);
                  setTypeInScreen(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {warning && !productTitle && "Please fill product title!"}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">
                Product Description
              </label>
              <textarea
                // disabled
                className="asc-Normal-Input py-3"
                style={{
                  border:
                    warning && !productDescription && "1.5px solid #dc3545",
                }}
                placeholder="Enter your Product Description"
                value={productDescription}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                  setTypeInScreen(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {warning &&
                  !productDescription &&
                  "Please fill product description!"}
              </span>
            </div>

            <div className="asc-input-container" id="ascNewInput">
              <label className="asc-top-label labelText">Product Price</label>
              <input
                type="number"
                min={1}
                // disabled
                className="asc-Normal-Input"
                style={{
                  border: warning && !productPrice && "1.5px solid #dc3545",
                }}
                placeholder="Enter your Product Price ₹"
                value={productPrice}
                // onChange={(e) => {
                //   setProductPrice(e.target.value);
                //   setTypeInScreen(e.target.value);
                // }}

                // onChange={(e) => {
                //   let value = Number(e.target.value);
                //   if (value < 1 || isNaN(value)) {
                //     value = 1;
                //   }
                //   setProductPrice(value);
                //   setTypeInScreen(value);
                // }}

                onInput={(e) => {
                  let value = Number(e.target.value);

                  // Prevent negative values and enforce minimum 100
                  if (value < 1 || isNaN(value)) {
                    value = 100;
                  }

                  setProductPrice(value);
                  setTypeInScreen(value);
                }}
                onKeyDown={handleKeyDown}
              />
              <br />
              <span className="warningTxt ps-2">
                {warning && !productPrice && "Please fill product price!"}
              </span>
            </div>

            <div className="md:col-span-2 hidden">
              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText">Product Image</label>
                <input
                  type="text"
                  // disabled
                  autoFocus={true}
                  className="asc-Normal-Input"
                  style={{
                    border: warning && !productImage && "1.5px solid #dc3545",
                  }}
                  placeholder="Enter your Product image"
                  value={productImage}
                  onChange={(e) => {
                    setProductImage(e.target.value);
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">
                  {warning && !productImage && "Please fill product image!"}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/* extra product img div start */}
      <div className="md:col-span-2">
        <div className="asc-input-container" id="ascNewInput">
          <label className="asc-top-label labelText">Product Image</label>
          <input
            type="text"
            // disabled
            autoFocus={true}
            className="asc-Normal-Input"
            style={{
              border: warning && !productImage && "1.5px solid #dc3545",
            }}
            placeholder="Enter your Product image"
            value={productImage}
            onChange={(e) => {
              setProductImage(e.target.value);
              setTypeInScreen(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <br />
          <span className="warningTxt ps-2">
            {warning && !productImage && "Please fill product image!"}
          </span>
        </div>
      </div>
      {/* extra product img div end */}
    </div>
  );
};

export default AddProduct;
