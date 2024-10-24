import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovieByQuery } from '../../services/getMovies';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import { FcSearch } from 'react-icons/fc';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (!currentQuery) return;

    const movieByQuery = async () => {
      try {
        setIsLoading(true);
        const getMovieByQuery = await fetchMovieByQuery(currentQuery);
        setMovies(getMovieByQuery);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    movieByQuery();
  }, [searchParams]);

  const initialValues = {
    query: '',
  };

  const onSubmit = values => {
    const { query } = values;
    if (!query.trim()) {
      toast.error('Search field is empty!');
      return;
    }
    setSearchParams({ query });
  };

  return (
    <>
      <h1 className={css.title}>Search movies</h1>
      <Toaster position="top-center" />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={css.searchBar}>
          <Field
            className={css.searchInput}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button type="submit" className={css.searchBtn}>
            {' '}
            Search
            <FcSearch size={16} />
          </button>
        </Form>
      </Formik>
      {isLoading && <div>Movies is loading...</div>}
      {error && <div>Oops! Something went wrong</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
