import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/ProductsList.css";
import Header from "../../layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate } from "antd";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { fetchAllProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const fetchAllProductsRes = useSelector(
    (state) => state.product.fetchAllProductsRes
  );

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [ratingValue, setRatingValue] = useState(3);
  // const [productRating, setProductRating] = useState(3);
  const [querystring, setQuerystring] = useState("");

  const [productsData, setProductsData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    if (fetchAllProductsRes.status === true) {
      setProductsData(fetchAllProductsRes.data);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [fetchAllProductsRes]);

  return (
    <div className="">
      <Header
        setQuery={setQuerystring}
        placeholder={"You are in products list..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products List */}
            </p>
          </div>
        }
      />

      {showLoader ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader size="large" tip="" className="custom-spin" />
        </div>
      ) : (
        <>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-15 p-5"
            ref={Ankit}
          >
            {productsData
              .filter((x) =>
                `${x.productTitle} ${x.productDescription} ${x.productName}`
                  .toLocaleLowerCase()
                  .includes(querystring.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <div className="productsBox p-4 w-full">
                    <div
                      className="productImage rounded-lg pointer"
                      onClick={() => {
                        navigate(`/product/${item.productId}`);
                      }}
                    >
                      <img
                        src={item.productImage}
                        alt="products"
                        className="rounded-lg w-full aspect-3/2 object-cover"
                      />
                    </div>

                    <div className="pt-5">
                      <p className="productTitle">{item.productTitle}</p>
                      {/* <p className="pt-2 productName">{item.productName}</p> */}
                      <p className="pt-2 productName">
                        {item.productDescription}
                      </p>
                      {/* <p>{item.productRating}</p> */}
                      <p className="pt-2">
                        <Rate
                          tooltips={desc}
                          onChange={setRatingValue}
                          // value={ratingValue}
                          value={item.productRating}
                        />
                        <br />
                        {ratingValue && (
                          <span>{desc[item.productRating - 1]}</span>
                        )}
                      </p>
                      <p className="font-bold text-[14px] text-[#4b5966] flex gap-4 pt-2">
                        {/* {`$ ${item.productPrice}`} */}
                        <span className="">{`$ ${item.productPrice}`}</span>
                        <span className="font-normal text-[#777] line-through">
                          {`$ ${(item.productPrice / 2).toFixed(2)}`}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Display a message when no search are found */}
          <div className="flex justify-center items-center h-[5-0vh]">
            <NoData
              selectOptions={productsData}
              searchValue={querystring}
              filterParameters={productsData.map(
                (x) =>
                  `${x.productTitle} ${x.productDescription} ${x.productName}`
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
