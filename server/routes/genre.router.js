const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:selected', (req, res) => {

  let selectedMovie = req.params.selected;
  console.log('Selected Movie', selectedMovie);

  const query = `SELECT "name" FROM "genres"
JOIN "movies_genres" ON "movies_genres"."genres_id" = "genres"."id"
WHERE "movies"."id" = $1;`;

  pool.query(query, [selectedMovie.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR ', err);
      res.sendStatus(500)
    })

});

module.exports = router;



