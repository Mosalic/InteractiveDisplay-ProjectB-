import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import stundenplaene from './routes/stundenplaene';
import admin from './routes/admin';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/haw');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/stundenplaene', stundenplaene);
app.use('/admin', admin);

// app.get('/', function (req, res) {
//  res.send('Hello World!')
// });

app.listen(3001, function () {
 console.log('Example app listening on port 3001!')
});
