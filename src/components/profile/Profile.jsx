import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Rating from './Rating';
import ProfilePic from './ProfilePic';
import FooterLinks from './footer/FooterLinks';
import '../../styles/profile/profile.css'

const Profile = (props) => {

  const buildPage = user => {
    return (
    <section className="profile">
      <div className="pictures-container">
        <div className="coverPhoto">
        </div>
          <ProfilePic picUrl={user.profilePicUrl} />
          <Link style={{textDecoration: "none", fontSize: "14px"}} to="/profile/edit">
            <p style={{width: "100%", textAlign: "center", color: "black"}}>Edit profile</p>
          </Link>
      </div>

      <div className="w-100 text-center">
        <Rating>{user.rating}</Rating>
      </div>

      <div className="w-100 text-center">
          <h2>{user.firstName} {user.lastName}</h2>
      </div>
      <div className="w-100 text-center mt-5">
        <h5>{user.description}</h5>
      </div>
      <footer className="profileFooter bg-white">
      <FooterLinks user={user}/>
      </footer>
    </section>
    )
  }

  return (
    props.loggedUser === null ? <Redirect to={{pathname: '/login', state: {from: props.location}}} /> : buildPage(props.loggedUser)
  )
};

export default Profile;
