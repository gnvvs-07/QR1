import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
// reducers
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
// import XAuth from "../components/XAuth";
export default function SignIn() {
  // navigation
  const navigation = useNavigate();
  // handling the formData,errors,loading
  const [formData, setFormData] = useState({});
  // using selctor for error and loading w.r.t user
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  // dispatch the states
  const dispatch = useDispatch();
  // handling changes in formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handling submit
  const handleSubmit = async (e) => {
    // here you can call your API or function to handle the form data
    e.preventDefault();
    // if the data filled is empty
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("All Fields are required"));
    }
    // API calling and submitting
    try {
      // API for creating account
      dispatch(signInStart());
      // res
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //   convert the response to data
      const data = await res.json();
      // login fail
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      //   if the response is ok
      if (res.ok) {
        // login success
        dispatch(signInSuccess(data));
        //   redirect to login page
        navigation("/");
      }
    } catch (error) {
      // failure
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="flex flex-col gap-4">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="relative w-full">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? <PacmanLoader /> : "Sign In"}
        </button>
        <div className="flex flex-col items-center mt-5">
          <div className="flex items-center w-full my-5">
            <hr className="flex-grow border-t border-black" />
            <p className="text-center text-sm font-semibold px-2">or</p>
            <hr className="flex-grow border-t border-black" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <button>
              <OAuth />
            </button>
            {/* <button>
              <XAuth />
            </button> */}
          </div>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Create a account here
          </Link>
        </p>
      </div>
    </div>
  );
}
