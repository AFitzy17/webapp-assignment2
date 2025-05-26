import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {

  const { favorites, addToFavorites, watchlist, addToWatchlist } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (watchlist.find((id) => id === movie.id)) {
    movie.watchlist = true;
  } else {
    movie.watchlist = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    addToWatchlist(movie);
  };


  return (
    <Card>
      <CardHeader
        avatar={
          <>
            {movie.favorite ? (
              <Avatar sx={{ backgroundColor: 'red' }}>
                <FavoriteIcon />
              </Avatar>
            ) : null}
            {movie.watchlist ? (
              <Avatar sx={{ backgroundColor: 'blue' }}>
                <PlaylistIcon />
              </Avatar>
            ) : null}
          </>
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {" "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
        <CardActions disableSpacing>
        
          {action(movie)}
        
          <Link to={`/movies/${movie.id}`}>
            <Button variant="outlined" size="medium" color="primary">
              More Info ...
            </Button>
          </Link>
        
      </CardActions>

    </Card>
  );
}