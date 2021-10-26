"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessAddPage = exports.ProcessEditPage = exports.DisplayAddPage = exports.DisplayEditPage = exports.DisplayContactsListPage = void 0;
const contacts_1 = __importDefault(require("../models/contacts"));
const Util_1 = require("../util");
function DisplayContactsListPage(req, res, next) {
    contacts_1.default.find((err, contactsList) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Business Contacts', page: 'contacts-list', contacts: contactsList, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayContactsListPage = DisplayContactsListPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    contacts_1.default.findById(id, {}, {}, (err, contactsList) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', contacts: contactsList, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'add', contacts: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedContacts = new contacts_1.default({
        "_id": id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "email": req.body.email,
        "bloodgroup": req.body.bloodgroup
    });
    contacts_1.default.updateOne({ _id: id }, updatedContacts, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacts');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessAddPage(req, res, next) {
    let newContacts = new contacts_1.default({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "email": req.body.email,
        "bloodgroup": req.body.bloodgroup
    });
    contacts_1.default.create(newContacts, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacts');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    contacts_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacts');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
