//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//globals
const PORT = 5000;
let koalaTestArray = ["koala", "bear"]
// const koalaRouter = require('./routes/koala.router')
const pool = require( './modules/pool' );

// Start listening for requests on a specific port
app.listen(PORT, ()=>{
  console.log('listening on port', PORT);
});

// ROUTES
app.get('/koalas', (req, res)=>{
  const queryString = `SELECT * FROM koalas`;
  pool.query( queryString ).then( (results)=> {
    res.send(results.rows );
  }).catch( (err )=>{
    console.log( err);
    res.sendStatus( 500);
  })
})

app.post('/koalas', (req, res)=>{
  console.log('in post:', req.body)
  res.send(koalaTestArray);
})