import React from "react";
import { getNewUpcomingMovies } from "../api/tmdb-api"; // Import the new upcoming movies fetch function
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const AlternativeUpcomingMoviesPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['new-upcoming'], // Use a distinct query key for this new fetch
    queryFn: getNewUpcomingMovies, // Use the new fetching function
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    console.log("Data received on AlternativeUpcomingMoviesPage:", data);
    return <h1>{error.message}</h1>
  }

  

  const movies = data.results;

  return (
    <PageTemplate
      title="Alternative Upcoming Movies" // Give it a distinct title
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );

};
export default AlternativeUpcomingMoviesPage;