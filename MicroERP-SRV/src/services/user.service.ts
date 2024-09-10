import { BaseHttpService } from './basehttp.service';
import { Firestore } from 'firebase-admin/firestore';
import { User } from '../models/User'; // Example User model

export class UserService extends BaseHttpService<User> {
  constructor(db: Firestore) {
    super(db, 'users');
  }
}
