import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import FullPageLoader from "../components/PageLoader/FullPageLoader.jsx";
import { auth } from "../firebase/firebase.config.js";
import { setUser } from "../store/usersSlice.js";
import { Login } from "../utils/Login.js";
import { signUp } from "../utils/SignUp.js";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  const onSubmit = async (data) => {
    if (loginType === "login") {
      try {
        await Login(data);
      } catch (error) {
        setError(error.code);
      }
    } else {
      try {
        await signUp(data);
      } catch (error) {
        setError(error.code);
      }
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert(
      "Password reset email sent, please check your inbox for password reset instructions"
    );
  };

  return (
    <>
      {isLoading && <FullPageLoader />}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <form className="add-form login" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label>Email *</label>
              <input
                type="text"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              {errors.email && <p>E-mail is required</p>}
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
              {errors.password && <p>Password is required</p>}
            </div>
            {loginType == "login" ? (
              <button className="active btn btn-block" type="submit">
                Login
              </button>
            ) : (
              <button className="active btn btn-block" type="submit">
                Sign Up
              </button>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p onClick={handleForgotPassword} className="forgot-password">
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
