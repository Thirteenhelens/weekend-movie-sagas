const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:selected', (req, res) => {

  //The selected movie is being sent over from index, below code simplifies it's name.
  let selectedMovieId = req.params.selected;
  console.log('Selected Movie', selectedMovieId);

  //This query is being sent to the database to grab the genres of the selected movie.
  const query = `SELECT "name" FROM "genres"
  JOIN "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
  WHERE "movie_id" = $1;`;

  //Sending the query text, and id of user selected movie.
  pool.query(query, [selectedMovieId])
    .then(result => {
      //After getting the genre(s), they are bundled up and sent back to where they were requested from. 
      res.send(result.rows);
      // Logging for redundancy.
      console.log(result.rows);
    })
    .catch(err => {
      //In case of error, or failed request, the error is logged and a failure status code is sent. 
      console.log('ERROR ', err);
      res.sendStatus(500)
    })

});

router.get('/', (req, res) => {
  // Getting every genre
  const query = `SELECT "name", "id" FROM "genres";`

  pool.query(query)
    .then(result => {
      //After getting the genres, they are bundled up and sent back to where they were requested from. 
      res.send(result.rows);
      // Logging for redundancy.
      console.log(result.rows);
    })
    .catch(err => {
      //In case of error, or failed request, the error is logged and a failure status code is sent. 
      console.log('ERROR ', err);
      res.sendStatus(500)
    })
});


//Exporting for use on other files.
module.exports = router;
