import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"

// Imports for credits data display
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from '@tanstack/react-query';
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from '../spinner';

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);

 const { data: creditsData, error: creditsError, isPending: creditsIsPending, isError: creditsIsError } = useQuery({
    queryKey: ['credits', { id: movie.id }],
    queryFn: () => getMovieCredits(movie.id),
  });

  if (creditsIsPending) {
    return <Spinner />;
  }

  if (creditsIsError) {
    return <h1>Error loading credits: {creditsError.message}</h1>;
  }

  const cast = creditsData?.cast || [];
  const crew = creditsData?.crew || [];

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

<Typography variant="h5" component="h3" sx={{ marginTop: 3, marginBottom: 1 }}>
        Cast
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="cast table">
          <TableHead>
            <TableRow>
              <TableCell>Character</TableCell>
              <TableCell>Actor</TableCell>
              <TableCell>Popularity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cast.slice(0, 10).map((c) => ( // Display top 10 cast members
              <TableRow key={c.credit_id}>
                <TableCell component="th" scope="row">
                  {c.character}
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.popularity?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" component="h3" sx={{ marginTop: 4, marginBottom: 1 }}>
        Crew (Key Roles)
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table sx={{ minWidth: 550 }} aria-label="crew table">
          <TableHead>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crew.filter(c => c.job === "Director" || c.job === "Writer" || c.job === "Producer" || c.job === "Screenplay").map((c) => ( // Display key crew members
              <TableRow key={c.credit_id}>
                <TableCell component="th" scope="row">
                  {c.department}
                </TableCell>
                <TableCell>{c.job}</TableCell>
                <TableCell>{c.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
      <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;
