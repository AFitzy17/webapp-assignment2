import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api"; // Import the new API function
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedMoviesPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['topRated'], // Unique query key for top rated movies
    queryFn: getTopRatedMovies, // Use the new API function
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
      title="Top Rated"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default TopRatedMoviesPage;