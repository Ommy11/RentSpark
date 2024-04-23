import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";
// import "./Signin.css";
import { FcGoogle } from "react-icons/fc";
// import OAuth from '../Components/OAuth';

const colors = {
  primary: "#060606",
  background: "#f5f5f5",
  disabled: "#D9d9d9",
};

function Signin() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };

  return (
    <div className="w-full max-h-screen flex items-start ">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[25%] left-[10%] flex flex-col">
          <h1 className="text-4xl font-bold my-4 ml-4 text-white">
            Turn Your Dream Events into Reality
          </h1>
        </div>
        <img
          src="https://images.pexels.com/photos/5686476/pexels-photo-5686476.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          className="w-full max-h-[910px]  object-cover"
        />
      </div>

      <div className="w-1/2 h-full  bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <h1 className="text-3xl max-w-[500px] mx-auto w-full text-[#060606] font-bold mr-auto mb-5">
          RentSpark
        </h1>

        <div className="w-full flex flex-col max-w-[500px] ">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl text-[#060606] font-semibold mb-4">
              Login
            </h3>
            <p className="text-normal text-sm mb-2">
              Welcome Back! Please enter your details.
            </p>
          </div>
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              id="password"
              onChange={handleChange}
            />
            <div className="w--full flex  item-center justify-between">
              <div className="w-full flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember me</p>
              </div>

              <p className="text-sm cursor-pointer underline underline-offset-2">
                Forgot Password?
              </p>
            </div>
            <div className="w-full flex flex-col my-4">
              <button
                disabled={loading}
                className="w-full text-[#fff] bg-[#060606] p-4 text-center items-center justify-center rounded-md "
                type="submit"
              >
                {loading ? "Loading..." : "Log in"}
              </button>
              <button className="w-full text-[#060606] my-2 bg-[#fff] border border-black font-semibold p-4 text-center items-center justify-center rounded-md">
                {" "}
                <Link to={"/signup"}>Register</Link>{" "}
              </button>
            </div>
            <div className="w-full flex items-center justify-center relative py-2">
              <div className="w-full h-[1px] bg-black/30"></div>
              <p className="text-lg absolute m-1 font-normal text-black/80 bg-white">
                or
              </p>
              {/* <div className='w-full h-[1px] bg-black'></div> */}
            </div>
            <button className="w-full text-[#060606] my-2 font-semibold bg-white border-2 border-blac/40 p-4 text-center flex items-center justify-center rounded-md">
              <FcGoogle className="h-6 w-6 mr-2" /> <OAuth />
            </button>
          </form>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            {" "}
            Dont have an account?{" "}
            <Link
              className="text-blue-800 text-xs sm:text-sm font-bold hover:underline"
              to={"/signup"}
            >
              Sign up
            </Link>
          </p>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Signin;
