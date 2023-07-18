import { useEffect, useState } from "react";
import { Products } from "../components/Products/Products";
import axios from "axios";
import "../index.css";
export const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("/products");
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        <Products products={products} />
      </div>
    </>
  );
};
