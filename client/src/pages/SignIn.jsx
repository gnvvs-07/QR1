import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="relative w-full">
            <input
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
          Sign Up
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
