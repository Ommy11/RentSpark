import React from "react";

function Success() {
  return (
    <div className="mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-3xl font-bold mb-4">Thanks for your order!</h2>
      <h4 className="text-xl font-semibold mb-2">Your payment was successful.</h4>
      <p className="text-lg mb-4">
        We appreciate your business! If you have any questions, please email us at{" "}
        <a href="mailto:orders@example.com" className="text-blue-800 underline">
          11omprakash.03@gmail.com
        </a>
        .
      </p>
      <div>{/* Additional content goes here */}</div>
    </div>
  );
}

export default Success;
