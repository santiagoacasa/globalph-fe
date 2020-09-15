import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const PhotographerCard = (props) => {
  const isPhotographer = props.loggedUser
    ? props.loggedUser.isPhotographer
    : false;

  return (
  <div className="card" style={{maxWidth: "90%"}}>
  <div className="row no-gutters">
    <Link to={{pathname: "/photographers/selected", state: props.photographer}}>
    <div className="col-sm-5">
    <img src={ props.profilePic } className="card-img" alt="..." />
    </div>
    </Link>
      <div className="col-sm-7">
        <div className="card-body">
          <h5>{ props.firstName }  { props.lastName }</h5>
          <p className="card-text">
            <strong>Email:</strong> { props.email }
          </p>
          <p className="card-text">
            <strong>Phone: </strong>
            <span>{ props.loggedUser ? (
              props.phone
            ) : (
                <span>
                  { ' ' }
                  Please <NavLink to="/login">login</NavLink> to view this info
                </span>
              ) }</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};



export default PhotographerCard;
