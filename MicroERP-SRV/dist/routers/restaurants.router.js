"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsRouter = void 0;
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const basehttp_router_1 = require("./basehttp.router");
class RestaurantsRouter extends basehttp_router_1.BaseHttpRouter {
    constructor(db) {
        const controller = new restaurant_controller_1.RestaurantController(db);
        super(controller);
    }
}
exports.RestaurantsRouter = RestaurantsRouter;
