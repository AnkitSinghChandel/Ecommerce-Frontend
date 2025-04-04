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
  SyncOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import "../../styles/cart.css";
import "../../styles/asc_Anime.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const CartProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const fetchAllWishListRes = useSelector(
    (state) => state.product.fetchAllWishListRes
  );

  const [wishListProducts, setWishListProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);

  useEffect(() => {
    dispatch(fetchAllWishList());
  }, []);

  useEffect(() => {
    if (fetchAllWishListRes.status === true) {
      setWishListProducts(fetchAllWishListRes.data);
    }
  }, [fetchAllWishListRes]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleIncrease = (index, productId) => {
    let quantity = [...productQuantity];
    quantity[index] = (quantity[index] || 1) + 1;
    setProductQuantity(quantity);
  };

  const handleDecrease = (index, productId) => {
    let quantity = [...productQuantity];
    quantity[index] = Math.max((quantity[index] || 1) - 1, 1);
    setProductQuantity(quantity);
  };

  console.log("asc223", productQuantity);

  return (
    <div>
      <p className="text-[18px] text-[#4b5966] font-[500] py-5 ps-6">
        Check Out Products... &nbsp;
        <SyncOutlined spin />
      </p>

      {wishListProducts.map((item, index) => {
        return (
          <div
            className="w-[500px] border-b-1 py-3 ps-6"
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay={index * 300} // Delay increases per product.
            data-aos-duration="1000"
            key={index}
          >
            <div className="flex gap-3 items-center">
              {/* <Checkbox onChange={onChange}>Checkbox</Checkbox> */}
              {/* <img src={item?.products?.productImage} alt="" className="" /> */}
              <Checkbox onChange={onChange}>
                <img
                  src={item?.products?.productImage}
                  alt=""
                  className="w-[100px] h-[60px] object-cover ps-3"
                />
              </Checkbox>

              <div className="w-[300px]">
                <p>{item?.products?.productTitle}</p>
                {/* <p>{item?.products?.productDescription}</p> */}
                <p>
                  {item?.products?.productDescription.length > 30
                    ? item?.products?.productDescription.slice(0, 30) + "..."
                    : item?.products?.productDescription}
                </p>
              </div>

              <div className="w-[100px] text-[#5caf90] font-bold">
                <p>{`₹ ${item?.products?.productPrice}`}</p>
              </div>
            </div>

            <div className="flex gap-4 p-3">
              <div className="bg-[#5caf90] text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-2 flex gap-5 justify-center pointer">
                <span
                  // onClick={() => {
                  //   // setProductQuantity((prev) => prev - 1);
                  //   // can not enter negative values till 0👇
                  //   // setProductQuantity((prev) => Math.max(prev - 1, 0));
                  //   setProductQuantity((prev) => Math.max(prev - 1, 1));
                  // }}
                  onClick={() => handleDecrease(index, item.productId)}
                >
                  <MinusOutlined />
                </span>

                {/* <p>{productQuantity}</p> */}
                <p>{productQuantity[index]}</p>

                <span
                  // onClick={() => {
                  //   setProductQuantity((prev) => prev + 1);
                  // }}
                  onClick={() => handleIncrease(index, item.productId)}
                >
                  <PlusOutlined />
                </span>
              </div>

              <DeleteOutlined className="text-[red]! hover:text-[#5caf90]! pointer ms-auto pe-12" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartProducts;
