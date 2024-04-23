import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { FaShare, FaMapMarkerAlt } from "react-icons/fa";
import Contact from "../Components/Contact";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Navigation]);

function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const listingId = useParams().listingId;
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="mx-auto">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}

      {listing && !loading && !error && (
        <>
          <div className="mx-auto">
            <Swiper navigation className="">
              {listing.imageUrl.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[750px] w-full p-12 mx-auto flex flex-row justify-center rounded-md"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute  right-4 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="absolute  right-6 z-10 rounded-md bg-slate-100 p-2">
                Link copied!
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-8 mx-auto max-w-7xl">
            <div className="lg:w-1/2 h-full mx-auto">
              <div className="p-8 my-7  bg-white rounded-lg shadow-lg">
                <label htmlFor="description" className="text-xl font-semibold">
                  Description:
                </label>
                <p className="mt-2">{listing.description}</p>
              </div>
            </div>

            <div className="lg:w-1/2 mx-auto">
              <div className="p-8 my-7 bg-white rounded-lg shadow-lg">
                <p className="text-3xl font-bold">{listing.title}</p>
                <p className="text-xl font-semibold">{listing.category}</p>
                <p className="flex items-center mt-6 text-normal text-slate-600">
                  <FaMapMarkerAlt className="text-green-700" />
                  {listing.address}
                </p>
                <p className="flex items-center mt-6 text-slate-600 text-normal">
                  <FaMapMarkerAlt className="text-green-700" />
                  Contact no. - {listing.contact}
                </p>
                <p className="mt-6 text-2xl font-semibold">
                  Rs.{" "}
                  {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  / day
                </p>
                {currentUser &&
                  listing.userRef !== currentUser._id &&
                  !contact && (
                    <button
                      onClick={() => setContact(true)}
                      className="p-3 mt-6 w-full bg-blue-800 text-white rounded-lg uppercase hover:opacity-95"
                    >
                      Contact Service Provider
                    </button>
                  )}
                {contact && <Contact listing={listing} />}

                {currentUser && listing.userRef !== currentUser._id && (
                  <div className="p-3 mt-4 w-full flex justify-center items-center gap-1 bg-blue-800 text-white rounded-lg uppercase hover:opacity-95">
                    <Link to={`/payment/${listingId}`}>
                      <button className="w-full uppercase">Book Now</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
