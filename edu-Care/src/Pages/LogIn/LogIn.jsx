import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useData from "../../Hooks/useData";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const LogIn = () => {
  const [show, setShow] = useState(false);

  const { signIn, googleSignIn } = useAuth();

  const { dark } = useData();

  const location = useLocation();

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    form.reset();

    const toastId = toast.loading('Logging In...')
    
    signIn(email, password)
      .then(() => {
        // if (res.user.emailVerified) {
        toast.success("Login Successful.", {id: toastId});
        navigate(location?.state ? location.state : "/");
        // } else {
        //   emailVerification().then(() => {
        //     toast.info("Please verify your email.");
        //     logOut().then().catch();
        //     return;
        //   });
        // }
      })
      .catch((err) => {
        toast.error(err.message, {id: toastId});
      });
  };

  const googleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google Log In Success.");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="w-full max-w-sm p-6 m-auto mx-auto rounded border border-[#ABABAB] my-10">
        <div>
          <h2 className="text-lg font-bold">Log In</h2>
        </div>

        <form onSubmit={handleSignIn} className="mt-6">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
          </div>

          <div className="mt-4 relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className={
                dark
                  ? "block w-full text-xs placeholder:text-white text-white py-2 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
                  : "block w-full text-xs placeholder:text-[#000000] text-[#000000] py-2 mt-2 bg-transparent border-b border-[#ABABAB] focus:outline-none focus:bg-transparent"
              }
            />
            <div
              className="absolute right-2 top-3 inline-block cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <BsEyeSlash></BsEyeSlash> : <BsEye></BsEye>}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-1">
              <input
                className="cursor-pointer accent-primary"
                type="checkbox"
                name="check"
                id=""
              />
              <p className="text-xs">Remember Me</p>
            </div>
            <a
              href="#"
              className="text-xs text-active-color font-bold hover:underline"
            >
              Forget Password?
            </a>
          </div>

          <div className="mt-6">
            <button
              className={
                dark
                  ? "w-full px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-active-color text-white"
                  : "w-full px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-active-color"
              }
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center">
          {" "}
          Don&#39;t have an account?{" "}
          <Link
            to={"/signUp"}
            className="font-medium text-active-color hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b border-[#ABABAB]"></span>

          <a href="#" className="text-xs text-center uppercase hover:underline">
            or login with Social Media
          </a>

          <span className="w-1/5 border-b border-[#ABABAB]"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
            onClick={googleLogin}
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium border border-[#ABABAB] rounded-sm focus:outline-none"
          >
            <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
            </svg>

            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
