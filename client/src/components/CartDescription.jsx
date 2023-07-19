import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap"

export const CartDescription = ({product, addToCart}) => {
    return (
        <Card>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                            {product.countInStock > 0 ? (
                                <Badge bg="success">In Stock</Badge>
                            ) : (
                                <Badge bg="danger">Out of Stock</Badge>
                            )}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <div className="d-grid">
                                <Button onClick={() => addToCart()} variant="primary">Add To Cart</Button>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}