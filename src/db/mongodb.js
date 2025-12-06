const mongoose = require('mongoose');
const { envirionments } = require('../../environments');

mongoose.connect(`mongodb+srv://${envirionments.mongoDBUser}:${envirionments.mongoDBPassword}@${envirionments.mongoDBHost}/${envirionments.mongoDBDatabase}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = { mongoose };