import express, {Router} from 'express';
import { getUser, postUser, getUsers } from '../controllers/users';

const admin = Router();

admin.route('/login')
  .post(getUser);

admin.route('/user')
  .post(postUser)
  .get(getUsers);

export default admin;
