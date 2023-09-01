import "../css/Nav.css";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ReactComponent as NetflixLogo } from "../assets/images/logo.svg";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { currentUser } = useAuth();
  const [showNavBlack, setShowNavBlack] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  // Transition navbar
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShowNavBlack(true);
    } else {
      setShowNavBlack(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, [showNavBlack]);

  return (
    <header className={`nav ${showNavBlack && "nav__black"}`}>
      <div className="nav__contents">
        <div className="nav__contents-left">
          <NetflixLogo />
          <nav className="nav__left-list">
            <NavLink to="/" className="nav__left-item">
              Home
            </NavLink>
            <NavLink to="/tv-shows" className="nav__left-item">
              Tv Shows
            </NavLink>
            <NavLink to="/movies" className="nav__left-item">
              Movies
            </NavLink>
            <NavLink to="/popular" className="nav__left-item">
              New & Popular
            </NavLink>
            <NavLink to="/my-list" className="nav__left-item">
              My list
            </NavLink>
          </nav>
        </div>

        <div className="nav__contents-right">
          <div className={`nav__right-search ${showSearch && "show"}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <BiSearch />
            </button>

            <input
              id="search"
              name="searchInput"
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setInputHover(false);
                setShowSearch(false);
              }}
            />
          </div>

          <IoMdNotificationsOutline />
          <Avatar email={currentUser} />
        </div>
      </div>
    </header>
  );
}
