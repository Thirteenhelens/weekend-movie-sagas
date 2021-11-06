import "./Details.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Details() {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.selectedMovie);

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_MOVIE_DB", payload: selectedMovie });
  }, []);

  return (
    <div>
      {/* Conditional render tied to a movie title, so if the user hasn't selected a movie, selectedMovie.title returns false.  */}
      {selectedMovie.title ? (
        //If a movie has been selected, the title, poster, description, and genres are shown.
        <div>
          <h2>{selectedMovie.title}</h2>
          <img src={selectedMovie.poster} alt={selectedMovie.title} />
          <p>{selectedMovie.description}</p>
          <p>Genres:</p>
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

// Hint : You can make a GET request for a specific movie. Remember `req.params` and `:id`?
