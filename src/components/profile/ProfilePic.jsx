import React from 'react'

const ProfilePic = props => {
    return (
        <div >
            <img src={props.picUrl} style={{
                width: "250px",
                height: "auto"
            }} className="userProfilePic" alt="User Profile"/>
        </div>
    )
}

export default ProfilePic
