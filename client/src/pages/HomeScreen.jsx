import "../css/HomeScreen.css";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Footer from "../components/Footer";
import { useMovies } from "../context/MoviesContext";
import { motion } from "framer-motion";

export default function HomeScreen() {
  const { movieList } = useMovies();

  return (
    <motion.div
      className="homeScreen"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Nav />
      <main className="homeScreen__container">
        <Banner />
        <div className="homeScreen__content">
          <Row title="NETFLIX ORIGINALS" movies={movieList?.movies?.originalMovies} />
          <Row title="Trending now" movies={movieList?.movies?.trendingMovies} />
          <Row title="Top Rated" movies={movieList?.movies?.topRateMovies} />
          <Row title="Action Movies" movies={movieList?.movies?.actionMovies} />
          <Row title="Comedy Movies" movies={movieList?.movies?.comedyMovies} />
          <Row title="Horror Movies" movies={movieList?.movies?.horrorMovies} />
          <Row title="Romance Movies" movies={movieList?.movies?.romanceMovies} />
          <Row title="Documentaries" movies={movieList?.movies?.documentMovies} />

          <Footer className="homeScreen__footer" />
        </div>
      </main>
    </motion.div>
  );
}
