// Import MySQL Connection
const connection = require('./connection');

// Configured the 'Object-Relational Mapper' for making queries to the database - defining our functions and parameters.
const orm = {

    // Query to retrieve all of the sushi information in the database.
    selectAll: function (cb) {
        const queryAll = 'SELECT * FROM sushi';
        connection.query(queryAll, function (err, results) {
            if (err) throw err;
            cb(results);
        });
    },

    // Query to insert a new sushi into the database, it receives the name and the eaten status from the model (the
    // values) as well as where these values should be placed (cols).
    insertOne: function (cols, values, cb) {
        const insertQuery = `INSERT INTO sushi (${cols.toString()}) VALUES (${questionMarks(values.length)})`;
        connection.query(insertQuery, values, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    },

    // Function to update a sushi from eaten to not and vice versa, it receives the mindfully_eaten status in an object,
    // as well as the ID for where to change the status from the model.
    updateOne: function (updateSushiObj, id, cb) {
        const updateQuery = `UPDATE sushi SET ${colToEqual(updateSushiObj)} WHERE ${id}`;
        connection.query(updateQuery, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    },

    // Function to delete a sushi type from the menu.  It receives the ID of the sushi to delete from the model.
    deleteOne: function (id, cb) {
        const deleteQuery = `DELETE FROM sushi WHERE ${id}`;
        connection.query(deleteQuery, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    }
};

// This function is used to print an array of question marks in order to satisfy the number of conditions we want to
// change.  it reads the length of the particular array and in turn prints that about of corresponding question marks
// for use by the MySQL query.
function questionMarks(num) {
    let marks = [];
    for (let k = 0; k < num; k++) {
        marks.push('?')
    }
    return marks.toString()
}

// This function is used to extract the information from an object, and turn it from the format of 'key: value' to
// 'key=value' for use in the MySQL query.
function colToEqual(obj) {
    let equals = [];

    for (let key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = `'${value}'`
            }
            equals.push(`${key}=${value}`)
        }
    }
    return equals.toString()
}

// Export the orm object for the model. (sushi.js)
module.exports = orm;