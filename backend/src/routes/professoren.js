import express, {Router} from 'express';
import { getProfessoren, postProfessoren, putProfessoren, getProfessorenById, deleteProfessoren } from '../controllers/professoren';

const professoren = Router();

professoren.route('/')
  .get(getProfessoren)
  .post(postProfessoren);

professoren.route('/:id')
  .put(putProfessoren)
  .get(getProfessorenById)
  .delete(deleteProfessoren);

export default professoren;
