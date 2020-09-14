import React from 'react';

const Steps = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
            <div className="card" >
            <img src={`${process.env.PUBLIC_URL}/assets/images/home/001-website.png`} className="stepsImgs" alt="search"/>
                <div className="card-body">
                    <p className="card-text">Search based on the skills you need</p>
                </div>
            </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
            <div className="card">
                <img src={`${process.env.PUBLIC_URL}/assets/images/home/002-group.png`} className="stepsImgs" alt="contact"/>
                <div className="card-body">
                    <p className="card-text">Get in touch with as many professionals as you want to share your ideas!</p>
                </div>
            </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
        <div className="card">
                <img src={`${process.env.PUBLIC_URL}/assets/images/home/003-photographer.png`} className="stepsImgs" alt="photographer"/>
                <div className="card-body">
                    <p className="card-text">Book the professional that suit your needs.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
