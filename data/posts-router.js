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

// update(): accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.

// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If the request body is missing the title or contents property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
// If there's an error when updating the post:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post information could not be modified." }.
// If the post is found and the new information is valid:

// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.







//POST	/api/posts/:id/comments	
// router.post('/:id/comments', (req, res) => {
//     const id = req.params.id;
//     const comment = req.body;
//     if (comment.text) {
//         db.insertComment(id, comment)
//         .then( id => {
//             if(id) {
//                 res.status(201).json({...id, ...comment})
//             } else {
//                 res.status(404).json({ message: "The post with the specified ID does not exist." })
//             }
    
//         })
//         .catch(error => {
//             console.log(error)
//             res.status(500).json({ error: "There was an error while saving the comment to the database" })
//         })
//     } else {
//         res.status(400).json({ errorMessage: "Please provide text for the comment." })
//     }
  
// })
module.exports = router;