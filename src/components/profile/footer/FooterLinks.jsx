import React from 'react'
import FooterLink from './FooterLink'

const FooterLinks = props => {
    return (
        <div className="footerlinks">
          {props.user.isPhotographer ? <FooterLink linkTo="/portfolio/edit" imageSrc={`${process.env.PUBLIC_URL}/assets/images/001-picture.png`}>
            Portfolio 
            </FooterLink> : "" }
            <FooterLink linkTo="/" imageSrc={`${process.env.PUBLIC_URL}/assets/images/003-mail.png`}>
              Inbox 
            </FooterLink>
            <FooterLink linkTo="/" imageSrc={`${process.env.PUBLIC_URL}/assets/images/002-document.png`}>
              Jobs  
            </FooterLink>
        </div>
    )
}

export default FooterLinks
