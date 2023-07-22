import { useContext } from "react"
import { Store } from "../context/store"
import { useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL, REMOVE_FROM_CART } from "../reducers/Actions";
import { ItemsInCart } from "../components/ItemsInCart";
import { Checkout } from "../components/Checkout";

export const CartPage = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;
    const navigae = useNavigate();

    const handleCheckout = () => {
        navigae("/signIn?redirect=/shipping");
    }

    const handleUpdateCart = async (item, quantity) => {
        try {
            const { data } = await axios.get(`products/${item._id}`);
            if(data.countInStock < quantity) {
                toast.error("Sorry, Product is out of stock");
                return;
            }
            ctxDispatch({
                type: ADD_TO_CART,
                payload: {...item, quantity }
            });
        } catch (error) {
            ctxDispatch({ type: GET_FAIL, payload: error.message });
        }
    }

    const handleRemoveItem = (item) => {
        ctxDispatch({
            type: REMOVE_FROM_CART,
            payload: item
        });
    }

    return (
        <div>
            <Title title={"Shopping Cart"}/>
            <Row>
                <Col md={8}>
                    <ItemsInCart handleRemoveItem={handleRemoveItem} handleUpdateCart={handleUpdateCart} cartItems={cartItems}/>
                </Col>
                <Col md={4}>
                    <Checkout cartItems={cartItems} handleCheckout={handleCheckout}/>
                </Col>
            </Row>
        </div>
    )
}