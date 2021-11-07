import "./MovieList.css";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
//Importing everything I'll need to reference later.


function MovieList() {
  //Making a hook to history and dispatch so I can use the shorthand later on.
  const history = useHistory();
  const dispatch = useDispatch();
  //Getting the list of movies from the index file to display on DOM.
  const movies = useSelector((store) => store.movies);

  //When a movie is clicked, the title is logged, then the chosen movie is stored
  //in the index file, and finally the user is sent to the details page.
  const selectMovie = (movie) => {
    console.log("Chose", movie.title);
    dispatch({ type: "SET_SELECTED_MOVIE", payload: movie });
    history.push("/details");
  };

  //Every time the page is rendered, the most up-to-date list of movies is gotten.
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  //Below is what is rendered to the DOM. Styling done with MUI.
  return (
    <>
      <Paper
        elevation={6}
        className="movieListHead"
        sx={{ backgroundColor: "#a3a3c2" }}
      >
        <br />
        <h1>Movie Picker</h1>
        <div className="newMovieBttnContainer">
          <Button
            variant="contained"
            color="success"
            className="newMovieBttn"
            sx={{ mr: 10, mb: 2 }}
            onClick={() => {
              history.push("/movieForm");
            }}
          >
            Add new movie
          </Button>
        </div>
      </Paper>
      <section className="movies">
        {/* Mapping over every movie stored in index and displaying the name and poster. */}
        {movies.map((movie) => {
          return (
            <Card sx={{ m: 1, width: 345 }} key={movie.id}>
              <CardMedia
                component="img"
                height="500"
                image={movie.poster}
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={() => selectMovie(movie)}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </section>
    </>
  );
}

//Exporting for use in the App.js file.
export default MovieList;
