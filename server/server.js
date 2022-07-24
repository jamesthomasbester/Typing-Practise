const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./connection/connection')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'typo',
    cookie: {},
    resave: false,
    maxAge: 60000,
    saveUninitialized: true
}))

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`)
    })
})
