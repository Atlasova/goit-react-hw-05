import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCastById } from '../../services/getMovies';
import { BASE_POSTER_URL } from '../../services/getMovies';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const cast = await fetchMovieCastById(movieId);
        setCast(cast);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  const defaultImg =
    '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

  return (
    <>
      {isLoading && <div>Movie cast is loading...</div>}
      {error && <div>Oops! Something went wrong</div>}
      <ul className={css.actorsList}>
        {cast.map(({ id, profile_path, original_name, character }) => (
          <li key={id} className={css.actorItem}>
            <img
              src={
                profile_path ? `${BASE_POSTER_URL}${profile_path}` : defaultImg
              }
              width={200}
              alt="actor img"
            />
            <h3>Actor name</h3>
            <p>{original_name}</p>
            <h3>Character</h3>
            <p>{character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
