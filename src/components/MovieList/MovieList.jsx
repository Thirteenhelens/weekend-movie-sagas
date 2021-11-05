import "./MovieList.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;

// TODO: When a movie poster is clicked, a user should be brought to the `/details` view for that movie.
// TODO: Have a way to get to the Add Movie Page.
