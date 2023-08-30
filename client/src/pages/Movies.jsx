import React from "react";
import Row from "../components/Row";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useMovies } from "../context/MoviesContext";

export default function Movies() {
  const { movieList } = useMovies();

  return (
    <div className="movies">
      <Nav />
      <main className="tvShow__container" style={{ marginTop: "6.5rem" }}>
        <Row
          title="NETFLIX ORIGINALS"
          movies={movieList?.movies.originalMovies}
        />
        <Row title="Trending now" movies={movieList?.movies.trendingMovies} />
        <Row title="Top Rated" movies={movieList?.movies.topRateMovies} />
        <Row title="Action Movies" movies={movieList?.movies.actionMovies} />
        <Row title="Comedy Movies" movies={movieList?.movies.comedyMovies} />
        <Row title="Horror Movies" movies={movieList?.movies.horrorMovies} />
        <Row title="Romance Movies" movies={movieList?.movies.romanceMovies} />
        <Row title="Documentaries" movies={movieList?.movies.documentMovies} />
      </main>
      <Footer />
    </div>
  );
}
