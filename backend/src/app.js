import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import stundenplaene from './routes/stundenplaene';
import admin from './routes/admin';
import professoren from './routes/professoren';
import notes from './routes/notes';
import events from './routes/events';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/haw');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/stundenplaene', stundenplaene);
app.use('/admin', admin);
app.use('/professoren', professoren);
app.use('/notes', notes);
app.use('/events', events);

app.listen(3001, function () {
 console.log('Example app listening on port 3001!')
});
