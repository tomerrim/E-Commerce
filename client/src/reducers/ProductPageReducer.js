import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "./Actions";

export const productPageReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload
            };    
        case GET_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}