"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpRouter = void 0;
const express_1 = require("express");
class BaseHttpRouter {
    constructor(controller) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/getAll', (req, res) => this.controller.getAll(req, res));
        this.router.get('/getById/:id', (req, res) => this.controller.getById(req, res));
        this.router.post('/create', (req, res) => this.controller.create(req, res));
        this.router.get('/deleteById/:id', (req, res) => this.controller.deleteById(req, res));
    }
}
exports.BaseHttpRouter = BaseHttpRouter;
