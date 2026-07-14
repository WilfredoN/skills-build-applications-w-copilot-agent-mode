"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.default.find().lean();
    res.json({ teams });
});
router.post('/', async (req, res) => {
    const { name, members } = req.body;
    const team = new Team_1.default({ name, members });
    await team.save();
    res.status(201).json({ team });
});
router.get('/:id', async (req, res) => {
    const team = await Team_1.default.findById(req.params.id).lean();
    if (!team)
        return res.status(404).json({ message: 'Team not found' });
    res.json({ team });
});
exports.default = router;
