import express, {Router} from 'express';
import multer from 'multer';
import { getEvents, postEvents, putEvents, deleteEvents } from '../controllers/events';

var upload = multer({ dest: './uploads/' })

const events = Router();

events.route('/')
  .get(getEvents)
  .post(upload.single("img"), postEvents);

events.route('/:id')
  .put(putEvents)
  .delete(deleteEvents);

export default events;