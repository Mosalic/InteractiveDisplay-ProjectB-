/*
 *Backend:
 *Routen zum Bearbeiten bzw Aufrufen von Stundenplan Daten aus der Datenbank werden hier definiert.
*/

import express, {Router} from 'express';
import { postStundenplan, getStundenplan, putStundenplan, getStundenplanById, deleteStundenplan } from '../controllers/stundenplaene';

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
  .get(getStundenplanById)
  .delete(deleteStundenplan);

export default stundenplaene;
