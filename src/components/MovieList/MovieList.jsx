import "./MovieList.css";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Importing everything I'll need to reference later.

function MovieList() {
  //Making a hook to history and dispatch so I can use the shorthand later on.
  const history = useHistory();
  const dispatch = useDispatch();
  //Getting the lost of movies from the index file to display on DOM.
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

  //Below is what is rendered to the DOM.
  return (
    <main>
      <h1>MovieList</h1>
      {/* This button will send the user to the MovieForm page.  */}
      <button
        onClick={() => {
          history.push("/movieForm");
        }}
      >
        MovieForm
      </button>
      <section className="movies">
        {/* Mapping over every movie stored in index and displaying the name and poster. */}
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img
                alt={movie.title}
                src={movie.poster}
                // When you click on a poster, the specific movie it's tied to is bundled up and sent to the details page.
                onClick={() => selectMovie(movie)}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

//Exporting for use in the App.js file.
export default MovieList;
