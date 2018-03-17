import express, {Router} from 'express';
import multer from 'multer';
import { getNotes, postNotes, putNotes, deleteNotes } from '../controllers/notes';

var upload = multer({ dest: './uploads/' })

const notes = Router();

notes.route('/')
  .get(getNotes)
  .post(upload.single("img"), postNotes);

notes.route('/:id')
  .put(putNotes)
  .delete(deleteNotes);

export default notes;
