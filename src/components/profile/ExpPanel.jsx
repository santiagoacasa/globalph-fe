import React from 'react'

const ExpPanel = props => {
  return (
      <div className="card">
        <div className="card-header" id={props.heading}>
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed text-dark"
              type="button"
              data-toggle="collapse"
              data-target={`#${props.menuItem}`}
              aria-expanded="false"
              aria-controls={props.menuItem}
            >
              {props.title}
            </button>
          </h5>
        </div>

        <div
          id={props.menuItem}
          className="collapse"
          aria-labelledby={props.heading}
          data-parent="#accordionExample"
        >
          <div className="card-body">
           {props.children}
          </div>
        </div>
      </div>
  );
}

export default ExpPanel


