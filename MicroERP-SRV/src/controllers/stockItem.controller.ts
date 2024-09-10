import { StockItemService } from '../services/stockItem.service';
import { BaseHttpController } from './basehttp.controller';
import { StockItem } from '../models/StockItem';
import { Firestore } from 'firebase-admin/firestore';

export class StockItemController extends BaseHttpController<StockItem> {
  constructor(db: Firestore) {
    const service = new StockItemService(db);
    super(service);
  }
}