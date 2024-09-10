"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpController = void 0;
class BaseHttpController {
    constructor(service) {
        this.service = service;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defs = yield this.service.getAll();
                res.json({ defs });
            }
            catch (error) {
                console.error('Error getting documents:', error);
                res.status(500).json({ title: 'Error', body: 'No Data available.' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const def = yield this.service.getById(req.params.id);
                if (!def) {
                    res.status(404).json({ title: 'Error', body: 'Item not found.' });
                }
                else {
                    res.json({ def });
                }
            }
            catch (error) {
                console.error('Error getting document:', error);
                res.status(500).json({ title: 'Error', body: 'No Data available.' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield this.service.create(req.body);
                res.json({ done: true, id });
            }
            catch (error) {
                console.error('Error adding document:', error);
                res.status(500).json({ done: false });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.service.deleteById(req.params.id);
                res.json({ done: true });
            }
            catch (error) {
                console.error('Error deleting document:', error);
                res.status(500).json({ done: false });
            }
        });
    }
}
exports.BaseHttpController = BaseHttpController;
