const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/MyTasks';

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
})

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${ port }`);
})