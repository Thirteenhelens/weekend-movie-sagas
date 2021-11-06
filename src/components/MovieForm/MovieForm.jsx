import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//Importing everything I'll need to reference later.

function MovieForm() {
  //Making a hook to history and dispatch so I can use the shorthand later on.
  const history = useHistory();
  const dispatch = useDispatch();
  //Getting the genres from store to set each option.
  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    //Getting each genre from the database every page render.
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  //Setting a default state for the movie, for ease of filling in later.
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    genre_id: "",
    description: "",
  });

  //Does what the name suggests, clears the value of the inputs.
  const clearInputs = () => {
    setNewMovie({ genre: "", title: "", poster: "", description: "" });
  };

  return (
    <div>
      {/* Start of the form that, when the save button is clicked, posts the new movie to the database,
       then sends the user to list page, and finally clears the inputs. */}
      <form
        onSubmit={(e) => {
          //Stops the page from refreshing.
          e.preventDefault();
          console.log(newMovie);
          axios.post("/api/movie", newMovie);
          history.push("/");
          clearInputs();
        }}
      >
        {/* Each input has a value that is tied to a key in newMovie,
         and when text is entered, sets that key to the input. */}
        <input
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => {
            setNewMovie({ ...newMovie, title: e.target.value });
          }}
        ></input>
        <input
          placeholder="URL"
          value={newMovie.poster}
          onChange={(e) => {
            setNewMovie({ ...newMovie, poster: e.target.value });
          }}
        ></input>
        <textarea
          placeholder="Description"
          value={newMovie.description}
          onChange={(e) => {
            setNewMovie({ ...newMovie, description: e.target.value });
          }}
        ></textarea>

        <select
          defaultValue={"0"}
          onChange={(e) => {
            setNewMovie({ ...newMovie, genre_id: e.target.value });
          }}
        >
          <option disabled value="0">
            Pick Genre
          </option>
          {genres.data?.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        {/* This is the infamous add // submit button */}
        <button type="submit">Add movie</button>
      </form>

      {/* Cancel button. When clicked, inputs are cleared and user is sent to the list page.  */}
      <button
        onClick={() => {
          clearInputs();
          history.push("/");
        }}
      >
        Cancel
      </button>
    </div>
  );
}

//Exporting for other files to use.
export default MovieForm;
