import { useContext, useEffect, useReducer } from "react"
import { Store } from "../context/store"
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../reducers/Actions";
import axios from "axios";
import { getError } from "../utils";
import { Loading } from "../components/Loading";
import { MessageBox } from "../components/MessageBox";
import { Title } from "../components/Title";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

const reducer = (state, {type, payload}) => {
    switch (type) {
        case GET_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case GET_SUCCESS: 
            return {
                ...state,
                loading: false,
                order: payload,
                error: '',
            }
        case GET_FAIL:
            return {
               ...state,
                 loading: false,
                 error: payload,
            }
        default:
            return state;
    }
}

export const OrderPage = () => {
    const { state: { userInfo } } = useContext(Store);
    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        error: null,
        order: ""
    });

    useEffect(() => {
        const getOrder = async () => {
            dispatch({type: GET_REQUEST});

            try {
                const { data } = await axios.get(`/api/order/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                });
                dispatch({type: GET_SUCCESS, payload: data});
            } catch (error) {
                dispatch({type: GET_FAIL, payload: getError(error)});
            }
        }

            if(!userInfo) {
                navigate('/signin');
            }

            if(!order || (order._id && orderId !== order._id)) {
                getOrder();
            }
    }, [navigate, userInfo, order, orderId]);

    return loading ? (
      <Loading />
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <Title title="Order" />
        <h1 className="my-3">Order {order._id.substr(order._id.length - 5)}</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="mb-3">Shipping</Card.Title>
                <Card.Text>
                  <strong>Name: </strong> {order.shippingAdress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAdress.adress},{" "}
                  {order.shippingAdress.city}, {order.shippingAdress.country}
                </Card.Text>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="warning">Not Delivered</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="mb-3">Payment</Card.Title>
                <Card.Text>
                  <strong>Method: </strong> {order.paymentMethod} <br />
                </Card.Text>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="warning">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="mb-3">Items</Card.Title>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
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
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="mb-3">Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
}