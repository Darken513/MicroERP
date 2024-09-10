"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const basehttp_controller_1 = require("./basehttp.controller");
class UserController extends basehttp_controller_1.BaseHttpController {
    constructor(db) {
        const service = new user_service_1.UserService(db);
        super(service);
    }
}
exports.UserController = UserController;
