import axios from "../axios";
import { MovieRequests, PopularRequests, TvShowRequests } from "../requests";

export const fetchMovies = async () => {
  try {
    const [
      originalMovies,
      trendingMovies,
      topRateMovies,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentMovies,
    ] = await Promise.all([
      axios.get(MovieRequests.fetchNetflixOriginals),
      axios.get(MovieRequests.fetchTrending),
      axios.get(MovieRequests.fetchTopRated),
      axios.get(MovieRequests.fetchActionMovies),
      axios.get(MovieRequests.fetchComedyMovies),
      axios.get(MovieRequests.fetchHorrorMovies),
      axios.get(MovieRequests.fetchRomanceMovies),
      axios.get(MovieRequests.fetchDocumentaries),
    ]);

    const movieList = {
      originalMovies: originalMovies.data.results,
      trendingMovies: trendingMovies.data.results,
      topRateMovies: topRateMovies.data.results,
      actionMovies: actionMovies.data.results,
      comedyMovies: comedyMovies.data.results,
      horrorMovies: horrorMovies.data.results,
      romanceMovies: romanceMovies.data.results,
      documentMovies: documentMovies.data.results,
    };

    return movieList;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTvShows = async () => {
  try {
    const [trendingTvShows, topRateTvShows, comedyTvShows, romanceTvShows, documentTvShows] =
      await Promise.all([
        axios.get(TvShowRequests.fetchTrending),
        axios.get(TvShowRequests.fetchTopRated),
        axios.get(TvShowRequests.fetchComedies),
        axios.get(TvShowRequests.fetchRomance),
        axios.get(TvShowRequests.fetchDocumentaries),
      ]);

    const TvShowList = {
      trendingTvShows: trendingTvShows.data.results,
      topRateTvShows: topRateTvShows.data.results,
      comedyTvShows: comedyTvShows.data.results,
      romanceTvShows: romanceTvShows.data.results,
      documentTvShows: documentTvShows.data.results,
    };

    return TvShowList;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPopular = async () => {
  try {
    const [newTVShows, newMovies, popularTvShows, popularMovies] = await Promise.all([
      axios.get(PopularRequests.fetchNewTVShows),
      axios.get(PopularRequests.fetchNewMovies),
      axios.get(PopularRequests.fetchPopularTvShows),
      axios.get(PopularRequests.fetchPopularMovies),
    ]);

    const PopularList = {
      newTVShows: newTVShows.data.results,
      newMovies: newMovies.data.results,
      popularTvShows: popularTvShows.data.results,
      popularMovies: popularMovies.data.results,
    };

    return PopularList;
  } catch (error) {
    console.error(error);
  }
};

const getMoviesStorage = () => {
  const movies = JSON.parse(localStorage.getItem("movies")) || {};
  const tvShows = JSON.parse(localStorage.getItem("tvShows")) || {};
  const popularMovies = JSON.parse(localStorage.getItem("popularMovies")) || {};

  return { movies, tvShows, popularMovies };
};

const fetchMovieList = async () => {
  const moviesStorage = getMoviesStorage();
  if (moviesStorage.length > 0) {
    return moviesStorage;
  }

  const movies = await fetchMovies();
  const tvShows = await fetchTvShows();
  const popularMovies = await fetchPopular();
  const movieList = { movies, tvShows, popularMovies };

  localStorage.setItem("movieList", JSON.stringify(movieList));

  return movieList;
};

export default fetchMovieList;
