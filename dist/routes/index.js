"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get((_, res) => {
    res.status(200).send('<p style="color:purple">The server is running 🐶🐱</p>');
});
exports.default = router;
