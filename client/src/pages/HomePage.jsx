import { useState, useEffect, Fragment } from "react";
import { customFetch } from "../utils/customFetch";
import { Product } from "../components/Product/Product";
// import data from "../data";

export const HomePage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await customFetch("api/products", "GET");
        //console.log(response)
        setProducts(response);
      };    
      fetchData();
    }, []);
    
    console.log(products);
    return (
      <>
        <h1 className="title">Products</h1>
        <div className="products">
          {products.map((product) => (
            <Fragment key={product.token}>
              <Product product={product}/>
            </Fragment>
          ))}
        </div>
      </>
    );
}