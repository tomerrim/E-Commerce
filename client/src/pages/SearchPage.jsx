import { useEffect, useReducer, useState } from "react";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../reducers/Actions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError, getFilterUrl } from "../utils";
import { Title } from "../components/Title";
import { Button, Col, Row } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { Loading } from "../components/Loading";
import { MessageBox } from "../components/MessageBox";
import { Product } from "../components/Product/Product.jsx";
import { LinkContainer } from "react-router-bootstrap";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload.products,
        page: payload.page,
        pages: payload.pages,
        countProducts: payload.countProducts,
      };
    case GET_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

export const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "desc";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

    const navigateToOption = (e) => {
        navigate(getFilterUrl(search, { order: e.target.value }))
    }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    getCategories();
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.get(
          `/api/products/search?query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );
        dispatch({
          type: GET_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
      }
    };
    getData();
  }, [query, category, price, rating, order, page]);

  return (
    <div>
      <Title title="Search Products" />
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl(search, { category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={getFilterUrl(search, { category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl(search, { price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={p.value === price ? "text-bold" : ""}
                    to={getFilterUrl(search, { price: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reviews</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    className={`${r.rating}` === `${rating}` ? "text-bold" : ""}
                    to={getFilterUrl(search, { rating: r.rating })}
                  >
                    <Rating caption={" "} rating={r.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant={"danger"}>{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + " & up"}
                    {query !== "all" ||
                    category !== "all" ||
                    price !== "all" ||
                    rating !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by
                  <select
                    value={order}
                    onChange={navigateToOption}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox variant={"warning"}>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((p) => (
                  <Col sm={6} lg={4} className="mb-3" key={p._id}>
                    <Product product={p}/>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer key={x + 1} className="mx-1" to={{pathname: '/search', search: getFilterUrl(search, { page: x + 1 }, true)}}>
                        <Button variant="light" className={Number(page) === x + 1 ? "current-page-number" : ""}>{x + 1}</Button>
                    </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
