"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const basehttp_service_1 = require("./basehttp.service");
class RestaurantService extends basehttp_service_1.BaseHttpService {
    constructor(db) {
        super(db, 'restaurants');
    }
}
exports.RestaurantService = RestaurantService;
