import { useNavigate } from "react-router-dom"
import { Store } from "../context/store";
import { useContext, useEffect, useState } from "react";
import { SAVE_PAYMENT_METHOD } from "../reducers/Actions";
import { Title } from "../components/Title";
import { CheckoutSteps } from "../components/CheckoutSteps/CheckoutSteps";
import { Button, Form } from "react-bootstrap";

export const PaymentPage = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingAddress, paymentMethod } } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "PayPal");

    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: SAVE_PAYMENT_METHOD,
            payload: paymentMethodName
        });
        localStorage.setItem("paymentMethod", paymentMethodName);
        navigate("/placeorder");
    }

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [navigate, shippingAddress]);

    return (
      <div>
        <Title title={"Payment"} />
        <CheckoutSteps step1 step2 step3 />
        <div className="container small-container">
          <h1 className="my-3">Shipping Address</h1>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName === "Stripe"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>
            <div className="mb-3">
                <Button type="submit">Continue</Button>
            </div>
          </Form>
        </div>
      </div>
    );
}