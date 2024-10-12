import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/User'; // Example User model
import { Firestore } from 'firebase-admin/firestore';

export class UserController extends BaseHttpController<User> {
  constructor(db: Firestore) {
    const service = new UserService(db);
    super(service);
  }
  public async getAllHideCode(req: any, res: any): Promise<void> {
    try {
      const defs = await this.service.getAll();
      defs.map(val => {
        delete (val as any)['code'];
        return val;
      })
      res.json({ defs });
    } catch (error) {
      console.error('Error getting documents:', error);
      res.status(500).json({ title: 'Erreur', body: 'Pas de données disponibles.' });
    }
  }
  public async checkCode(req: any, res: any): Promise<void> {
    try {
      const userId = req.params.userId;
      const code = req.params.code;
      const def = await this.service.getById(userId);
      res.json({ continue: (def && code == def?.code) });
    } catch (error) {
      console.error('Error getting documents:', error);
      res.json({ continue: false });
    }
  }
}