import { Badge, Container, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { Store } from "../../context/store";
import axios from "axios";
import { handleAddToCart } from "../../utils";
import { USER_SIGNOUT } from "../../reducers/Actions";
import { SearchBar } from "../SearchBar";

export const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems }, userInfo } = state;

  const handleDrop = async (event) => {
    event.preventDefault();
    const productId = event.dataTransfer.getData("text/plain");
    const { data } = await axios.get(`/api/products/${productId}`);
    await handleAddToCart(data, cartItems, ctxDispatch);
  }

  const handleSignout = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  }

  return (
    <header className="App-header">
      <Navbar bg="dark" varient="dark">
        <Link className="ms-3" onClick={() => navigate(-1)}>
          {location.pathname !== "/" && (
            <i className="fa fa-arrow-left text-white">
              <i className="fa fa-home text-white"></i>
            </i>
          )}
          </Link>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={100}
                alt="AMZN"
              />
            </Navbar.Brand>
          </LinkContainer>
          <nav className="d-flex mx-auto align-items-center" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <SearchBar/>
          </nav>
          <Link to="/cart" className="nav-link me-4 ms-4">
            <i className="fas fa-shopping-cart text-white"></i>
            {cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cartItems.reduce((a,c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
          {userInfo ? (
            <NavDropdown className="text-white me-5" title={userInfo.name} id="navbarDropDown">
              <Link onClick={handleSignout} to="#signout" className="dropdown-item">Sign OUt</Link>
            </NavDropdown>
          ) : (
            <>
            <Link className="nav-link text-white" to="/signin">Sign In</Link>
            <span className="nav-link text-white ms-1 me-1">or </span>
            <Link className="nav-link text-white" to="/signup">Sign Up</Link>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
}