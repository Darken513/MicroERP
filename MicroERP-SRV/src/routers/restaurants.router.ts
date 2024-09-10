import { Firestore } from 'firebase-admin/firestore';
import { RestaurantController } from '../controllers/restaurant.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Restaurant } from '../models/Restaurant';

export class RestaurantsRouter extends BaseHttpRouter<Restaurant> {
  constructor(db: Firestore) {
    const controller = new RestaurantController(db);
    super(controller);
  }
}