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
  PlusOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import "../../styles/cart.css";
import "../../styles/asc_Anime.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const WishListItems = () => {
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
    <div>
      <p className="text-[18px] text-[#4b5966] font-[500] py-5 ps-6">
        Wish List Products...
      </p>

      {wishListItems.map((item, index) => {
        return (
          <div className="w-[500px] py-3 ps-5">
            <div className="bg-[lightgrey] w-[200px] h-[120px] rounded-xl p-2">
              <img
                src={item?.products?.productImage}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="w-[300px] pt-2 ps-3">
              <p className="productTitle">{item?.products?.productTitle}</p>
              {/* <p>{item?.products?.productDescription}</p> */}
              <p className="productName">
                {item?.products?.productDescription.length > 25
                  ? item?.products?.productDescription.slice(0, 25) + "..."
                  : item?.products?.productDescription}
              </p>

              <p className="w-[100px] text-[#5caf90] font-bold">
                {`₹ ${item?.products?.productPrice}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WishListItems;
