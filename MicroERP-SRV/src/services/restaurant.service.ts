import { BaseHttpService } from './basehttp.service';
import { Firestore } from 'firebase-admin/firestore';
import { Restaurant } from '../models/Restaurant';

export class RestaurantService extends BaseHttpService<Restaurant> {
  constructor(db: Firestore) {
    super(db, 'restaurants');
  }
}