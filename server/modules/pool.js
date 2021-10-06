// require pg first
const pg = require( 'pg' );

const pool = new pg.Pool({
    database: 'koala_holla', //change NAME to db name
    host: 'localhost',
    port: 5432,
    max: 30,
    idleTimeoutMillis: 30000
})
// export
module.exports = pool;

// const express = require('express');
// const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT


// DELETE

// module.exports = koalaRouter;