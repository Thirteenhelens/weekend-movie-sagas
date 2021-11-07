import "./Details.css";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useSelector, useDispatch } from "react-redux";
//Importing everything I'll need to reference later.

import Container from "@mui/material/Container";

function Details() {
  //Making a hook to history and dispatch so I can use the shorthand later on.
  const history = useHistory();
  const dispatch = useDispatch();
  //Getting the selected movie and it's genres to display and dispatch later on.
  const selectedMovie = useSelector((store) => store.selectedMovie);
  const selectedMovieGenres = useSelector((store) => store.selectedMovieGenres);

  useEffect(() => {
    //Getting the genres from the database on page render.
    dispatch({ type: "FETCH_SELECTED_MOVIE_DB", payload: selectedMovie.id });
  }, []);

  //Below is what is rendered to the DOM. Styling done with MUI.
  return (
    <div>
      <Paper elevation={6} sx={{ backgroundColor: "#a3a3c2", mb: 2 }}>
        <br />
        <h1>Additional Details</h1>
        <br />
      </Paper>

      {/* Conditional render tied to a movie title, so if the user hasn't selected a movie, selectedMovie.title returns false. */}
      {selectedMovie.title ? (
        //If a movie has been selected, the title, poster, description, and genres are shown.
        <div>

          <Container maxWidth="sm">

            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Selected Movie:
              </Typography>
              <Typography variant="h5" component="div">
                {selectedMovie.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {/* Conditionally rendering the correct grammar for genres depending on how many there are. */}
                Genre{selectedMovieGenres.data?.length > 1 ? "s: " : ": "}
                {/* Mapping over each genre, then joining them together to be displayed on one line. */}
                {selectedMovieGenres.data
                  ?.map((genre) => genre.name)
                  .join(", ")}
              </Typography>
              <Typography variant="body2">
                {selectedMovie.description}
              </Typography>
            </CardContent>
            <CardActions>
              {/* When button is clicked, the user is sent back to movieList page. */}
              <Button
                size="small"
                onClick={() => {
                  history.push("/");
                }}
              >
                Back to list
              </Button>
            </CardActions>

          </Container>
          
        </div>
      ) : (
        <div>
          <h3>
            {/* If no movie has been selected, below is displayed. The word home is a link to the MovieList component, so the user can select one. */}
            No movie selected, please return <Link to="/">home</Link> and select
            a movie.
          </h3>
        </div>
      )}
    </div>
  );
}

export default Details;
