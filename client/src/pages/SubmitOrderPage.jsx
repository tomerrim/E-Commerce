import { useContext, useEffect, useReducer } from "react";
import { CREATE_REQUEST, CREATE_SUCCEEDED, CREATE_FAILED, CLEAR_CART } from "../reducers/Actions";
import { Store } from "../context/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Title } from "../components/Title";
import { CheckoutSteps } from "../components/CheckoutSteps/CheckoutSteps";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Loading } from "../components/Loading";

const reducer = (state, {type}) => {
    switch (type) {
        case CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_SUCCEEDED:
            return {
               ...state,
               loading: false,
            }
        case CREATE_FAILED:
            return {
              ...state,
              loading: false,
            }
        default:
            return state;
    }
}

export const SubmitOrderPage = () => {
    const [{loading}, dispatch] = useReducer(reducer, { loading: false });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const { paymentMethod } = cart;
    const navigate = useNavigate();

    const handleSubmitOrder = async () => {
        try {
            dispatch({ type: CREATE_REQUEST });
            const { data } = await axios.post('/order', {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemPrice: cart.itemPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            dispatch({ type: CREATE_SUCCEEDED });
            ctxDispatch({ type: CLEAR_CART });
            localStorage.removeItem("cartItems");
            navigate(`/order/${data.order._id}`);
        } catch (error) {
            dispatch({ type: CREATE_FAILED });
            toast.error(error.message)
        }
    }

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemPrice = round2(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    cart.taxPrice = round2(cart.itemPrice * 0.17);
    cart.shippingPrice = cart.itemPrice > 50 ? round2(cart.itemPrice * 0.1) : round2(cart.itemPrice * 0.02);
    cart.totalPrice = cart.itemPrice + cart.taxPrice + cart.shippingPrice;

    useEffect(() => {
        if(!paymentMethod) {
            navigate("/payment")
        }
    }, [navigate, paymentMethod]);

    return (
      <div>
        <Title title="Order's Summary" />
        <CheckoutSteps step1 step2 step3 step4 />
        <h1 className="my-3">Order's Summary</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address}{" "}
                  <br />
                  <strong>City: </strong> {cart.shippingAddress.city} <br />
                  <strong>Country: </strong> {cart.shippingAddress.country}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method: </strong> {cart.paymentMethod}
                </Card.Text>
                <Link to={"/payment"}>Edit</Link>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid rounded img-thumbnail"
                          />
                          <Link to={`/product/${item.token}`}>
                            {item.title}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link to={"/cart"}>View Cart</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Summary: </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items: </Col>
                      <Col>${cart.itemPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping: </Col>
                      <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax: </Col>
                      <Col>${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total: </Col>
                      <Col>${cart.totalPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                        <Button type="button" onClick={handleSubmitOrder} disabled={cart.cartItems.length === 0}>Submit</Button>
                    </div>
                    {loading && <Loading/>}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
}