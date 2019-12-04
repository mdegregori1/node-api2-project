const express = require('express');

const postsRouter = require("../data/posts-router.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Sanity Check</h>
  `);
});


server.use('/api/posts', postsRouter)



module.exports = server;

