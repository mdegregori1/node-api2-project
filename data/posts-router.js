const express = require('express');

const db = require("./db.js"); //update path, as they are now in the same folder  
const router = express.Router(); // make sure to invoke it and use uppercase "R"

router.use(express.json());

// post a blog post 
router.post('/', (req, res) => {
    const input = req.body;
    if (input.title && input.contents){
    db.insert(input)
    .then( blog => {
        res.status(201).json({...blog, ...input })
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })

    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

// get all blog posts 
router.get('/', (req, res) => {
    db.find()
    .then( users =>{
        res.status(200).json(users)
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

module.exports = router;