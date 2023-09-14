import "../css/Player.css";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getMovieId } from "../utils/getMovieId";

export default function Player({ movieId, onClose }) {
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [movieStatus, setMovieStatus] = useState({
    done: false,
    loading: false,
  });

  const genres = useMemo(
    () => movie?.genres?.map((item) => item.name),
    [movie],
  );

  console.log(movie)
  const addMovieToList = async () => {
    try {
      setMovieStatus({ ...movieStatus, loading: true });
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/add-liked`,
        {
          email: currentUser,
          data: {
            id: movie.id,
            name: movie.title,
            image: movie.backdrop_path,
            genres: movie.genres,
          },
        },
      );

      if (res.data.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Add movie failure!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setMovieStatus({ ...movieStatus, loading: false });
      setMovieStatus({ ...movieStatus, done: true });
    }
  };

  const removeMovieInList = async () => {
    try {
      setMovieStatus({ ...movieStatus, loading: true });
      const res = await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/${currentUser}/${movieId}`,
      );
      if (res.data.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Remove movie failure!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setMovieStatus({ ...movieStatus, loading: false });
      setMovieStatus({ ...movieStatus, done: false });
    }
  };

  const fetchMovie = async (id) => {
    const movieRes = await getMovieId(id);
    setMovie(movieRes);
  };

  const setIconStatusMovie = async (movieId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user/${currentUser}/${movieId}`,
      );

      if (res.data.movie) {
        setMovieStatus({ ...movieStatus, done: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(movie)

  useEffect(() => {
    fetchMovie(movieId);
    setIconStatusMovie(movieId);
  }, [movieId]);

  return (
    <section className="player">
      {movie && (
        <div className="player__content">
          <VideoPlayer
            movie={movie}
            onClose={onClose}
            movieStatus={movieStatus}
            removeMovieInList={removeMovieInList}
            addMovieToList={addMovieToList}
          />

          <div className="player__bottom">
            <div className="player__bottom-title">{movie.title}</div>

            <div className="player__bottom-info">
              <p>{`${Math.floor(Math.random() * 50 + 50)}% Match`}</p>
              <p>{String(movie.release_date).slice(0, 4)}</p>
              <div className="player__bottom-language">
                {String(movie.original_language).toUpperCase()}
              </div>
            </div>

            <p className="player__bottom-description">{movie.overview}</p>

            <div className="player__bottom-genres">
              <span>Genres: </span>
              {genres?.join(", ")}
            </div>
            <div className="player__bottom-vote">
              <span>Voted: </span>
              {movie.vote_average}/10
            </div>
          </div>
          <div className="player__content-gradient" />
        </div>
      )}
    </section>
  );
}
