import "../css/ProfileScreen.css";
import Nav from "../components/Nav";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { currentUser, setUserEvent } = useAuth();
  
  const avatar = currentUser?.avatar;

  const logout = async () => {
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
    <div className="profileScreen">
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
              <button onClick={logout} className="profileScreen__signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
