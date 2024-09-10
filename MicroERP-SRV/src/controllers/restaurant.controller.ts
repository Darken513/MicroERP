import { RestaurantService } from '../services/restaurant.service';
import { BaseHttpController } from './basehttp.controller';
import { Restaurant } from '../models/Restaurant';
import { Firestore } from 'firebase-admin/firestore';

export class RestaurantController extends BaseHttpController<Restaurant> {
  constructor(db: Firestore) {
    const service = new RestaurantService(db);
    super(service);
  }
}