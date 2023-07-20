import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Store } from "../context/store";
import { SAVE_SHIPPING_ADDRESS } from "../reducers/Actions";
import { Title } from "../components/Title";
import { Button, Form } from "react-bootstrap";
import { CheckoutSteps } from "../components/CheckoutSteps/CheckoutSteps";

export const ShippingAddressPage = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress } } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || "");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");

    useEffect(() => {
        if(!userInfo) {
            navigate("/signin?redirect=/shipping");
        }
    }, [userInfo, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: SAVE_SHIPPING_ADDRESS,
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        localStorage.setItem("shippingAddress", JSON.stringify({fullName, address, city, postalCode, country}));
        navigate("/payment");
    };

    return (
        <div>
            <Title title="Shipping Address"/>
            <CheckoutSteps step1 step2/>
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} required/>
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}