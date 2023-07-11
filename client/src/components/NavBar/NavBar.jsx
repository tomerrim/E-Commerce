import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {

    const navigate = useNavigate();

    return (
      <header className="App-header">
        <Navbar bg="dark" varient="dark">
          <Link onClick={() => navigate(-1)}>Back</Link>
          <Container className="container">
            <LinkContainer to={"/"}>
              <Navbar.Brand>
                <img
                  src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                  width={100}
                  alt="AMZN"
                />
              </Navbar.Brand>
            </LinkContainer>
            <nav className="d-flex mx-auto align-items-center">
              <input type="text" placeholder="Search..." />
            </nav>
            <Link to="/cart" className="nav-link me-4 ms-4">
              Cart
            </Link>
          </Container>
        </Navbar>
      </header>
    );
}