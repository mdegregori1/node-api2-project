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

// GET	/api/posts/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    .then( id => {
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch( error => {
        console.log(error);
        res.status(500).json( { error: "The post information could not be retrieved." })
    })
})

//GET	/api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
    .then( id => {
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

// DELETE	/api/posts/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then( id => {
        if (id) {
            res.status(200).json({message: "The post was successfully deleted."})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The post could not be removed" })
    })
})


// PUT	/api/posts/:id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const post = req.body
    if (post.title && post.contents) {
        db.update(id, post)
        .then ( id => {
            if (id) {
                res.status(200).json({...id, ...post})
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    
})


router.post('/:id/comments', (req, res) => {
    const text = req.body.text;
    const id = req.params.id;

    if (text) {
      db.findById(req.params.id)
        .then(post => {
          if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          } else {
            db.insertComment({ text: text, post_id: id })
            .then(add => {
              res.status(201).json({...add, ...req.body});
            })
            .catch(error => {
                console.log(error)
              res.status(500).json({ error: "There was an error while saving the comment to the database." });
            });
          }
        })
        .catch(error => {
            console.log(error)
          res.status(500).json({ error: "Post information could not be retrieved." });
        });
    } else {
      res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
  });




module.exports = router;