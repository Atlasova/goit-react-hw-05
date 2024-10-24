import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewById } from '../../services/getMovies';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const Reviews = await fetchMovieReviewById(movieId);
        setReview(Reviews);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <div>Movie reviews is loading...</div>}
      {error && <div>Oops! Something went wrong</div>}
      {review.length === 0 && (
        <div>There are currently no reviews for this movie</div>
      )}
      <ul className={css.reviewsList}>
        {review.map(({ id, author, content }) => (
          <li key={id}>
            <h3 className={css.reviewsTitle}>Author: {author}</h3>
            <p className={css.reviewsContent}>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieReviews;
