"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemService = void 0;
const basehttp_service_1 = require("./basehttp.service");
class StockItemService extends basehttp_service_1.BaseHttpService {
    constructor(db) {
        super(db, 'stockItem');
    }
}
exports.StockItemService = StockItemService;
