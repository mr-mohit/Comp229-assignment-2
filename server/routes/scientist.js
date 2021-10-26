"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const scientist_1 = require("../controllers/scientist");
const Util_1 = require("../Util");
router.get('/', scientist_1.DisplayScientistListPage);
router.get('/add', Util_1.AuthGuard, scientist_1.DisplayAddPage);
router.get('/edit/:id', Util_1.AuthGuard, scientist_1.DisplayEditPage);
router.post('/add', Util_1.AuthGuard, scientist_1.ProcessAddPage);
router.post('/edit/:id', Util_1.AuthGuard, scientist_1.ProcessEditPage);
router.get('/delete/:id', Util_1.AuthGuard, scientist_1.ProcessDeletePage);
