import React, { useState, useEffect } from 'react';
import AuthService from '../../helpers/auth/auth-service';
import { Link, Redirect } from 'react-router-dom';
import Rating from './Rating';

const Profile = (props) => {

 /* useEffect(() => {
    if (!props.loggedUser) {
      props.history.push('/login');
    }
  });*/

  const buildPage = user => {
    return (
        <section>
      <div>
        <div className="coverPhoto">
          <img src="" alt="" />
        </div>
        <div className="profilePic">
          <img src={user.profilePicUrl} alt="Profile pic" />
        </div>
      </div>
      <div>
        <p>{user.rating}</p>
        <Rating>{user.rating}</Rating>
      </div>
      <div>
          <h3>{user.firstName} {user.lastName}</h3>
          <h4>{user.description}</h4>
      </div>
        <div className="profileLinks">
            <div>
                <img src="" alt="portfolio"/>
                <p>Portfolio</p>
            </div>
            <div>
            <img src="" alt="edit profile"/>
                <p>Edit profile</p>
            </div>
            <div>
            <img src="" alt="projects"/>
                <p>Projects</p>
            </div>
        </div>
    </section>
    )
  }

  return (
    props.loggedUser === null ? <Redirect to={'/login'} /> : buildPage(props.loggedUser)
  )
};

export default Profile;
