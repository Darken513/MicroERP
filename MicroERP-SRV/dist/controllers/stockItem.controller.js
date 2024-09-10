"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemController = void 0;
const stockItem_service_1 = require("../services/stockItem.service");
const basehttp_controller_1 = require("./basehttp.controller");
class StockItemController extends basehttp_controller_1.BaseHttpController {
    constructor(db) {
        const service = new stockItem_service_1.StockItemService(db);
        super(service);
    }
}
exports.StockItemController = StockItemController;
