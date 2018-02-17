import express, {Router} from 'express';
import { getUser } from '../controllers/users';

const admin = Router();

admin.route('/login')
  .post(getUser);

export default admin;
