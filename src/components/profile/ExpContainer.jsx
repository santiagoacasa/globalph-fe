import React from 'react'

const ExpContainer = props => {
    return (
        <div className="accordion" id="accordionExample">
            {props.children}
        </div>
    )
}

export default ExpContainer
