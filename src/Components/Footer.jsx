import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 ">
      {/* footer section */}
      <footer className="py-10 mx-auto bg-gray-900">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="gap-5 flex flex-col ml-10">
            <h3 className="gap-5  text-white text-xl font-bold">RentSpark</h3>
            <p className="text-white">
              (+91) 6267278294 <br />
              rentspark.com
            </p>
          </div>

          {/* 2nd column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xl font-bold">
              Quick Links
            </h3>
            <Link
              to="/"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/search"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Search
            </Link>
            
            <Link
              to="/about"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Contact
            </Link>
          </div>

           


          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xl font-bold">
              Categories
            </h3>
            <Link
              to="/search"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Photography
            </Link>

            <Link
              to="/search"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Videography
            </Link>
            
            <Link
              to="/search"
            //   className="font-semibold text-gray-500 hover:underline hover:text-white"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Events Venue
            </Link>
            <Link
              to="/contact"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Catering
            </Link>
            <Link
              to="/search"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Tenthouse and Decorations
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white text-xl font-bold">
              Getting Started
            </h3>
            <Link
              to="/signup"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Sign Up
            </Link>

            <Link
              to="/signin"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Sign In
            </Link>
            
            <h3 className="text-white text-xl font-bold">
              Support
            </h3>
            <Link
              to="/help"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Help desk
            </Link>
            <Link
              to="/featurearequest"
              className="font-semibold text-gray-500 hover:underline hover:text-white"
            >
              Feature Request
            </Link>
          </div>
          
          

          {/* 3rs column */}
          <div>
            <h3 className="text-white text-xl font-bold">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <FaFacebook className="text-white text-2xl cursor-pointer" />
              <FaInstagram className="text-white text-2xl cursor-pointer" />
              <FaTwitter className="text-white text-2xl cursor-pointer" />
            </div>
          </div>
          </div>
        

        {/* bottom section */}
        <div className="mt-5 py-3 bg-gray-800">
          <hr className="border-gray-300" />
          <div className="mx-auto">
            <p className="mt-5 justify-start text-gray-500 text-center ">
              @{new Date().getFullYear()} RentSpark. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
      </div>
    // </div>
  );
};

export default Footer;