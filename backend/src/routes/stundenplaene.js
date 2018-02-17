import express, {Router} from 'express';
import { postStundenplan } from '../controllers/stundenplaene';

const stundenplaene = Router();

// middleware
stundenplaene.use(function (req, res, next) {
  console.log(req.body);
  next();
});

stundenplaene.route('/')
  .get((req, res) => {
    res.json({ response: 'a GET request for LOOKING at questions' });
  })
  .post(postStundenplan);

export default stundenplaene;
