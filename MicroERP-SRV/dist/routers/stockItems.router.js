"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemsRouter = void 0;
const stockItem_controller_1 = require("../controllers/stockItem.controller");
const basehttp_router_1 = require("./basehttp.router");
class StockItemsRouter extends basehttp_router_1.BaseHttpRouter {
    constructor(db) {
        const controller = new stockItem_controller_1.StockItemController(db);
        super(controller);
    }
}
exports.StockItemsRouter = StockItemsRouter;
