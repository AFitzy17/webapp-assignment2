import React from "react";
import { getNowPlayingMovies } from "../api/tmdb-api"; // Import the new API function
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; // AddToFavorites functionality

const NowPlayingMoviesPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['nowPlaying'], // Unique query key for now playing movies
    queryFn: getNowPlayingMovies, // Use the new API function
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }  
  
  const movies = data.results;

 
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites)) 
  const addToFavorites = (movieId) => true

  return (
    <PageTemplate
      title="Now Playing in Theaters"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default NowPlayingMoviesPage;