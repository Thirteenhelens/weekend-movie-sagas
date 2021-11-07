import axios from "axios";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
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
    <>
      <Paper elevation={6} sx={{ backgroundColor: "#a3a3c2", mb: 2 }}>
        <br />
        <h1>Add a Movie</h1>
        <br />
      </Paper>

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
          <Stack
            spacing={3}
            divider={<Divider orientation="horizontal" />}
            sx={{ mx: "auto", width: 200 }}
          >
            <TextField
              label="Title"
              variant="filled"
              value={newMovie.title}
              onChange={(e) => {
                setNewMovie({ ...newMovie, title: e.target.value });
              }}
            />

            <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel>Pick Genre</InputLabel>
              <Select
                value=''
                label="Pick Genre"
                onChange={(e) => {
                  setNewMovie({ ...newMovie, genre_id: e.target.value });
                }}
              >
                {genres.data?.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              label="URL"
              variant="filled"
              value={newMovie.poster}
              onChange={(e) => {
                setNewMovie({ ...newMovie, poster: e.target.value });
              }}
            />

            <TextField
              rows={3}
              multiline
              variant="filled"
              label="Description"
              value={newMovie.description}
              onChange={(e) => {
                setNewMovie({ ...newMovie, description: e.target.value });
              }}
            />
          </Stack>

          {/* This is the infamous add // submit button */}
          <Button type="submit" variant="outlined" sx={{ mb: 1, mt: 2 }}>
            Add movie
          </Button>
        </form>

        {/* Cancel button. When clicked, inputs are cleared and user is sent to the list page.  */}
        <Button
          variant="outlined"
          onClick={() => {
            clearInputs();
            history.push("/");
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

//Exporting for other files to use.
export default MovieForm;
