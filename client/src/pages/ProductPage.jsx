import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../context/store";
import { getError, handleAddToCart } from "../utils";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../reducers/Actions";
import { productPageReducer } from "../reducers/ProductPageReducer";
import axios from "axios";
import { Loading } from "../components/Loading";
import { MessageBox } from "../components/MessageBox";
import { Row, Col } from "react-bootstrap";
import { ProductDescription } from "../components/ProductDescription";
import { CartDescription } from "../components/CartDescription";

export const ProductPage = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialState = {
    loading: true,
    error: "",
    products: [],
  };

  const [{ loading, error, product }, dispatch] = useReducer(
    productPageReducer,
    initialState
  );

  const addToCart = async () => {
    await handleAddToCart(product, cartItems, ctxDispatch);
    navigate("/cart");
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const response = await axios.get(`products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({
          type: GET_FAIL,
          payload: getError(error),
        });
      }
    };
    getProduct();
  }, [token]);
  console.log(product);
  return (
    <div>
        {loading ? (
            <Loading/>
        ) : error? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
                <Row>
                    <Col md={6}>
                        <img src={`${product.image}`} alt={product.title} className="card-img-top card-image"/>
                    </Col>
                    <Col md={3}>
                        {product && <ProductDescription {...product}/>}
                    </Col>
                    <Col md={3}>
                        {product && <CartDescription product={product} addToCart={addToCart}/>}
                    </Col>
                </Row>
            </div>
        )}
    </div>
  )
};
