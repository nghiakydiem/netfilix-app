import "@splidejs/react-splide/css";
import "../css/Row.css";
import Player from "./Player";
import Motion from "./Motion";
import { useState } from "react";
import { SplideSlide, Splide } from "@splidejs/react-splide";

export default function Row({ title, movies }) {
  const base_url = "https://image.tmdb.org/t/p/original";
  const [isArrows, setIsArrows] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [movieId, setMovieId] = useState(null);

  return (
    <Motion variantsOption="bottomToTop">
      <section className="row">
        <h2>{title}</h2>

        <Splide
          options={{
            perPage: 6,
            arrows: isArrows,
            pagination: false,
            drag: "free",
            gap: "0.8rem",
          }}
          onMouseEnter={() => setIsArrows(true)}
          onMouseLeave={() => setIsArrows(false)}
        >
          {movies &&
            movies?.map(
              (movie) =>
                movie.backdrop_path && (
                  <SplideSlide key={movie.id}>
                    <img
                      onClick={() => {
                        setShowPlayer(true);
                        setMovieId(movie.id);
                      }}
                      className="row__poster"
                      src={`${base_url}${movie.backdrop_path}`}
                      alt={movie.name}
                    />
                  </SplideSlide>
                ),
            )}
        </Splide>

        {showPlayer && (
          <Player movieId={movieId} onClose={() => setShowPlayer(false)} />
        )}
      </section>
    </Motion>
  );
}
