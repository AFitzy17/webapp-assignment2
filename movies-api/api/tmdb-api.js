import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

/* export const getMovie = async (id) => { // Takes the movie 'id'
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${process.env.TMDB_KEY}`
    // It's crucial that process.env.TMDB_KEY is loaded in your backend's .env file
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || `Failed to fetch movie ${id} from TMDB`);
  }

  return await response.json();
}; */

export const getMovieGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {

    const errorData = await response.json();
    throw new Error(errorData.status_message || "Something went wrong fetching movie genres");
  }

  return await response.json();
};

export const getUpcomingMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en&api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getNowPlayingMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en&api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getPopularMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en&api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getTopRatedMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en&api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};