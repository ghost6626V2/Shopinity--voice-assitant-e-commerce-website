import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Registration() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      await getCurrentUser();
      toast.success("User Registration Successful");
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("User Registration Successful");
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("User Registration Failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-yellow-100 to-amber-200 font-sans flex flex-col items-center justify-center relative">
      <div
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="OneCart" className="w-12 h-12" />
        <h1 className="text-2xl font-extrabold text-black">Shopinity</h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        <button
          onClick={googleSignup}
          className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-full mb-4 hover:bg-blue-600 transition duration-300"
        >
          <img src={google} alt="Google" className="w-5 h-5 mr-2 bg-white rounded-full p-0.5" />
          Register with Google
        </button>

        <div className="text-center text-gray-400 text-sm mb-4">OR</div>

        <form onSubmit={handleSignup} className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-gray-800"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-gray-800"
            required
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 text-gray-800"
              required
            />
            {show ? (
              <IoEye
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={() => setShow(false)}
              />
            ) : (
              <IoEyeOutline
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 flex items-center justify-center"
          >
            {loading ? <Loading /> : "Create Account"}
          </button>
        </form>

        <p className="text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Registration;
