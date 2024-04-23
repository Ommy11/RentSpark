// Review.js

import React from "react";

const Review = ({ review }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl font-semibold">{review.author}</h3>
      <p className="text-gray-600">{review.content}</p>
      <p className="text-sm text-gray-400">Rating: {review.rating}/5</p>
    </div>
  );
};

export default Review;
