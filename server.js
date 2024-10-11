require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const songRoutes = require('./routes/songRoutes');

const app = express();
const port = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/', songRoutes);

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});
