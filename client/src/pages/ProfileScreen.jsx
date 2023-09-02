import "../css/ProfileScreen.css";
import Nav from "../components/Nav";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { currentUser, setUserEvent } = useAuth();

  const avatar = currentUser?.avatar;

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/logout`);
      localStorage.setItem("user", JSON.stringify(null));
      setUserEvent(null);

      return navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <motion.div
      className="profileScreen"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          {avatar ? (
            <img src={avatar} alt="Avatar" />
          ) : (
            <div className="profileScreen__avatar">
              {currentUser?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="profileScreen__details">
            <h2>{currentUser}</h2>
            <div className="profileScreen__plans">
              <button
                onClick={(e) => logout(e)}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
