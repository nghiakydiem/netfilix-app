import "../css/HomeScreen.css";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import Footer from "../components/Footer";
import { useMovies } from "../context/MoviesContext";

export default function HomeScreen() {
  const { movieList } = useMovies();

  return (
    <div className="homeScreen">
      <Nav />
      <main className="homeScreen__container">
        <Banner />
        <div className="homeScreen__content">
          <Row
            title="NETFLIX ORIGINALS"
            movies={movieList?.movies?.originalMovies}
          />
          <Row title="Trending now" movies={movieList?.movies?.trendingMovies} />
          <Row title="Top Rated" movies={movieList?.movies?.topRateMovies} />
          <Row title="Action Movies" movies={movieList?.movies?.actionMovies} />
          <Row title="Comedy Movies" movies={movieList?.movies?.comedyMovies} />
          <Row title="Horror Movies" movies={movieList?.movies?.horrorMovies} />
          <Row
            title="Romance Movies"
            movies={movieList?.movies?.romanceMovies}
          />
          <Row
            title="Documentaries"
            movies={movieList?.movies?.documentMovies}
          />
          <Footer className="homeScreen__footer" />
        </div>
      </main>
    </div>
  );
}
