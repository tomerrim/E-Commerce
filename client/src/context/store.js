import { createContext, useReducer } from "react";
import { StoreReducer } from "../reducers/StoreReducer";

export const Store = createContext();
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress : localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod : localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : "",
    },
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(StoreReducer, initialState);
    const body = {
        state,
        dispatch,
    }
    return (
        <Store.Provider value={body}>
            {props.children}
        </Store.Provider>
    )
}
