import React, { useState } from 'react';
import AuthService from '../../helpers/auth/auth-service'
import { Link } from 'react-router-dom';
import { FormGroup, Form } from 'react-bootstrap';

const Signup = (props) => {
  const initialState = {
    form: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    },
  };

  const [state, setState] = useState(initialState);

  const authService = new AuthService();

  const handleInput = ({ target }) => {
    setState({
      form: {
        ...state.form,
        [target.name]: target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { ...state };
    authService
      .signup(newUser)
      .then((response) => {
        setState({
          form: {
            firstName: '',
            lastName: '',
            validated: false,
            password: '',
            email: '',
          },
        });
        console.table(response);
        props.callbackGetUser(response);
        props.history.push("/profile")
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <Form onSubmit={(event) => handleSubmit(event)}>
        <FormGroup>
          <Form.Label htmlFor="">First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Your First Name goes here"
            onChange={handleInput}
            value={state.form.firstName}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="And your Last Name"
            onChange={handleInput}
            value={state.form.lastName}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="">Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Your email here"
            onChange={handleInput}
            value={state.form.email}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id=""
            placeholder="Password: min 7 characters"
            onChange={handleInput}
            value={state.form.password}
          />
        </FormGroup>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        <p>
          Already have account?
          <Link to={'/login'}> Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
