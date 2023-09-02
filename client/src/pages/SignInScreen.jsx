import "../css/SignInScreen.css";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Motion from "../components/Motion";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useEmail } from "../context/EmailContext";
import { useAuth } from "../context/AuthContext";
import { useMovies } from "../context/MoviesContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignInScreen() {
  const navigate = useNavigate();
  const { emailContext } = useEmail();
  const { setUserEvent } = useAuth();
  const { setMovieListEvent } = useMovies();
  const [label, setLabel] = useState({ email: false, password: false });
  const [user, setUser] = useState({ email: emailContext || "", password: "" });
  const [message, setMessage] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  axios.defaults.withCredentials = true;

  // REGISTER ACCOUNT
  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/register`,
        {
          email: user.email,
          password: user.password,
        },
      );

      if (res.data.status === 200) {
        setUserEvent(user.email);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMovieListEvent();
        return navigate("/");
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Register failure", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // SIGN IN ACCOUNT
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/login`,
        {
          ...user,
          rememberMe,
        },
      );

      if (res.data.status === 200) {
        setUserEvent(user.email);
        setMovieListEvent();
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return navigate("/");
      } else if (res.data.status === 401) {
        setShowNotification(true);
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Login failure!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email.toLowerCase());
    setMessage((prev) => ({
      ...prev,
      email: isValid ? "" : "Please enter a valid email.",
    }));
  };

  const validPassword = (password) => {
    const isValidPassword = password.length > 4;
    setMessage((prev) => ({
      ...prev,
      password: isValidPassword
        ? ""
        : "Your password must contain between 4 and 60 characters.",
    }));
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== "null") navigate("/");

    const loginCookie = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/login`,
      );

      if (res.data.status === 200) {
        setUserEvent(res.data.user);
        setMovieListEvent();

        return navigate("/");
      }
    };
    loginCookie();
  }, []);

  useEffect(() => {
    if (emailContext) {
      setLabel((prev) => ({ ...prev, email: true }));
    }
    setMessage((prev) => ({ ...prev, password: "" }));
  }, [emailContext]);

  useEffect(() => {
    if (user.email) {
      validateEmail(user.email);
    }
    if (user.password) {
      validPassword(user.password);
    }
  }, [user.email, user.password]);

  return (
    <motion.div
      className="signInScreen"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="signInScreen__background">
        <Header />

        <form id="formLogin" className="signInScreen__form" autoComplete="on">
          <h1>Sign In</h1>

          {/*----- Message content -----*/}
          <Motion variantsOption="opacity" slideMotion={true}>
            {showNotification && (
              <div className="signInScreen__notification">
                <b>Incorrect password. </b>
                Please try again or you can&nbsp;
                <a href="loginHelp">reset your password.</a>
              </div>
            )}
          </Motion>

          <div className="signInScreen__form-content">
            <div className="signInScreen__email">
              <input
                id="email"
                name="emailInput"
                type="email"
                className={`inputEmail ${message.email && "border"}`}
                onFocus={() => setLabel({ ...label, email: true })}
                onBlur={() => {
                  if (!user.email) {
                    setLabel({ ...label, email: false });
                    setMessage({
                      ...message,
                      email: "Please enter a valid email or phone number.",
                    });
                  }
                }}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                required
              />

              <label
                className={`signInScreen__email-label ${
                  label.email && "focus"
                }`}
                htmlFor="email"
              >
                Email or phone number
              </label>

              {message.email && (
                <p className="signInScreen__email-message">{message.email}</p>
              )}
            </div>

            <div className="signInScreen__password">
              <input
                id="password"
                name="passwordInput"
                className={`inputPassword ${message.password && "border"}`}
                type={showPassword ? "text" : "password"}
                onFocus={() => setLabel({ ...label, password: true })}
                onBlur={() => {
                  if (user.password === "") {
                    setLabel({ ...label, password: false });
                    setMessage({
                      ...message,
                      password:
                        "Your password must contain between 4 and 60 characters.",
                    });
                  }
                }}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                required
              />

              {label.password && (
                <button
                  className="password-visibility-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              )}

              <label
                className={`signInScreen__password-label ${
                  label.password && "focus"
                }`}
                htmlFor="password"
              >
                Password
              </label>

              {message.password && (
                <p className="signInScreen__password-message">
                  {message.password}
                </p>
              )}
            </div>

            <button className="signIn__btn" type="submit" onClick={signIn}>
              Sign In
            </button>

            <div className="signInScreen__help">
              <div className="signInScreen__rememberMe">
                <input
                  id="checkbox"
                  name="checkboxInput"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="checkbox">Remember me</label>
              </div>

              <a href="/">Need help?</a>
            </div>
          </div>

          <div className="signInScreen__other">
            <div className="signUpNow">
              New to Netflix?
              <span onClick={register}> Sign up now.</span>
            </div>

            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.&nbsp;
              <a href="/">Learn more.</a>
            </p>
          </div>
        </form>

        <div className="signInScreen__gradient"></div>
      </div>

      <Motion variantsOption="bottomToTop">
        <Footer />
      </Motion>
    </motion.div>
  );
}
