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
exports.BaseHttpService = void 0;
class BaseHttpService {
    constructor(db, collectionName) {
        this.collectionRef = db.collection(collectionName);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.collectionRef.get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docSnapshot = yield this.collectionRef.doc(id).get();
            if (!docSnapshot.exists)
                return null;
            return Object.assign({ id }, docSnapshot.data());
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield this.collectionRef.add(Object.assign(Object.assign({}, data), { created_at: new Date() }));
            return docRef.id;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collectionRef.doc(id).delete();
        });
    }
}
exports.BaseHttpService = BaseHttpService;
