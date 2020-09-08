import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { FormGroup, Form, Button } from 'react-bootstrap';
import CrudService from '../../helpers/crud-service';

const EditProfile = (props) => {
  const initialState = {
    form: {
      id: props.loggedUser._id,
      firstName: props.loggedUser.firstName,
      lastName: props.loggedUser.lastName,
      email: props.loggedUser.email,
      profilePicUrl: props.loggedUser.profilePicUrl,
      skills: '',
      description: props.loggedUser.description || "",
      country: props.loggedUser.country || null,
    },
    skills: props.loggedUser.skills || [],
  };
  const [state, setState] = useState(initialState);

  const crudService = new CrudService();

  const handleInput = ({ target }) => {
    setState({
      ...state,
      form: {
        ...state.form,
        [target.name]: target.value,
      },
    });
  };

  const addSkill = (skill) => {
    setState({
      form: {
        ...state.form,
        skills: '',
      },
      skills: [...state.skills, skill],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedUser = {
      ...state.form,
    };
    updatedUser.skills = [...state.skills]
    crudService.updateProfile(updatedUser)
    .then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.updatedUser))
        props.cbUpdateLoggedUser()
        props.history.push("/profile")   
    })
    .catch(err => console.log(err))
  };

  const listSkills = () => {
    return state.skills.map((skill) => <p key={skill}>{skill}</p>);
  };

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
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
      </FormGroup>
      <FormGroup>
        <Form.Control
          type="text"
          name="skills"
          placeholder="Add a new skill"
          onChange={handleInput}
          value={state.form.skills}
        ></Form.Control>
        <Button onClick={() => addSkill(state.form.skills)}>Add</Button>
        <Button type="submit">Save</Button>
      </FormGroup>
      <div>
        <p>Skills:</p>
        {listSkills()}
      </div>
    </Form>
  );
};

export default EditProfile;
