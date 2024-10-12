import { Firestore } from 'firebase-admin/firestore';
import { UserController } from '../controllers/user.controller';
import { BaseHttpRouter } from './basehttp.router';
import { User } from '../models/User';

export class UsersRouter extends BaseHttpRouter<User> {
  constructor(db: Firestore) {
    const controller = new UserController(db);
    super(controller);
    this.router.get('/getAll/secret', (req, res) => (this.controller as UserController).getAllHideCode(req, res));
    this.router.get('/checkCode/:userId/:code', (req, res) => (this.controller as UserController).checkCode(req, res));
  }
}