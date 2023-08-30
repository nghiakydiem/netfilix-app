import axios from "../axios";

export const getMovieId = async (movieId) => {
  try {
    const response = await axios.get(
      `/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,image`,
    );
    const movie = response.data;
    return movie;
  } catch (error) {
    console.error(error);
  }
};
  