const initialState = {
  addProductRes: {},
  fetchAllProductsRes: {},
  fetchProductByIdRes: {},
  updateProductByIdRes: {},
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

    default:
      return { ...state };
  }
};

export default productReducer;
