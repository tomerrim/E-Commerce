import { useState, useContext, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Title } from "../components/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../context/store";
import axios from "axios";
import { USER_SIGNIN } from "../reducers/Actions";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassord] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassord) {
        toast.error("Passwords do not match");
        return;
    }
    try {
      const { data } = await axios.post("/users/signup", { name, email, password });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      navigate(redirect);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="small-container">
      <Title title={"Sign Up"}/>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassord(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          Already have an Account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign In Here</Link>
        </div>
      </Form>
    </Container>
  );
};
