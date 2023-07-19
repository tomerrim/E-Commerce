import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MessageBox } from "./MessageBox";

export const ItemsInCart = ({
  cartItems,
  handleUpdateCart,
  handleRemoveItem,
}) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your cart is empty. <Link to="/">Go back to Home Page</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded img-thumbnail card-image-page"
                  />
                  <Link to={`/product/${item.token}`}>{item.name}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => handleUpdateCart(item, item.quantity - 1)}
                    variant="light"
                    disabled={item.quantity === 1}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => handleUpdateCart(item, item.quantity + 1)}
                    variant="light"
                    disabled={item.quantity === item.countInStock}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={3}>${item.price}</Col>
                <Col md={2}>
                  <Button
                    variant="light"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
