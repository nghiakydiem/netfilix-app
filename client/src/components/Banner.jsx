import "../css/Banner.css";
import Player from "../components/Player";
import Motion from "./Motion";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useMovies } from "../context/MoviesContext";

export default function Banner() {
  const { movieList } = useMovies();
  const [showPlayer, setShowPlayer] = useState(false);

  const movieBanner =
    movieList?.movies.actionMovies[
      Math.floor(Math.random() * movieList?.movies.actionMovies.length)
    ];

  // TRUNCATE STRING
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <Motion variantsOption="bottomToTop">
      <div className="banner">
        <h1 className="banner__title">
          {movieBanner?.title ||
            movieBanner?.name ||
            movieBanner?.original_name}
        </h1>
        <div className="banner__info">
          <p>{`${Math.floor(Math.random() * 50 + 50)}% Match`}</p>
          <p>{movieBanner?.first_air_date}</p>
        </div>

        <p className="banner__description">
          {truncate(movieBanner?.overview, 150)}
        </p>

        <div className="banner__buttons">
          <button
            className="banner__button-play"
            onClick={() => setShowPlayer(true)}
          >
            <FaPlay />
            Play
          </button>

          <button
            className="banner__button-info"
            onClick={() => setShowPlayer(true)}
          >
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>

      <div
        className="banner__background"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      ></div>

      <div className="banner__gradient"></div>

      {showPlayer && (
        <Player movieId={movieBanner.id} onClose={() => setShowPlayer(false)} />
      )}
    </Motion>
  );
}
