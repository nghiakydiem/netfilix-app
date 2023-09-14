import "../css/Search.css";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import axios from "../axios";
import Player from "../components/Player";
import Motion from "../components/Motion";
import { motion } from "framer-motion";
import { useSearchValue } from "../context/SearchValueContext";

export default function Search() {
  const base_url = "https://image.tmdb.org/t/p/original";
  const { searchValueContext } = useSearchValue();
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (!searchValueContext) {
      const searchValue = JSON.parse(localStorage.getItem("searchMovies"));
      setMovies(searchValue);
    }
  }, []);

  useEffect(() => {
    if (searchValueContext) {
      const fetchMoviesSearch = async () => {
        try {
          const response = await axios.get(`/search/movie`, {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              query: searchValueContext,
            },
          });
          if (response) {
            setMovies(response.data.results);
            localStorage.setItem(
              "searchMovies",
              JSON.stringify(response.data.results),
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMoviesSearch();
    }
  }, [searchValueContext]);

  return (
    <motion.div
      className="search"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav />
      <main className="search__container">
        {movies ? (
          movies?.map((movie) => (
            <Motion variantsOption="opacity">
              <img
                key={movie.id}
                className="search__container-img"
                src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
                alt="movie.png"
                onClick={() => {
                  setMovieId(movie.id);
                  setShowPlayer(true);
                }}
              />
            </Motion>
          ))
        ) : (
          <div className="search__container-empty">
            <h1>No result</h1>
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
