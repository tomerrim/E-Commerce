import axios from 'axios';
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from './reducers/Actions';

export const handleAddToCart = async (product, cartItems, ctxDispatch) => {
    const existedItem = cartItems.find(item => item._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
        const { data } = await axios.get(`/products/${product._id}`);

        if (data.countInStock < quantity) {
            toast.error("Sorry, Product is out of stock");
            return;
        }

        ctxDispatch({type: ADD_TO_CART, payload: {...product, quantity}});
    } catch (error) {
        ctxDispatch({type: GET_FAIL, payload: error.message});
    }
};

export const getError = (error) => {
    return error.message && error.response.data.message ? error.response.data.message : error.message;
};

export const getFilterUrl = (searchFromURI, filter, skipPathName) => {
    const searchParams = new URLSearchParams(searchFromURI);
    const category = searchParams.get("category") || "all";
    const query = searchParams.get("query") || "";
    const page = searchParams.get("page") || 1;
    const price = searchParams.get("price") || "";
    const rating = searchParams.get("rating") || "";
    const order = searchParams.get("order") || "";
    
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    const filterCategory = filter.category || category;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;

    const link = `${
      skipPathName ? "" : "/search"
    }?category=${filterCategory}&query=${filterQuery}&page=${filterPage}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
    return link;
}