import { Application } from 'express';
import { Firestore } from 'firebase-admin/firestore';
import { UsersRouter } from './users.router';
import { RestaurantsRouter } from './restaurants.router';
import { StockItemsRouter } from './stockItems.router';

export function initializeRouters(app: Application, db: Firestore): void {
    const usersRouter = new UsersRouter(db);
    const restaurantsRouter = new RestaurantsRouter(db);
    const stockItemsRouter = new StockItemsRouter(db);

    app.use('/users', usersRouter.router);
    app.use('/restaurants', restaurantsRouter.router);
    app.use('/stockItems', stockItemsRouter.router);
}