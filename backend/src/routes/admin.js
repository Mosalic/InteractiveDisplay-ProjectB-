import express, {Router} from 'express';
import { getUser, postUser } from '../controllers/users';

const admin = Router();

admin.route('/login')
  .post(getUser);

admin.route('/user')
  .post(postUser);

export default admin;
