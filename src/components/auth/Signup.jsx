import React, { useState, useEffect } from 'react';
import AuthService from '../../helpers/auth/auth-service'
import { Link } from 'react-router-dom';
import { FormGroup, Form } from 'react-bootstrap';

const Signup = (props) => {
  const initialState = {
    form: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      isPhotographer: false
    },
    errorMessage: '',
    passwordMatch: false
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
   if (props.loggedUser)
   {
    props.history.push("/profile")
   } 
  })

  const authService = new AuthService();

  const checkPasswordMatch = (password, confirmPassword) => {
    console.log("password", password)
    console.log("Confirm password", confirmPassword)
    console.log("Son iguales?", password === confirmPassword)
    return password === confirmPassword;
  }

  const handleInput = ({ target }) => {
    if(target.name === "confirmPassword") { 
      setState({
        ...state,
        form: {
          ...state.form,
          [target.name]: target.value
        },
        passwordMatch: checkPasswordMatch(state.form.password, state.form.confirmPassword)
      })
      console.log(checkPasswordMatch(state.form.password, state.form.confirmPassword))
    } else {
      setState({
        ...state,
        form: {
          ...state.form,
          [target.name]: target.value,
        }
      });
    }
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
            password: '',
            email: '',
          },
        });
        props.callbackGetUser(response);
        props.history.push("/profile")
      })
      .catch((error) => {
        setState({
          ...state,
          errorMessage: error.response.data.errorMessage
        })
        console.log(error.response.data.errorMessage)});
  };

  return (
    
    <div className="container mt-4">
      <Form onSubmit={(event) => handleSubmit(event)} encType="multipart/form-data">
        <FormGroup>
          <Form.Label htmlFor="">First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Your First Name goes here"
            onChange={handleInput}
            value={state.form.firstName}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="">Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="And your Last Name"
            onChange={handleInput}
            value={state.form.lastName}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="">Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Your email here"
            onChange={handleInput}
            value={state.form.email}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your email</Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="One creative password here"
            aria-describedby="passwordHelp"
            onChange={handleInput}
            value={state.form.password}
            required
          />
          <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Text id="passwordHelp">At least 8 characters long + one Uppercase letter.</Form.Text>
        </FormGroup>
        <FormGroup className="text-center">
          <Form.Check type="checkbox" name="isPhotographer" label="I'm a photographer" onChange={handleCheckbox}/>
        </FormGroup>
        <p style={{color: "red"}}>{state.errorMessage}</p>
        <button type="submit" className="btn btn-dark btn-block">
          Signup
        </button>
        <p className="mt-3 w-100 text-center">
          Already have an account?
          <Link to={'/login'}> Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
