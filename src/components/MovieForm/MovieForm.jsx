import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function MovieForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const [newMovie, setNewMovie] = useState({
    genre_id: "",
    title: "",
    poster: "",
    description: "",
  });

  const clearInputs = () => {
    setNewMovie({ genre: "", title: "", poster: "", description: "" });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(newMovie);
          axios.post("/api/movie", newMovie);
          history.push("/");
          clearInputs();
        }}
      >
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

        <br />
        <button type="submit">Save</button>
      </form>

      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default MovieForm;
