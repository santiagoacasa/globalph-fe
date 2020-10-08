import React from 'react';
import Rating from './Rating';
import ProfilePic from './ProfilePic';
import Thumbnail from '../Thumbnail';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/profile/profile.css'
import ExpContainer from './ExpContainer';
import ExpPanel from './ExpPanel'
import {NavLink} from 'react-router-dom'

const PhProfile = (props) => {

    const userToDisplay= {...props.location.state}

    const listSkills = () => {
        return userToDisplay.skills.map((skill) => (
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
            {skill}
          </p>
        ));
      };

      const generateThumbnails = () => {
        return userToDisplay.portfolio.map((picture, idx) => (
          <Row key={idx}>
            <Col>
              <Thumbnail image={picture} />
            </Col>
          </Row>
        ));
      };

  const buildPage = user => {
    return (
    <section className="profile">
      <div className="pictures-container">
        <div className="coverPhoto">
        </div>
          <ProfilePic picUrl={user.profilePicUrl} />
      </div>
      <div className="w-100 text-center">
        <Rating>{user.rating}</Rating>
      </div>
      <div className="w-100 text-center">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>email: {user.email}</p>
          <p>phone: {props.loggedUser ? user.phone : (<span>
                  { ' ' }
                  Please <NavLink to="/login">login</NavLink> to view this info
                </span>)}</p>
      </div>
      <div className="w-100 text-center  mt-5 border">
        <h6 className="font-italic">{user.description}</h6>
      </div>
      <Container>
      <div className="container mt-5">
          <h6>Skills</h6>
          <div style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}>
                {listSkills()}
            </div>
      </div>
      </Container>
      <div className="mt-5">
      <ExpContainer>
        <ExpPanel title="Display pictures" menuItem="displayPictures" heading="headingPictures">
          {userToDisplay.portfolio.length > 0 ? generateThumbnails() : ''}
        </ExpPanel>
        </ExpContainer>
      </div>
      
    </section>
    )
  }

  return (
   buildPage(userToDisplay)
  )
};

export default PhProfile;
