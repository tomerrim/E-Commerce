import { useParams } from "react-router-dom"
import { customFetch } from "../utils/customFetch";
import { useEffect, useState } from "react";

export const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
        const response = await customFetch(`api/products/${id}`, "GET");
        console.log(response);
        setProduct(response);
      };    
      fetchData();
    }, [id]);

    console.log(product)
    return (
        <div>
            <h1>Product Details</h1>
            <h2>{product && product.title}</h2>
        </div>
    )
}