import React from 'react';

const Rating = (props) => {
  const ratingStars = ['☆☆☆☆☆', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'];
  const rating = Math.round(Number(props.children));
  return (
    <h5
      style={{
        color: 'orange',
      }}
    >
      {ratingStars[rating]}
    </h5>
  );
};

export default Rating;
