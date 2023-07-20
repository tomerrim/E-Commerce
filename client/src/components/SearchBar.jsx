import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterUrl } from "../utils";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const link = getFilterUrl(search, { query });
    navigate(link);
  };

  useEffect(() => {
    if (!query) return;
    const link = getFilterUrl(search, { query });
    navigate(link);
  }, [query, navigate, search]);

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="d-flex me-auto w-120">
      <InputGroup>
        <FormControl
          aria-describedby="searchButton"
          type="text"
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="searchButton">
            <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};
