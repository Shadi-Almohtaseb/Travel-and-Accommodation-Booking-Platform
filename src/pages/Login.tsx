import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loginUser } from "../redux/thunks/userThunk";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { User, loading } = useSelector((state: RootState) => state.authUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(userDetails)).unwrap();
      toast.success("Login successful");
      navigate("/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen dark:bg-default-50 bg-slate-50 flex-col py-4 sm:px-6 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center gap-5 mt-[12rem]">
        <h2 className="text-center text-4xl font-extrabold">Login</h2>
        <img
          width="55"
          height="55"
          src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-login-web-security-flatarticons-blue-flatarticons.png"
          alt="external-login-web-security-flatarticons-blue-flatarticons"
        />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-start w-full">
        <div className="bg-default-100 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium dark:text-white text-black"
              >
                User Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="userName"
                  autoComplete="userName"
                  required
                  value={userDetails?.userName}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, userName: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium dark:text-white text-black"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={userDetails?.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <IoEyeOutline
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
            <div>
              <h4>Don't have an account?</h4>
              <Link href="/login" className="text-blue-600">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
