import React from 'react'
import { NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const PhotographerCard = props => {

    const isPhotographer = props.loggedUser ? props.loggedUser.isPhotographer : false

    return (
        <Card>
                <NavLink to="/photographer">
                    <Card.Img variant="top" src={props.profilePic} /> 
                </NavLink>
            <Card.Body>
                <Card.Title>
                 <h3><span>{props.firstName}</span><span>{props.lastName}</span></h3>
                </Card.Title>
                <Card.Text>
                    Email: {isPhotographer ? props.email : <span> Please <NavLink to="/login">login</NavLink> to view this info</span>}
                </Card.Text>
            </Card.Body>
        </Card>   
    )
}

export default PhotographerCard

