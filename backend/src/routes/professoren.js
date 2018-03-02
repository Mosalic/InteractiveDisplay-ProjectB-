import express, {Router} from 'express';
import multer from 'multer';
import { getProfessoren, postProfessoren, putProfessoren, getProfessorenById, deleteProfessoren } from '../controllers/professoren';

var upload = multer({ dest: './uploads/' })

const professoren = Router();

professoren.route('/')
  .get(getProfessoren)
  .post(upload.single("img"), postProfessoren);

professoren.route('/:id')
  .put(putProfessoren)
  .get(getProfessorenById)
  .delete(deleteProfessoren);

export default professoren;