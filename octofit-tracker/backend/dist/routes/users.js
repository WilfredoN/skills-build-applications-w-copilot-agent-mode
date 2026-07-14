"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.default.find().lean();
    res.json({ users });
});
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const user = new User_1.default({ name, email });
    await user.save();
    res.status(201).json({ user });
});
router.get('/:id', async (req, res) => {
    const user = await User_1.default.findById(req.params.id).lean();
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    res.json({ user });
});
exports.default = router;
