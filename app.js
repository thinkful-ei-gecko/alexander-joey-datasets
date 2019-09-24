require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movies = require('./movies.js');

console.log(process.env.API_TOKEN);
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req,res,next){
  console.log('validateBearerToken middleware');

});

app.get('/movie', (req, res) => {
  const genre = req.query.genre;
  const country = req.query.country;
  const avgVote = req.query.avg_vote;

 
  if(genre){
    movies.filter( movie => 
      movie.genre.toLowerCase().includes(genre.toLowerCase()));
    
  }
  if(country){
    movies.filter( movie => 
      movie.country.toLowerCase().includes(country.toLowerCase()));
    
  }
  if(avgVote){
    movies.filter( movie => 
      movie.avg_vote >= parseInt(avgVote)
    );
    
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});