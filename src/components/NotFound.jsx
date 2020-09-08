import React from 'react'
import { NavLink } from 'react-router-dom';
 

export const NotFound = () => {
    return (
        <div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/notfound.jpg`} alt="Not found"/>
            <h3>Let's get you back <NavLink to="/">Home</NavLink></h3>
        </div>
    )
}

export default NotFound;
