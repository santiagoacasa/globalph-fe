import React from 'react'
import { Link } from 'react-router-dom'

const FooterLink = props => {
    return (
        <div className="footerLink">
            <Link to={props.linkTo}>
            <img src={props.imageSrc} alt=""/>
            </Link>
            <p className="text-center w-100">{props.children}</p>
        </div>
    )
}

export default FooterLink
