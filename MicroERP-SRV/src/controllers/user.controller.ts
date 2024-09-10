import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/User'; // Example User model
import { Firestore } from 'firebase-admin/firestore';

export class UserController extends BaseHttpController<User> {
  constructor(db: Firestore) {
    const service = new UserService(db);
    super(service);
  }
}