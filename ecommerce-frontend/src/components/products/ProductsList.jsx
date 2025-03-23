import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../styles/ProductsList.css";
import Header from "../../layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate } from "antd";
import NoData from "../../common/NoData";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [ratingValue, setRatingValue] = useState(3);
  // const [productRating, setProductRating] = useState(3);
  const [querystring, setQuerystring] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  const productOptions = [
    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_640.jpg",
      productTitle: "Dried Fruits",
      productDescription: "Dates Value Pack Pouch",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc1",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2020/11/04/13/29/cereal-5712343_640.jpg",
      productTitle: "Chips & Fries",
      productDescription: "Crunchy Triangle Chips Snacks",
      productRating: "5",
      productPrice: "47878445",
      productID: "asc2",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2024/06/11/02/01/ai-generated-8821696_640.png",
      productTitle: "Dried Fruits",
      productDescription: "Californian Almonds Value Pack",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc3",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2024/04/18/10/41/ai-generated-8704060_640.jpg",
      productTitle: "Foods",
      productDescription: "Banana Chips Snacks & Spices",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc4",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2017/03/02/12/25/strawberries-2111130_640.jpg",
      productTitle: "Snacks",
      productDescription: "Berry & Graps Mix Snack",
      productRating: "4",
      productPrice: "47878445",
      productID: "asc5",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2018/05/01/18/21/eclair-3366430_640.jpg",
      productTitle: "Dried Froots",
      productDescription: "Mixed Nuts Seeds & Berries Pack",
      productRating: "5",
      productPrice: "47878445",
      productID: "asc6",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2024/02/20/15/19/ai-generated-8585693_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc7",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2020/09/21/14/06/meal-5590184_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc8",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2024/04/03/20/39/ai-generated-8673812_640.png",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc9",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2024/05/29/22/04/tomato-juice-8797323_640.png",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc10",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc11",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2018/05/01/18/21/eclair-3366430_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "4",
      productPrice: "47878445",
      productID: "asc12",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2021/03/19/22/18/strawberries-6108520_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc13",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2021/04/01/15/39/copyright-6142611_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc14",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_640.jpg",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc15",
    },

    {
      productName: "Ankit",
      productImage:
        "https://cdn.pixabay.com/photo/2024/02/14/05/34/girl-8572400_640.png",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc16",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  });

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
            {productOptions
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
                        navigate(`/product/${item.productID}`);
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
              selectOptions={productOptions}
              searchValue={querystring}
              filterParameters={productOptions.map(
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
