/*
 *Backend:
 *Routen zum Bearbeiten bzw Aufrufen von User Daten aus der Datenbank werden hier definiert.
*/

import express, {Router} from 'express';
import { getUser, postUser, getUsers, deleteUser, updateUser, changePassword } from '../controllers/users';

const admin = Router();

admin.route('/login')
  .post(getUser);

admin.route('/user')
  .post(postUser)
  .get(getUsers);

admin.route('/user/:id')
  .delete(deleteUser)
  .put(updateUser);

admin.route('/changePassword/:id')
  .put(changePassword);

export default admin;
