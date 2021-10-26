"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessAddPage = exports.ProcessEditPage = exports.DisplayAddPage = exports.DisplayEditPage = exports.DisplayScientistListPage = void 0;
const scientist_1 = __importDefault(require("../models/scientist"));
const Util_1 = require("../util");
function DisplayScientistListPage(req, res, next) {
    scientist_1.default.find((err, scientistList) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Scientist', page: 'scientist-list', scientist: scientistList, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayScientistListPage = DisplayScientistListPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    scientist_1.default.findById(id, {}, {}, (err, scientistList) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', scientist: scientistList, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'add', scientist: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedScientist = new scientist_1.default({
        "_id": id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "email": req.body.email,
        "bloodgroup": req.body.bloodgroup
    });
    scientist_1.default.updateOne({ _id: id }, updatedScientist, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/scientist');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessAddPage(req, res, next) {
    let newScientist = new scientist_1.default({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "email": req.body.email,
        "bloodgroup": req.body.bloodgroup
    });
    scientist_1.default.create(newScientist, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/scientist');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    scientist_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/scientist');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
