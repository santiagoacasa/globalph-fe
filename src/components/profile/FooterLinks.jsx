import React from 'react'
import { Link } from 'react-router-dom'

const FooterLinks = () => {
    return (
        <div className="footerlinks">
            <div>
                <Link to="/portfolio/edit">
                <img src={`${process.env.PUBLIC_URL}/assets/images/ar-camera.png`} alt=""/>
                </Link>
                <p>Edit portfolio</p>
            </div>
            <div>
                <img src="" alt=""/>
                <p></p>
            </div>
            <div>
                <img src="" alt=""/>
                <p></p>
            </div>
        </div>
    )
}

export default FooterLinks
