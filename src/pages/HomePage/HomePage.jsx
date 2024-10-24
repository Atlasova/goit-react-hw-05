import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../services/getMovies';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending movies now</h1>
      {isLoading && <div>Trending movies is loading...</div>}
      {error && <div>Oops! Something went wrong</div>}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
