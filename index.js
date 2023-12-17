const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 5000;
const databaseURL = 'mongodb://127.0.0.1:27017/KseniaTask';

const app = express ();

mongoose.connect(databaseURL)
    .then(() => console.log('DataBase connected.'))
    .catch(error => console.log(error));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/', routes);

app.get('/', (req, res) => {
    res.send(__dirname + "public/index.html")
})


app.listen(port, () => console.log (`Server runned on 127.0.0.1:${port}`));
