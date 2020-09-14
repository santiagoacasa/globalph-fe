import React, { useState, useEffect } from 'react';
import { Jumbotron, Form, InputGroup, Button, Container } from 'react-bootstrap';
import CrudService from '../../helpers/crud-service';
import BackgroundImg from '../../images/homepage-image.jpg'
import '../../styles/home.css'
import Steps from './Steps';
import { NavLink } from 'react-router-dom';


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
    <div className="homepage">
      
        <h1 className="text-white">Welcome to GlobalPH!</h1>
      <p className="text-white">
          Get in touch and book photographers from all around the world!
        </p>
     
        <div className="searchContainer">
        <Container>
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
              <Button type="submit" variant="dark">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        </Container>
        </div>
        
        <Steps/>
        <footer id="footerCopy"><div><p>Coded by <NavLink to="https://github.com/santiagoacasa">Santi Casa</NavLink></p></div></footer> 
    </div>
  );
};

export default Home;
