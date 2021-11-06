import { useState } from "react";
import { useHistory } from "react-router-dom";

function MovieForm() {
  const history = useHistory();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clearInputs = () => {
      setUrl("");
      setTitle("");
      setDescription("");
  }

  return (
    <div>
      <form onSubmit={(e) => {e.preventDefault(); console.log(title, url, description); clearInputs();}}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></input>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <select placeholder="Genre">
          <option>Test</option>
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

// an input field (for the movie title)
// an input field (for the movie poster image URL))
// a textarea (for the movie description)
// a dropdown (for the genres)
// `Save` button, which should save these inputs in the database and bring the user to the Home/List Page (which now has the new movie)

// Map over genres from db
