// Import Express to configure the routes.
const express = require('express');
const router = express.Router();

//Import the Model (sushi.js) to use its functions.
const sushi = require('../models/sushi');

// ---------------------------------------------------------------------------------------------------------------------
// Routes

// Get route to render all of the sushi from the database into the index.handlebars on page load.
router.get('/', function (req, res) {
    sushi.selectAll(function (data) {
        const hbsObject = {
            sushi: data
        };
        //console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

// POST route to add a new sushi to the database and page, it passes the name and the eaten status to the model.
router.post('/api/sushi', function (req, res) {

    sushi.insertOne(
        ['sushi_name', 'mindfully_eaten'],
        [req.body.sushi_name, req.body.mindfully_eaten],
        function (result) {
            res.status(200)
                .json({id: result.insertId});
        });
});

// PUT route to update the status from not eaten to eaten and vice versa,
// it passes the eaten status and the ID on to the model.
router.put('/api/sushi/:id', function (req, res) {
    const id = `id = ${req.params.id}`;

    sushi.updateOne({mindfully_eaten: req.body.mindfully_eaten}, id, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    });
});

// DELETE route to remove a sushi from the database, it passes the ID of the deleted sushi to the model.
router.delete('/api/sushi/:id', function (req, res) {
    const id = `id = ${req.params.id}`;

    sushi.deleteOne(id, function (result) {
        if (result.affectedRows === 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    });
});


// Export routes for server.js to use.
module.exports = router;