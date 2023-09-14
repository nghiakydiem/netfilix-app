import "react-toastify/dist/ReactToastify.css";
import "@splidejs/react-splide/css";
import HomeScreen from "./pages/HomeScreen";
import StartScreen from "./pages/StartScreen";
import ProfileScreen from "./pages/ProfileScreen";
import TvShow from "./pages/TvShow";
import Movies from "./pages/Movies";
import Popular from "./pages/Popular";
import MyList from "./pages/MyList";
import EmailProvider from "./context/EmailContext";
import PrivateRoutes from "./components/PrivateRoutes";
import SignInScreen from "./pages/SignInScreen";
import Search from "./pages/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="app">
      <Router>
        <EmailProvider>
          <Routes>
            <Route path="/start" element={<StartScreen />} />
            <Route path="/login" element={<SignInScreen />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/tv-shows" element={<TvShow />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </EmailProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}
