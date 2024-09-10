import { BaseHttpService } from './basehttp.service';
import { Firestore } from 'firebase-admin/firestore';
import { StockItem } from '../models/StockItem';

export class StockItemService extends BaseHttpService<StockItem> {
  constructor(db: Firestore) {
    super(db, 'stockItem');
  }
}