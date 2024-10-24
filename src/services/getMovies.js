import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = '78bfd02b6b1cf83df8fb07e956309463';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OGJmZDAyYjZiMWNmODNkZjhmYjA3ZTk1NjMwOTQ2MyIsIm5iZiI6MTcyOTcxMjAzMC45Njk2NDYsInN1YiI6IjY3MTk0N2RlNWQwZGU4OTA0MmQ4Y2U5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TopkosBKjrjWEw8k_PS4iKw8lFNpUhELT7Jre99QkWs';

axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;

export const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchMovies = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieById = async movieId => {
  const response = await axios.get(`movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieCastById = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

export const fetchMovieReviewById = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMovieByQuery = async query => {
  const response = await axios.get(
    `search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
  );
  return response.data.results;
};
