"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const user_controller_1 = require("../controllers/user.controller");
const basehttp_router_1 = require("./basehttp.router");
class UsersRouter extends basehttp_router_1.BaseHttpRouter {
    constructor(db) {
        const controller = new user_controller_1.UserController(db);
        super(controller);
    }
}
exports.UsersRouter = UsersRouter;
