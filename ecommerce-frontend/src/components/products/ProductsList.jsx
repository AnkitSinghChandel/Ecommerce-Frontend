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
        "https://images.unsplash.com/photo-1587225536270-7487675ab5b1?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODQwNjcxfHxlbnwwfHx8fHw%3D",
      productTitle: "Dried Fruits",
      productDescription: "Dates Value Pack Pouch",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc1",
    },

    {
      productName: "Ankit",
      productImage:
        "https://plus.unsplash.com/premium_photo-1670270204757-08153c6fd333?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NDY3MDAyN3x8ZW58MHx8fHx8",
      productTitle: "Chips & Fries",
      productDescription: "Crunchy Triangle Chips Snacks",
      productRating: "5",
      productPrice: "47878445",
      productID: "asc2",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1621317758612-3958e0f07c49?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODU5ODI5M3x8ZW58MHx8fHx8",
      productTitle: "Dried Fruits",
      productDescription: "Californian Almonds Value Pack",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc3",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1516826771201-5f85cb4a3133?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NTgzMjMwNTR8fGVufDB8fHx8fA%3D%3D",
      productTitle: "Foods",
      productDescription: "Banana Chips Snacks & Spices",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc4",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1552997082-aa9ee21701c1?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MzgyNTE5OHx8ZW58MHx8fHx8",
      productTitle: "Snacks",
      productDescription: "Berry & Graps Mix Snack",
      productRating: "4",
      productPrice: "47878445",
      productID: "asc5",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1643226226304-d434ebda0922?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8OTI1ODkzMnx8ZW58MHx8fHx8",
      productTitle: "Dried Froots",
      productDescription: "Mixed Nuts Seeds & Berries Pack",
      productRating: "5",
      productPrice: "47878445",
      productID: "asc6",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1717398804938-f008d162d7f6?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTUxNTM2Mnx8ZW58MHx8fHx8",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc7",
    },

    {
      productName: "Ankit",
      productImage:
        "https://plus.unsplash.com/premium_photo-1661600643912-dc6dbb1db475?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8alZRaWpiVXdjT2N8fGVufDB8fHx8fA%3D%3D",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc8",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1662695086800-f4079b412abe?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MzU5NTE5MHx8ZW58MHx8fHx8",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc9",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1648288718348-4b6d53755716?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODk2MTYxOXx8ZW58MHx8fHx8",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc10",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1692737003302-8ae57a23c6e8?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8ODMzNDQxfHxlbnwwfHx8fHw%3D",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "2",
      productPrice: "47878445",
      productID: "asc11",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1705917893101-f098279ebc44?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MmdKV0ZIbWtNbll8fGVufDB8fHx8fA%3D%3D",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "4",
      productPrice: "47878445",
      productID: "asc12",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1444952483853-7c36e902e722?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTEzMTIxMXx8ZW58MHx8fHx8",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc13",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1617866893127-0dddb005fae7?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTExOTM2MHx8ZW58MHx8fHx8",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc14",
    },

    {
      productName: "Ankit",
      productImage:
        "https://images.unsplash.com/photo-1521220509776-3df02465ccad?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NDExNzAyfHxlbnwwfHx8fHw%3D",
      productTitle: "Snacks",
      productDescription: "Smoked Honey Spiced Nuts",
      productRating: "3",
      productPrice: "47878445",
      productID: "asc15",
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
                        className="rounded-lg w-full"
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
