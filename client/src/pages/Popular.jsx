import React from "react";
import Nav from "../components/Nav";
import Row from "../components/Row";
import Footer from "../components/Footer";
import { useMovies } from "../context/MoviesContext";
import { motion } from "framer-motion";

export default function Popular() {
  const { movieList } = useMovies();

  return (
    <motion.div
      className="popular"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav />

      <main className="popular__container" style={{ marginTop: "6.5rem" }}>
        <Row
          title="New TV Shows"
          movies={movieList?.popularMovies.newTVShows}
        />
        <Row title="New Movies" movies={movieList?.popularMovies.newMovies} />
        <Row
          title="Popular TV Shows"
          movies={movieList?.popularMovies.popularTvShows}
        />
        <Row
          title="Popular Movies"
          movies={movieList?.popularMovies.popularMovies}
        />
      </main>

      <Footer />
    </motion.div>
  );
}
