import express, {Router} from 'express';
import { getUser, postUser, getUsers, deleteUser } from '../controllers/users';

const admin = Router();

admin.route('/login')
  .post(getUser);

admin.route('/user')
  .post(postUser)
  .get(getUsers);

admin.route('/user/:email')
  .delete(deleteUser);

export default admin;
