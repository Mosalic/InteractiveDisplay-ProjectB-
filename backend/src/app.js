import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import stundenplaene from './routes/stundenplaene';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/haw');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/stundenplaene', stundenplaene);

// app.get('/', function (req, res) {
//  res.send('Hello World!')
// });

app.listen(3001, function () {
 console.log('Example app listening on port 3001!')
});
