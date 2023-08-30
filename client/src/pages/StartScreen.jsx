import "../css/StartScreen.css";
import Header from "../components/Header";
import Introduce from "../components/Introduce";
import Question from "../components/Question";
import Footer from "../components/Footer";
import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { useEffect } from "react";
import { useEmail } from "../context/EmailContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StartScreen() {
  const navigate = useNavigate();
  const { setEmailEvent } = useEmail();
  const [label, setLabel] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    if (isEmailValid) {
      return navigate("/login");
    } else {
      document.getElementById("emailInput").focus();
      setMessageInput("Email is required");
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      const checkEmailValid = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkValid = regex.test(email.toLowerCase());
        if (checkValid) {
          setMessageInput("");
          setIsEmailValid(true);
          setEmailEvent(email);
        } else {
          setIsEmailValid(false);
          setMessageInput("Please enter a valid email address.");
        }
      };
      checkEmailValid();
    }
  }, [email, setEmailEvent]);

  return (
    <div className="startScreen">
      <div className={"startScreen__background"}>
        <Header register={true} />

        <main className="startScreen__form">
          <h1>Unlimited movies, TV shows, and more</h1>
          <h2>Watch anywhere. Cancel any time</h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>

          <div v className="startScreen__input">
            <form>
              <div className="startScreen__input-content">
                <input
                  id="emailInput"
                  className={`startScreen__emailInput ${
                    (email !== "" || messageInput !== "") &&
                    (isEmailValid === false ? "not-valid" : "valid")
                  }`}
                  type="email"
                  onFocus={() => {
                    setLabel(true);
                  }}
                  onBlur={() => {
                    if (email === "") {
                      setLabel(false);
                      setMessageInput("You need to enter your email.");
                    }
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  required
                />

                <label
                  className={`startScreen__input-label ${label && "focus"}`}
                  htmlFor="emailInput"
                  onBlur={() => {
                    if (!email) {
                      setLabel(false);
                    }
                  }}
                >
                  Email address
                </label>

                <button className="start__getStarted" onClick={handleSubmit}>
                  Get Started
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="Hawkins-Icon Hawkins-Icon-Standard"
                    data-name="ChevronRight"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>

              {messageInput !== "" && (
                <p className="startScreen__input-valid">
                  <RiCloseCircleLine />
                  {messageInput}
                </p>
              )}
            </form>
          </div>
        </main>

        <div className="startScreen__gradient"></div>
        <div className="line__bottom"></div>
      </div>

      <Introduce enjoy={true} />
      <Introduce download={true} />
      <Introduce watch={true} />
      <Introduce kids={true} />

      <Question />

      <Footer />
    </div>
  );
}
