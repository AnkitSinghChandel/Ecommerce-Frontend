import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/ProductsList.css";
import Header from "../../layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate } from "antd";
import {
  UserOutlined,
  ShoppingFilled,
  CheckCircleFilled,
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { fetchProductById, addToCart } from "../../redux/actions/productAction";
import { ADD_TO_CART } from "../../redux/constance/productType";
import { useSelector, useDispatch } from "react-redux";
import GlobalButtons from "../../buttons/GlobalButtons3";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../../notification-alert/CustomToastify";

const ProductItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userid = localStorage.getItem("userid");
  const globalDiscount = localStorage.getItem("globalDiscount");

  const fetchProductByIdRes = useSelector(
    (state) => state.product.fetchProductByIdRes
  );

  const addToCartRes = useSelector((state) => state.product.addToCartRes);

  const fetchAllCartProductsRes = useSelector(
    (state) => state.product.fetchAllCartProductsRes
  );

  const discountPropsApiRes = useSelector(
    (state) => state.product.discountPropsApiRes
  );

  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
  const [ratingValue, setRatingValue] = useState(3);

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productID, setProductID] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);
  const [globalProductDiscount, setGlobalProductDiscount] = useState(50);

  useEffect(() => {
    dispatch(fetchProductById(params.id));
  }, []);

  useEffect(() => {
    if (fetchProductByIdRes.status === true) {
      setProductName(fetchProductByIdRes.data.productName);
      setProductImage(fetchProductByIdRes.data.productImage);
      setProductTitle(fetchProductByIdRes.data.productTitle);
      setProductDescription(fetchProductByIdRes.data.productDescription);
      setProductPrice(fetchProductByIdRes.data.productPrice);
      setProductID(fetchProductByIdRes.data.productId);
      setProductRating(fetchProductByIdRes.data.ratings[0]?.rating);
    }
  }, [fetchProductByIdRes]);

  useEffect(() => {
    if (addToCartRes.status === true) {
      setShowLoader(false);

      toast.success(`${productName} ${addToCartRes.message}`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      // navigate("/team-list");

      dispatch({
        type: ADD_TO_CART,
        data: {},
      });
    } else if (addToCartRes.status === false) {
      toast.error(`${addToCartRes.error}`, {
        // autoClose: 3000,
        onOpen: playErrorSound,
      });
    }
  }, [addToCartRes]);

  useEffect(() => {
    console.log("asc678", discountPropsApiRes);

    if (discountPropsApiRes) {
      setGlobalProductDiscount(discountPropsApiRes.discount1);
      localStorage.setItem("props Discount", discountPropsApiRes.discount1);
    }
  }, [discountPropsApiRes]);

  // const asc_discountPercentage = Number(globalProductDiscount);
  const asc_discountPercentage = Number(globalDiscount);
  const asc_totalPrice = productPrice * productQuantity;
  const asc_discountedPrice =
    asc_totalPrice * (1 - asc_discountPercentage / 100);

  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        placeholder={"You are in selected product item..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products List */}
            </p>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-15 px-5">
        <div className="">
          <img
            className="rounded-2xl object-cover h-full w-dvw max-h-[333px]"
            src={productImage}
            alt=""
          />
        </div>

        <div className="pt-2">
          <p className="text-[#4b5966] text-[18px]">{productTitle}</p>

          <p className="text-[#4b5966] text-[18px]">{productDescription}</p>

          <div className="pt-2">
            <Rate
              tooltips={desc}
              // onChange={setRatingValue}
              // value={ratingValue}
              onChange={(e) => {
                // dispatch(addReview(userid, item.productId, e));
              }}
              value={productRating}
            />
            <span className="ps-5">
              {ratingValue && <span>{desc[productRating - 1]}</span>}
            </span>
          </div>

          <div className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-2 flex gap-5 justify-center pointer">
            <span
              onClick={() => {
                // setProductQuantity((prev) => prev - 1);
                // can not enter negative values👇
                setProductQuantity((prev) => Math.max(prev - 1, 0));
              }}
            >
              <MinusOutlined />
            </span>

            <p>{productQuantity}</p>

            <span
              onClick={() => {
                setProductQuantity((prev) => prev + 1);
              }}
            >
              <PlusOutlined />
            </span>
          </div>

          <p className="text-2xl">
            {/* {`-70% ₹${productPrice * productQuantity}`} */}
            {/* {`-${globalProductDiscount}% ₹${asc_discountedPrice.toFixed(2)}`} */}
            {`-${globalDiscount}% ₹${asc_discountedPrice.toFixed(2)}`}
          </p>
          <p className="text-[14px] text-[#4b5966] ps-4">
            {/* {`M.R.P : ${productPrice * productQuantity}`} */}
            {`M.R.P : ${asc_totalPrice.toFixed(2)}`}
          </p>

          <div className="flex gap-3 items-center">
            <div
              className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1 pointer"
              onClick={() => {
                dispatch(addToCart(userid, productID, productQuantity));
              }}
            >
              <span className="ps-1">
                <ShoppingCartOutlined />
              </span>
              <span className="ps-3">Add to cart</span>
            </div>

            <div>
              {fetchAllCartProductsRes?.data?.some(
                (wish) => wish.products.productId === productID
              ) && <CheckCircleFilled style={{ color: "#5caf90 " }} />}
            </div>
          </div>

          <div
            className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1 pointer"
            onClick={() => {
              // history.goBack();
              navigate(-1);
            }}
          >
            <span className="ps-1">
              <ArrowLeftOutlined />
            </span>
            <span className="ps-3">Go Back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
