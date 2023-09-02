import "../css/MyList.css";
import axios from "axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Player from "../components/Player";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function MyList() {
  const { currentUser } = useAuth();
  const [likedMovies, setLikedMovies] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const getLikedMovies = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/user/${currentUser}/mylist`,
        );
        setLikedMovies(data.data.linkedMovies);
      } catch (error) {
        console.error(error);
      }
    };
    getLikedMovies();
  }, [currentUser]);

  return (
    <motion.div
      className="myList"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav />

      <main className="myList__container">
        {likedMovies?.length > 0 ? (
          likedMovies?.map((movie) => (
            <img
              key={movie.id}
              src={`${base_url}${movie.image}`}
              alt="movie.png"
              onClick={() => {
                setMovieId(movie.id);
                setShowPlayer(true);
              }}
            />
          ))
        ) : (
          <div className="myList__container-empty">
            <h1>Your list is empty</h1>
            <p>Add shows and movies to your list to watch them later</p>
          </div>
        )}
      </main>

      <Footer />

      {showPlayer && (
        <Player movieId={movieId} onClose={() => setShowPlayer(false)} />
      )}
    </motion.div>
  );
}
