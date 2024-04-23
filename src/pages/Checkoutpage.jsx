// CheckoutPage.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


function CheckoutPage() {
  const { listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [numDays, setNumDays] = useState(1); // Default to 1 day
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    contact: ""
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/listing/get/${listingId}`);
        setListing(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const stripePromise = loadStripe("pk_test_51P2SkMSDXvuKXSZHxqxn6j2gLUoBfsT1JDzs0JOlfjjuCfADcPZmipr9PDtvAY7vIwDwSHYD9QwMSnez4Bg37A4a00GQgtMjFq");

  const handleToken = async () => {
    try {
      const response = await axios.post(`/api/payment/create-checkout-session/${listingId}`, {
        numDays,
        userDetails,
      });

      const sessionId = response.data.sessionId;

      // const stripe = loadStripe('pk_test_51P2SkMSDXvuKXSZHxqxn6j2gLUoBfsT1JDzs0JOlfjjuCfADcPZmipr9PDtvAY7vIwDwSHYD9QwMSnez4Bg37A4a00GQgtMjFq'); // Replace with your actual Stripe publishable key
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      setError(true);
    }
  };

  const handleNumDaysChange = (event) => {
    const value = event.target.value;
    setNumDays(value);
  };

  const handleUserDetailsChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-full">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">An error occurred.</p>
      )}

      {listing && (
        <div className="flex flex-col bg-white rounded-lg md:flex-row md:items-stretch">
          <div className="h-full w-6/12 ml-16 md:pr-4 mb-4 md:mb-40">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <h1 className="text-3xl font-bold mt-4 mb-2">{listing.title}</h1>
            <p className="text-xl mb-10">{listing.description}</p>
          </div>
          <div className="md:w-1/2 md:pl-4">
            <div className="h-full flex flex-col justify-between">
              <div className=" flex-col">
                <div className="w-6/12 ml-6">
                  <label htmlFor="numDays" className="block">Number of Days:</label>
                  <input
                    id="numDays"
                    type="number"
                    min="1"
                    value={numDays}
                    onChange={handleNumDaysChange}
                    required
                    className="border border-gray-400 rounded-md px-3 py-2 w-full "
                  />
                </div>
                <div className="w-6/12 m-6">
                  <label htmlFor="name" className="block">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleUserDetailsChange}
                    required
                    className="border border-gray-400 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="w-6/12 m-6">
                  <label htmlFor="email" className="block">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleUserDetailsChange}
                    required
                    className="border border-gray-400 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="w-6/12 m-6">
                  <label htmlFor="contact" className="block">Contact no.:</label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    value={userDetails.contact}
                    onChange={handleUserDetailsChange}
                    required
                    className="border border-gray-400 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div className="w-6/12 m-6">
                  <label htmlFor="address" className="block">Address:</label>
                  <textarea
                    id="address"
                    name="address"
                    value={userDetails.address}
                    onChange={handleUserDetailsChange}
                    required
                    className="border border-gray-400 rounded-md px-3 py-2 w-full"
                  />
                </div>
              
              <div className="">
                <button
                  onClick={handleToken}
                  className="w-6/12 m-6 bg-blue-800 text-white rounded-lg py-3 uppercase hover:opacity-95 cursor-pointer"
                >
                  Pay Now - Rs.{listing.price * numDays}
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
