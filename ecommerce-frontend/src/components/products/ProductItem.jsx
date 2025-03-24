import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/ProductsList.css";
import Header from "../../layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate } from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { fetchProductById, addToCart } from "../../redux/actions/productAction";
import {} from "../../redux/constance/productType";
import { useSelector, useDispatch } from "react-redux";
import GlobalButtons from "../../buttons/GlobalButtons3";

const ProductItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userid = localStorage.getItem("userid");

  const fetchProductByIdRes = useSelector(
    (state) => state.product.fetchProductByIdRes
  );

  const addToCartRes = useSelector((state) => state.product.addToCartRes);

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [ratingValue, setRatingValue] = useState(3);

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productID, setProductID] = useState("");
  const [showLoader, setShowLoader] = useState(false);

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
          <p className="text-[#4b5966] text-[18px]">
            {productTitle}
            <br />
            {productDescription}
            <br />
            <span>
              <p className="pt-2">
                <Rate
                  tooltips={desc}
                  // onChange={setRatingValue}
                  // value={ratingValue}
                  onChange={(e) => {
                    // dispatch(addReview(userid, item.productId, e));
                  }}
                  value={productRating}
                />
                <br />
                {ratingValue && <span>{desc[productRating - 1]}</span>}
              </p>
            </span>
          </p>

          <p className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1">
            Amazon's choice
          </p>

          <p className="text-2xl">{`-70% ₹${productPrice}`}</p>
          <p className="text-[14px] text-[#4b5966] ps-4">
            {`M.R.P : ${productPrice}`}
          </p>

          <p
            className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-1 pointer"
            onClick={() => {
              dispatch(addToCart(userid, productID));
            }}
          >
            <span className="ps-1">
              <ShoppingCartOutlined />
            </span>
            <span className="ps-3">Add to cart</span>
          </p>

          <p
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
