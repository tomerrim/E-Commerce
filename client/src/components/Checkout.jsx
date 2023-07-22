import { Button, Card, ListGroup } from "react-bootstrap"

export const Checkout = ({cartItems, handleCheckout}) => {
    return (
        <Card>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>
                            Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}) <br />
                            Items: ${cartItems.reduce((a,c) => a + c.price * c.quantity, 0).toFixed(2)}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid">
                            <Button variant="primary" disabled={cartItems.length === 0} onClick={() => handleCheckout()}>
                                Checkout
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )

}