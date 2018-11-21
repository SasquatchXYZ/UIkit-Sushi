// Import orm so that we can create functions that will be able to interact with the database.
const orm = require('../config/orm');

// Sushi Model
const sushi = {

    // Function to the selectAll database query in the ORM, no parameters need passing, simply a callback.
    selectAll: function (cb) {
        orm.selectAll(function (res) {
            cb(res)
        });
    },

    // Function to add a sushi type to the database, it passes the name of the sushi and it's eaten status with a callback.
    insertOne: function (cols, values, cb) {
        orm.insertOne(cols, values, cb, function (res) {
            cb(res)
        });
    },

    // Function to update a sushi type from not eaten to eaten and vice versa.  It passes an object containing the
    // new eaten status and the ID on to the ORM.
    updateOne: function (updateSushiObj, id, cb) {
        orm.updateOne(updateSushiObj, id, cb, function (res) {
            cb(res)
        });
    },

    // Function to remove a sushi type from the menu/log, it passes the ID of the one to delete to the ORM.
    deleteOne: function (id, cb) {
        orm.deleteOne(id, cb, function (res) {
            cb(res)
        });
    }
};


// Export the database functions for the controller (sushi_controller.js)
module.exports = sushi;