"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const items = await activity_1.default.find()
            .populate({ path: 'user', select: 'name email' })
            .populate({ path: 'team', select: 'name city' })
            .sort({ performedAt: -1 })
            .lean();
        res.json({ resource: 'activities', count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ resource: 'activities', error: 'Failed to fetch activities', details: error });
    }
});
exports.default = router;
