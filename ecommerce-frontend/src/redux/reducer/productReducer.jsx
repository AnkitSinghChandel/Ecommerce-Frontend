const initialState = {
  addProductRes: {},
  fetchAllProductsRes: {},
  fetchProductByIdRes: {},
  updateProductByIdRes: {},
  deleteProductByIdRes: {},
  addReviewRes: {},
  addToCartRes: {},
  fetchAllCartProductsRes: {},
  addToWishListRes: {},
  discountPropsApiRes: {},
  fetchAllWishListRes: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        addProductRes: action.data,
      };

    case "FETCH_ALL_PRODUCTS":
      return {
        ...state,
        fetchAllProductsRes: action.data,
      };

    case "FETCH_PRODUCT_BY_ID":
      return {
        ...state,
        fetchProductByIdRes: action.data,
      };

    case "UPDATE_PRODUCT_BY_ID":
      return {
        ...state,
        updateProductByIdRes: action.data,
      };

    case "DELETE_PRODUCT_BY_ID":
      return {
        ...state,
        deleteProductByIdRes: action.data,
      };

    case "ADD_REVIEW":
      return {
        ...state,
        addReviewRes: action.data,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        addToCartRes: action.data,
      };

    case "FETCH_ALL_CART_PRODUCTS":
      return {
        ...state,
        fetchAllCartProductsRes: action.data,
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        addToWishListRes: action.data,
      };

    case "FETCH_ALL_WISHLIST_PRODUCTS":
      return {
        ...state,
        fetchAllWishListRes: action.data,
      };

    // ASC REDUX PROPS START //
    case "DISCOUNT_PROPS_API":
      console.log("discount state:", action.data);
      return {
        ...state,
        discountPropsApiRes: action.data,
      };
    // ASC REDUX PROPS END //

    default:
      return { ...state };
  }
};

export default productReducer;
