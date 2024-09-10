"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurant_service_1 = require("../services/restaurant.service");
const basehttp_controller_1 = require("./basehttp.controller");
class RestaurantController extends basehttp_controller_1.BaseHttpController {
    constructor(db) {
        const service = new restaurant_service_1.RestaurantService(db);
        super(service);
    }
}
exports.RestaurantController = RestaurantController;
