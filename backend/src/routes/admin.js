import express, {Router} from 'express';
import { getUser, postUser, getUsers, deleteUser, updateUser } from '../controllers/users';

const admin = Router();

admin.route('/login')
  .post(getUser);

admin.route('/user')
  .post(postUser)
  .get(getUsers);

admin.route('/user/:id')
  .delete(deleteUser)
  .put(updateUser);

export default admin;
