import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "./Actions";

export const initState = {
  loading: true,
  error: "",
  products: [],
};

export const homePageReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case GET_SUCCESS:
      return {
        loading: false,
        error: "",
        products: payload,
      };
    case GET_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      break;
  }
};
