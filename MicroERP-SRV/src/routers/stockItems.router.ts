import { Firestore } from 'firebase-admin/firestore';
import { StockItemController } from '../controllers/stockItem.controller';
import { BaseHttpRouter } from './basehttp.router';
import { StockItem } from '../models/StockItem';

export class StockItemsRouter extends BaseHttpRouter<StockItem> {
  constructor(db: Firestore) {
    const controller = new StockItemController(db);
    super(controller);
  }
}