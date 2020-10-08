import React, { useState, useEffect } from 'react';
import { FormGroup, Form, Button } from 'react-bootstrap';
import CrudService from '../../helpers/crud-service';
import UploadService from '../../helpers/upload-service';
import ProfilePic from './ProfilePic';
import ExpPanel from './ExpPanel';
import ExpContainer from './ExpContainer';

const EditProfile = (props) => {
  const initialState = {
    form: {
      firstName: props.loggedUser.firstName || '',
      lastName: props.loggedUser.lastName || '',
      email: props.loggedUser.email || '',
      phone: props.loggedUser.phone || '',
      profilePicUrl: props.loggedUser.profilePicUrl || '',
      skills: '',
      description: props.loggedUser.description || '',
      country: props.loggedUser.country || null,
    },
    skills: props.loggedUser.skills || [],
  };

  const [warning, setWarning] = useState({
    message: 'You can add a maximum of 6 skills.',
  });
  const [state, setState] = useState(initialState);

  const crudService = new CrudService();
  const uploadService = new UploadService();

  useEffect(() => {
    if (props.loggedUser === null) {
      props.history.push({
        pathname: 'login',
        state: {from: props.location}
      })
    }
  })

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
    if (state.skills.length < 6) {
      setState({
        form: {
          ...state.form,
          skills: '',
        },
        skills: [...state.skills, skill.toLowerCase()],
      });
      setWarning({
        message: 'You can add a maximum of 6 skills.',
      });
    } else {
      setWarning({
        message: 'Remember, only a maximum of 6 skills is allowed.',
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedUser = {
      ...state.form,
    };
    updatedUser.skills = [...state.skills];
    crudService
      .updateProfile(updatedUser)
      .then((response) => {
        localStorage.setItem(
          'loggedUser',
          JSON.stringify(response.updatedUser)
        );
        props.cbUpdateLoggedUser();
        props.history.push('/profile');
      })
      .catch((err) => console.log(err));
  };

  const handleUploadPic = ({ target }) => {
    const uploadData = new FormData();
    uploadData.append('profilePic', target.files[0]);
    uploadService
      .uploadProfilePic(uploadData)
      .then((response) => {
        const picUrl = response.profilePicUrl;
        setState((state) => ({
          ...state,
          form: {
            ...state.form,
            profilePicUrl: picUrl,
          },
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteSkill = (skill) => {
    let skillsCopy = [...state.skills];
    skillsCopy.splice(state.skills.indexOf(skill), 1);
    setState({
      form: {
        ...state.form,
      },
      skills: [...skillsCopy],
    });
  };

  const listSkills = () => {
    return state.skills.map((skill) => (
      <p
        key={skill}
        style={{
          backgroundColor: 'darkgrey',
          color: 'white',
          margin: '5px',
          borderRadius: '5px',
          padding: '3px',
        }}
      >
        {' '}
        {skill}{' '}
        <span
          onClick={() => {
            handleDeleteSkill(skill);
          }}
        >
          {' '}
          X{' '}
        </span>{' '}
      </p>
    ));
  };

  const buildPage = () => {
    return (
      <div style={{marginTop: "100px", height: "100% "}}>
      <Form
        onSubmit={(event) => handleSubmit(event)}
        className="container mt-4"
      >
        <div>
        <ProfilePic picUrl={state.form.profilePicUrl} />
        </div>
        <FormGroup>
          <Form.Label htmlFor="profilePic">Profile Pic</Form.Label>
          <Form.Control
            type="file"
            name="profilePic"
            onChange={handleUploadPic}
          />
        </FormGroup>
        <ExpContainer>
        <ExpPanel title="Personal details" menuItem="personalDetails" heading="headingPersonalDetails">
          <FormGroup>
            <Form.Label htmlFor="firstName">First Name</Form.Label>
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
            <Form.Label htmlFor="lastName">Last Name</Form.Label>
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
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="A little description here"
              onChange={handleInput}
              value={state.form.description}
            />
          </FormGroup>
        </ExpPanel>
        <ExpPanel title="Contact Details" menuItem="contactDetails" heading="headingContact">
        <FormGroup>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Your email here"
              onChange={handleInput}
              value={state.form.email}
              required
              readOnly
            />
          </FormGroup>
        <FormGroup>
        <Form.Label htmlFor="phone">Phone number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Your phone here"
              onChange={handleInput}
              value={state.form.phone}
            />
          </FormGroup>
        </ExpPanel>
        {props.loggedUser.isPhotographer ? <ExpPanel title="Skills" menuItem="skills" heading="headingSkills">
          <Form.Label htmlFor="skills">Skills:</Form.Label>
          <FormGroup className="d-flex">
            <Form.Control
              type="text"
              name="skills"
              placeholder="Add a new skill"
              onChange={handleInput}
              value={state.form.skills}
            ></Form.Control>
            <Button onClick={() => addSkill(state.form.skills)} variant="dark">
              Add
            </Button>
          </FormGroup>
          <Form.Text>
            <p
              style={{
                fontSize: '14px',
                fontStyle: 'italic',
                color:
                  warning.message === 'You can add a maximum of 6 skills.'
                    ? 'black'
                    : 'red',
              }}
            >
              {warning.message}
            </p>
          </Form.Text>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {listSkills()}
          </div>
        </ExpPanel> : "" }
        </ExpContainer>
        <Button className="mt-2" type="submit" variant="dark" block>
          Save
        </Button>
      </Form>
    </div>
    )
    
  }

  return (
    buildPage()
  );
};

export default EditProfile;
