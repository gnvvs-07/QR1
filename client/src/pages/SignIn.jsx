import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
export default function SignIn() {
  // navigation
  const navigation = useNavigate();
  // handling the formData,errors,loading
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

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
      return setError("Please fill all the fields");
    }
    // API calling and submitting
    try {
      // API for creating account
      setLoading(true);
      setError(null);
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
      //   if the response is ok
      if (res.ok) {
        //   redirect to login page
        navigation("/qr");
      }
    } catch (error) {
      setError("Error while creating account please try agina later....");
      setLoading(true);
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
