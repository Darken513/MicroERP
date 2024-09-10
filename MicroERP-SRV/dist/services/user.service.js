"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const basehttp_service_1 = require("./basehttp.service");
class UserService extends basehttp_service_1.BaseHttpService {
    constructor(db) {
        super(db, 'users');
    }
}
exports.UserService = UserService;
