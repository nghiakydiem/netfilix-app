import React from "react";
import Nav from "../components/Nav";
import Row from "../components/Row";
import Footer from "../components/Footer";
import { useMovies } from "../context/MoviesContext";

export default function TvShow() {
  const { movieList } = useMovies();

  return (
    <div className="tvShow">
      <Nav />
      <main className="tvShow__container" style={{ marginTop: "6.5rem" }}>
        <Row title="Trending now" movies={movieList?.tvShows.trendingTvShows} />
        <Row title="Top Rated" movies={movieList?.tvShows.topRateTvShows} />
        <Row title="Comedy Movies" movies={movieList?.tvShows.comedyTvShows} />
        <Row title="Romance Movies" movies={movieList?.tvShows.romanceTvShows} />
        <Row title="Documentaries" movies={movieList?.tvShows.documentTvShows} />
      </main>
      <Footer />
    </div>
  );
}
