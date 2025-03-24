const initialState = {
  addProductRes: {},
  fetchAllProductsRes: {},
  fetchProductByIdRes: {},
  updateProductByIdRes: {},
  deleteProductByIdRes: {},
  addReviewRes: {},
  addToCartRes: {},
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

    default:
      return { ...state };
  }
};

export default productReducer;
