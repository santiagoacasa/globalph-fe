import React from 'react'

const PhotographerCard = props => {
    return (
        <div>
            <div>
                <img src={props.profilePic} alt=""/>
                <h3><span>{props.firstName}</span><span>{props.lastName}</span></h3>
            </div>
        </div>
    )
}

export default PhotographerCard
