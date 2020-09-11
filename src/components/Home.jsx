import React, { useState, useEffect } from 'react';
import { Jumbotron, Form, InputGroup, Button } from 'react-bootstrap';
import CrudService from '../helpers/crud-service';
import { Redirect } from 'react-router-dom';

const Home = props => {
  const initialState = {
    search: '',
    results: null
  };

  const [state, setState] = useState(initialState);

  const crudService = new CrudService();

  useEffect(() => {
    if(state.results != null) {
      props.history.push({
        pathname: '/photographers',
        state: state.results
      })
    }
  })

  const handleInput = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   const searchParam = state.search;
    crudService.searchPhotographers(searchParam)
    .then((response) => {
      setState({
        search: '',
        results: response
      });
    })
    .catch(error => console.log(error))
  };

  console.log("Usuario logueado: ", props.loggedUser)

  return (
    <div>
      <Jumbotron>
        <h1>Welcome!</h1>
        <p>
          Get in touch with photographers around the world and find the one that
          better suits your creative needs!
        </p>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="search"
            placeholder="ex: landscape"
            onChange={handleInput}
            value={state.search}
          />
            <InputGroup.Append>
              <Button type="submit" variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Jumbotron>
    </div>
  );
};

export default Home;
