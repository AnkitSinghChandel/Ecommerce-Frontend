import React, { useEffect, useState } from "react";
import {
  fetchAllCartProducts,
  fetchAllWishList,
} from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../styles/cart.css";
import "../../styles/asc_Anime.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Carts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const cartItem = localStorage.getItem("cartItem") ?? 0;

  const addToCartRes = useSelector((state) => state.product.addToCartRes);

  const fetchAllCartProductsRes = useSelector(
    (state) => state.product.fetchAllCartProductsRes
  );

  const addToWishListRes = useSelector(
    (state) => state.product.addToWishListRes
  );

  const fetchAllWishListRes = useSelector(
    (state) => state.product.fetchAllWishListRes
  );

  const [totalWishItem, setTotalWishItem] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [isOpenAccBox, setIsOpenAccBox] = useState(false);

  useEffect(() => {
    if (addToCartRes.status === true) {
      // setTotalCartItem(addToCartRes.data.productQuantity);
      // localStorage.setItem("cartItem", addToCartRes.data.productQuantity);
    }
  }, [addToCartRes]);

  useEffect(() => {
    dispatch(fetchAllCartProducts());
  }, [addToCartRes]);

  useEffect(() => {
    dispatch(fetchAllWishList());
  }, [addToWishListRes]);

  useEffect(() => {
    if (fetchAllCartProductsRes.status === true) {
      setTotalCartItem(fetchAllCartProductsRes.length);
    }
  }, [fetchAllCartProductsRes]);

  useEffect(() => {
    if (fetchAllWishListRes.status === true) {
      setTotalWishItem(fetchAllWishListRes.length);
    }
  }, [fetchAllWishListRes]);

  return (
    <div className="ascSmoot-h flex flex-wrap gap-8 font-medium">
      <div
        className="flex items-center gap-2 pointer carts relative"
        onClick={() => setIsOpenAccBox(!isOpenAccBox)}
      >
        {/* <img alt="" src="" /> */}
        <UserOutlined
          className="carts-icons"
          // style={{ fontSize: "25px" }}
        />
        <div>
          <p className="carts-main-label">Account</p>
          <p className="carts-label">LOGIN</p>
        </div>
      </div>

      <div className={isOpenAccBox ? "asc-anime-start" : "asc-anime-exit"}>
        <div className="bg-white border-gray-600 rounded-lg p-3">
          <p className="text-gray-600">Popup Content</p>
          <p className="text-gray-600">This is a sliding popup!</p>
        </div>
      </div>

      <div
        className="flex items-center gap-2 pointer carts"
        onClick={() => {
          navigate("/wish-items");
        }}
      >
        {/* <img alt="" src="" /> */}
        <HeartOutlined className="carts-icons" />
        <div>
          <p className="carts-main-label">Wishlist</p>
          <div className="carts-label">
            <p className="totalWish">{`${totalWishItem}`}</p>-items
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 pointer carts"
        onClick={() => {
          navigate("/check-out");
        }}
      >
        {/* <img alt="" src="" /> */}
        <ShoppingCartOutlined className="carts-icons" />
        <div>
          <p className="carts-main-label">Cart</p>
          <div className="carts-label">
            <p className="totalWish">{`${totalCartItem || cartItem}`}</p>-items
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
