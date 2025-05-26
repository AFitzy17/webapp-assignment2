import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api'; 
//import { getMovie } from '../tmdb-api'; 
import { getMovieGenres } from '../tmdb-api'; 
import { getUpcomingMovies } from '../tmdb-api'; 
import { getNowPlayingMovies } from '../tmdb-api'; 
import { getPopularMovies } from '../tmdb-api'; 
import { getTopRatedMovies } from '../tmdb-api'; 

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const getGenres = await getMovieGenres();
    res.status(200).json(getGenres);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

export default router;
