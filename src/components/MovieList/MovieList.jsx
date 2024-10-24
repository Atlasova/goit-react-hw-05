import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { BASE_POSTER_URL } from '../../services/getMovies';

const MovieList = ({ movies = [] }) => {
  const location = useLocation();
  const defaultImg =
    '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';
  return (
    <div>
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.items}>
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={location}
            >
              <img
                src={
                  movie.poster_path
                    ? `${BASE_POSTER_URL}${movie.poster_path}`
                    : defaultImg
                }
                width={250}
                alt="poster"
              />
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
