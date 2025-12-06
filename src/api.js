const express = require('express');
const morgan = require('morgan');
const app = express();
const api = express()

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', api);

api.route('/health')
    .get((req, res) => {
        res.json({
            success: true,
            message: 'Safe and sound'
        })
    })

api.route('auth')
    .get((req, res) => {
        res.json({
            success: true,
            message: 'Auth'
        })
    })

module.exports = { app };