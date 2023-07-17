import { useNavigate } from "react-router-dom";
import "./Product.css";

export const Product = ({product}) => {

    const navigate = useNavigate();
    const goToDetails = () => {
        navigate(`/product/${product._id}`);
    }
    return (
      <div className="product" onClick={goToDetails}>
        <img src={product.image} alt={product.title}/>
        <p>{product.title}</p>
        <p>{product.rating.rate} {product.rating.count} Reviews</p>
        <p>{product.price}$</p>
      </div>
    );
}