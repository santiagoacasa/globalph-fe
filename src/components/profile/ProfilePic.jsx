import React from 'react'

const ProfilePic = props => {
    return (
        <div>
            <img src={props.picUrl}
            className="profilePic" alt="User Profile"/>
        </div>
    )
}

export default ProfilePic
