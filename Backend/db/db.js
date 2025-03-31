const mongoose = require('mongoose');

const connectToDb = async () => {
    const mongoUri = process.env.MONGO_URI; // Ensure MONGO_URI is set in your .env file
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to the database successfully.');
};

module.exports = connectToDb;