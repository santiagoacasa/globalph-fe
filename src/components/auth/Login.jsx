import React, { useState } from 'react';
import AuthService from '../../helpers/auth/auth-service'
import { Link } from 'react-router-dom';
import { FormGroup, Form } from 'react-bootstrap';

const Login = (props) => {
  const initialState = {
    form: {
      password: '',
      email: '',
      isPhotographer: false
    },
    errorMessage: ""
  };

  const [state, setState] = useState(initialState);

  const authService = new AuthService();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = state.form.email;
    const password = state.form.password;
    const isPhotographer = state.form.isPhotographer;
    authService
      .login(email, password, isPhotographer)
      .then((response) => {
        setState({
          ...state,
          form: {
            password: '',
            email: '',
            isPhotographer: false
          },
        });
        localStorage.setItem('loggedUser', JSON.stringify(response))
        props.callbackGetUser(response);
        props.history.push("/profile")
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage)
        setState({
          ...state,
          errorMessage: error.response.data.errorMessage
        })
      });
  };

  const handleInput = ({ target }) => {
    setState({
      form: {
        ...state.form,
        [target.name]: target.value,
      },
    });
  };

  const handleCheckbox = ({target}) => {
    setState({
      ...state,
      form: {
        ...state.form,
        isPhotographer: !state.form.isPhotographer
      }
    })
  }

  return (
    <div className="container mt-4">
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
        <FormGroup className="text-center">
          <Form.Check type="checkbox" name="isPhotographer" label="I'm a photographer" onChange={handleCheckbox}/>
        </FormGroup>
        <p style={{color: "red"}}>{state.errorMessage}</p>
        <button className="btn btn-dark btn-block" type="submit">
          Login
        </button>
      </Form>
      <p className="mt-3 w-100 text-center">
        Don't have account?
        <Link to={'/signup'}> Signup</Link>
      </p>
    </div>
  );
};

export default Login;
