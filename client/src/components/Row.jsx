import "../css/Row.css";
import "@splidejs/react-splide/css";
import Player from "./Player";
import { useState } from "react";
import { SplideSlide, Splide } from "@splidejs/react-splide";

export default function Row({ title, movies }) {
  const base_url = "https://image.tmdb.org/t/p/original";
  const [isArrows, setIsArrows] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
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
          movies.map(
            (movie) =>
              movie.backdrop_path && (
                <SplideSlide key={movie.id}>
                  {imageLoaded ? (
                    <img
                      onClick={() => {
                        setShowPlayer(true);
                        setMovieId(movie.id);
                      }}
                      className="row__poster"
                      src={`${base_url}${movie.backdrop_path}`}
                      alt={movie.name}
                      onLoad={handleImageLoad}
                      onError={() => {
                        // Handle image loading error
                        console.error(`Error loading image for ${movie.name}`);
                        setImageLoaded(true); // Set to true to prevent infinite retry
                      }}
                    />
                  ) : (
                    <div className="animated-background">
                      <div className="background-masker"></div>
                    </div>
                  )}
                </SplideSlide>
              ),
          )}
      </Splide>

      {showPlayer && <Player movieId={movieId} onClose={() => setShowPlayer(false)} />}
    </section>
  );
}
