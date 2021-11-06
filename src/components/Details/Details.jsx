import "./Details.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Details() {
  const selectedMovie = useSelector((store) => store.selectedMovie);

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

// TODO: The details page should have a `Back to List` button, which should bring the user to the Home/List Page
// Hint : You can make a GET request for a specific movie. Remember `req.params` and `:id`?
