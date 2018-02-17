import express, {Router} from 'express';
import { postStundenplan, getStundenplan, putStundenplan } from '../controllers/stundenplaene';

const stundenplaene = Router();

// middleware
stundenplaene.use(function (req, res, next) {
  console.log(req.body);
  next();
});

stundenplaene.route('/')
  .get(getStundenplan)
  .post(postStundenplan);

stundenplaene.route('/:id')
  .put(putStundenplan)

export default stundenplaene;
