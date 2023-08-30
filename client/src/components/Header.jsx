import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import { BsFillCaretDownFill } from "react-icons/bs";
import { ReactComponent as NetflixLogo } from "../assets/images/logo.svg";

export default function Header({ register }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left">
          <NetflixLogo />
        </div>

        {register && (
          <div className="header__right">
            <div className="header__language">
              <div className="header__language-content">
                <select>
                  <option>English</option>
                  <option>Tiếng Việt</option>
                </select>
                <MdLanguage className="header__language-icon" />
                <BsFillCaretDownFill className="header__down-icon" />
              </div>
            </div>
            <button
              className="header__nav-button"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
