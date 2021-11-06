import "./Details.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//Importing everything I'll need to reference later.

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

  return (
    <div>
      {/* Conditional render tied to a movie title, so if the user hasn't selected a movie, selectedMovie.title returns false. */}
      {selectedMovie.title ? (
        //If a movie has been selected, the title, poster, description, and genres are shown.
        <div>
          <h2>{selectedMovie.title}</h2>
          <img src={selectedMovie.poster} alt={selectedMovie.title} />
          <p>{selectedMovie.description}</p>
          {/* Conditionally rendering the correct grammar for genres depending on how many there are. */}
          <p>
            Genre{selectedMovieGenres.data?.length > 1 ? "s: " : ": "}
            {/* Mapping over each genre, then joining them together to be displayed on one line. */}
            {selectedMovieGenres.data?.map((genre) => genre.name).join(", ")}
          </p>
          {/* When button is clicked, the user is sent back to movieList page. */}
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Back to list
          </button>
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
