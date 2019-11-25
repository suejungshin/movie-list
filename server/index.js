const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const tmd = require('../helpers/tmd.js')

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})

app.post('/movies', (req, res) => {

  //if err
  //res.status(400).send()

  //console.log(req)

  tmd.getMovies(req.body.movie, (err, result)=>{
    res.status(200).send(result)
  })

})

app.get('/movies', (req, res) => {

  //if err
  //res.status(400).send()

  console.log("req.query ", req.query)

  tmd.getMovieDetails(req.query.movieID, (err, result) => {
    res.status(200).send(result)
  })



})