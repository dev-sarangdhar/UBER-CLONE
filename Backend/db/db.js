const mongoose = require('mongoose');


function connectToDb(){
    mongoose.connect(process.env.DB_CONNECTION)
        .then(() => {
            console.log('Connected to MongoDB');
        }).then
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = connectToDb; 