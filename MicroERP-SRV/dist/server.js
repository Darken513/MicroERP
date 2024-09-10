"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const body_parser_1 = __importDefault(require("body-parser"));
const routersInitializer_1 = require("./routers/routersInitializer");
// Initialize Firestore database
const serviceAccount = require(__dirname + "/microerp-7b08c-firebase-adminsdk-1frx7-d9ff8e7d57.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: 'https://microerp-7b08c.firebaseio.com',
});
exports.db = firebase_admin_1.default.firestore();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8080;
        this.initializeMiddlewares();
        this.initializeRouters();
        this.handleFallback();
        this.handleErrors();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.static(__dirname + "/public"));
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
    }
    initializeRouters() {
        (0, routersInitializer_1.initializeRouters)(this.app, exports.db);
    }
    handleFallback() {
        this.app.use((req, res) => {
            res.redirect('/');
        });
    }
    handleErrors() {
        process.on('uncaughtException', (error) => {
            console.error('Error: ', error);
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}
const appInstance = new App();
appInstance.start();
