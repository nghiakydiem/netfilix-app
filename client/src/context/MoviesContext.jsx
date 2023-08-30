import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import fetchMovieList from "../utils/fetchMovies";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const [movieList, setMovieList] = useState(null);

  const setMovieListEvent = async () => {
      const movies = await fetchMovieList();
      setMovieList(movies);
  };

  useEffect(() => {
    setMovieListEvent();
  }, [])

  const contextData = {
    movieList,
    setMovieListEvent,
  };

  return (
    <MoviesContext.Provider value={contextData}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);

export default MoviesProvider;
