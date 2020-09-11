import React, { useState, useEffect } from 'react';
import AuthService from '../../helpers/auth/auth-service';
import { Link, Redirect } from 'react-router-dom';
import Rating from './Rating';
import ProfilePic from './ProfilePic';
import FooterLinks from './FooterLinks';

const Profile = (props) => {

  const buildPage = user => {
    return (
        <section>
      <div>
        <div className="coverPhoto">
          <img src="" alt="" />
        </div>
        <ProfilePic picUrl={user.profilePicUrl} />
        <Link to="/profile/edit">
          <p>Edit profile</p>
        </Link>
      </div>
      <div>
        <p>{user.rating}</p>
        <Rating>{user.rating}</Rating>
      </div>
      <div>
          <h3>{user.firstName} {user.lastName}</h3>
          <h4>{user.description}</h4>
      </div>
      <FooterLinks/>
    </section>
    )
  }

  return (
    props.loggedUser === null ? <Redirect to={{pathname: '/login', state: {from: props.location}}} /> : buildPage(props.loggedUser)
  )
};

export default Profile;
