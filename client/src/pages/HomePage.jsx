import { useEffect, useReducer, useState } from "react";
import { Products } from "../components/Products/Products";
import axios from "axios";
import "../index.css";
import { homePageReducer, initState } from "../reducers/HomePageReducer";
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../reducers/Actions";
import { Loading } from "../components/Loading";
import { MessageBox } from "../components/MessageBox";

export const HomePage = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, disptch] = useReducer(
    homePageReducer,
    initState
  );
  useEffect(() => {
    const getProducts = async () => {
      disptch({ type: GET_REQUEST });
      try {
        const response = await axios.get("/products");
        disptch({ type: GET_SUCCESS, payload: response.data });
      } catch (error) {
        disptch({ type: GET_FAIL, payload: error.message });
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant={"danger"}>{error}</MessageBox>
        ) : (
          <Products products={products} />
        )}
      </div>
    </>
  );
};
