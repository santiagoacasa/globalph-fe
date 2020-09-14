import React from 'react'
import { NavLink } from 'react-router-dom';
 

export const NotFound = () => {
    return (
        <div className="d-flex flex-column mt-5">
            <img src={`${process.env.PUBLIC_URL}/assets/images/notfound.jpg`} alt="Not found"/>
            <p className="w-100 text-center">Let's get you back <NavLink to="/">Home</NavLink></p>
        </div>
    )
}

export default NotFound;
