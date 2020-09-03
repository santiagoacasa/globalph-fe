import React, { useState } from 'react';
import { Jumbotron, Form, InputGroup, Button } from 'react-bootstrap';
import CrudService from '../helpers/crud-service';
import { Redirect } from 'react-router-dom';

const Home = props => {
  const initialState = {
    search: '',
  };

  const [state, setState] = useState(initialState);

  const crudService = new CrudService();

  const handleInput = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventdefault();
    // eslint-disable-next-line no-unused-expressions
    <Redirect to={'/photographers'}/>
    /*const searchParam = state;
    crudService.searchPhotographers(searchParam)
    .then((response) => {
      setState({
        search: '',
      });
     props.history.push('/photographers')
    })
    .catch(error => console.log(error))*/
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
            placeholder="Search for a photographer near you"
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
