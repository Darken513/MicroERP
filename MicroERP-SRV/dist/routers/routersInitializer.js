"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRouters = initializeRouters;
const users_router_1 = require("./users.router");
const restaurants_router_1 = require("./restaurants.router");
const stockItems_router_1 = require("./stockItems.router");
function initializeRouters(app, db) {
    const usersRouter = new users_router_1.UsersRouter(db);
    const restaurantsRouter = new restaurants_router_1.RestaurantsRouter(db);
    const stockItemsRouter = new stockItems_router_1.StockItemsRouter(db);
    app.use('/users', usersRouter.router);
    app.use('/restaurants', restaurantsRouter.router);
    app.use('/stock-items', stockItemsRouter.router);
}
