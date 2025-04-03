import React, { useEffect, useState } from "react";
import {
  fetchAllCartProducts,
  fetchAllWishList,
} from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  DeleteOutlined,
  MinusOutlined,
  ArrowLeftOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tooltip, Popover, FloatButton } from "antd";
import "../../styles/cart.css";
import "../../styles/asc_Anime.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import GlobalButtons from "../../buttons/GlobalButtons3";

const WishListProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const fetchAllWishListRes = useSelector(
    (state) => state.product.fetchAllWishListRes
  );

  const [wishListItems, setWishListItems] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchAllWishList());
  }, []);

  useEffect(() => {
    if (fetchAllWishListRes.status === true) {
      setWishListItems(fetchAllWishListRes.data);
    }
  }, [fetchAllWishListRes]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex gap-8 justify-between items-center pe-5">
        <p className="text-[18px] text-[#4b5966] font-[500] py-5 ps-6">
          Wish List Products... &nbsp;
          <SyncOutlined spin />
        </p>

        <div
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-delay="300" // Delay increases per product.
          data-aos-duration="1000"
        >
          <Tooltip title="Back">
            <ArrowLeftOutlined
              onClick={() => {
                navigate(-1);
              }}
              className="bg-[#5caf90] rounded-[50%] p-2"
              style={{ color: "white", fontSize: "20px" }}
            />
          </Tooltip>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishListItems.map((item, index) => {
          return (
            <div
              className="w-full max-w-[300px] mx-auto py-3 ps-5"
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-delay={index * 300} // Delay increases per product.
              data-aos-duration="1000"
              key={item.productId}
            >
              <div className="bg-[lightgrey] w-[20-0px] h-[140px] rounded-xl p-2">
                <img
                  src={item?.products?.productImage}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="pt-2 ps-3">
                <p className="productTitle">{item?.products?.productTitle}</p>
                <p className="truncate">{item?.products?.productDescription}</p>
                <p className="text-[#5caf90] font-bold">
                  {`₹ ${item?.products?.productPrice}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishListProducts;
