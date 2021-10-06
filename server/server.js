//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//globals
const PORT = 5000;
// let koalaTestArray = ["koala", "bear"] just to test routes and returns
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
  console.log('/koalas POST:', req.body);
  const queryString = 'INSERT INTO koalas (name, gender, age, readyfortransfer, notes) VALUES( $1, $2, $3, $4, $5)';
  const values = [req.body.name, req.body.gender, req.body.age, req.body.readyfortransfer, req.body.notes];
  pool.query( queryString, values).then( (results)=>{
    res.sendStatus( 201);
  }).catch( (err)=>{
    console.log( "err");
    res.sendStatus( 500);
  })
})