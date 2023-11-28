import React, { useState } from "react";
import LogoImage from "../assets/images/image-removebg-preview (3).png";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  //   const router = useRouter();
  //   const { error, loading } = useSelector((state: RootState) => state.authUser);
  //   const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // try {
    //   const res = await dispatch(signUp(userDetails)).unwrap();
    //   toast.success(res.message);
    //   router.push("/");
    // } catch (error: any) {
    //   toast.error(error);
    // }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex-col py-4 sm:px-6 lg:px-4">
      <div>
        <Image src={LogoImage} alt="Logo" className="w-[120px]" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center gap-5 mt-14">
        <h2 className="text-center text-4xl font-extrabold">Sign up</h2>
        <img
          width="55"
          height="55"
          src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-login-web-security-flatarticons-blue-flatarticons.png"
          alt="external-login-web-security-flatarticons-blue-flatarticons"
        />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-start w-full">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={userDetails?.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
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
                // disabled={loading}
                className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  false ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {false ? "Loading..." : "Sign up"}
              </button>
              {/* {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )} */}
            </div>
            <div>
              <h4>already have an account?</h4>
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
