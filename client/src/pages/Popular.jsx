import React from "react";
import Nav from "../components/Nav";
import Row from "../components/Row";
import Footer from "../components/Footer";
import { useMovies } from "../context/MoviesContext";

export default function Popular() {
  const { movieList } = useMovies();

  return (
    <div className="popular">
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
    </div>
  );
}
