import React from 'react'

const Thumbnail = props => {
    return (
        <div className="mt-4">
            <img width="100%" height="auto" src={props.image} alt="thumbnail"/>
        </div>
    )
}

export default Thumbnail
