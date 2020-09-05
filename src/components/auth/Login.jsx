import React, { useState } from 'react';
import AuthService from '../../helpers/auth/auth-service'
import { Link } from 'react-router-dom';
import { FormGroup, Form } from 'react-bootstrap';

const Login = (props) => {
  const initialState = {
    form: {
      password: '',
      email: '',
    },
    message: null
  };

  const [state, setState] = useState(initialState);

  const authService = new AuthService();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = state.form.email;
    const password = state.form.password;
    authService
      .login(email, password)
      .then((response) => {
        console.log("Esta fue la respuesta", response)
        setState({
          form: {
            password: '',
            email: '',
          },
        });
        localStorage.setItem('loggedUser', JSON.stringify(response))
        props.callbackGetUser(response);
        props.history.push("/profile")
      })
      .catch((error) => console.log(error));
  };

  const handleInput = ({ target }) => {
    setState({
      form: {
        ...state.form,
        [target.name]: target.value,
      },
    });
  };

  return (
    <div className="container">
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={state.form.email}
            onChange={(event) => handleInput(event)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={state.form.password}
            onChange={(event) => handleInput(event)}
          />
        </FormGroup>
        <button className="btn btn-primary" type="submit">
          {' '}
          Login{' '}
        </button>
      </Form>
      <p>
        Don't have account?
        <Link to={'/signup'}> Signup</Link>
      </p>
    </div>
  );
};

export default Login;
