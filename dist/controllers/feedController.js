"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const DTOs_1 = require("../DTOs");
class FeedController {
    async readAll(req, res, next) {
        try {
            const feed = await repositories_1.FeedRepository.findAll();
            return res.status(200).json({ data: feed });
        }
        catch (error) {
            return next(error);
        }
    }
    async read(req, res, next) {
        try {
            const { feedId } = req.params;
            const feed = await repositories_1.FeedRepository.findById(feedId);
            if (!feed) {
                return res.status(404).json({ message: 'Feed not found' });
            }
            return res.status(200).json({ data: feed });
        }
        catch (error) {
            return next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { feedId } = req.params;
            const feedData = DTOs_1.UpdateFeed.parse(req.body);
            const feed = await repositories_1.FeedRepository.update(feedId, feedData);
            return res.status(200).json({ message: 'Animal updated', data: feed });
        }
        catch (error) {
            return next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { feedId } = req.params;
            await repositories_1.FeedRepository.delete(feedId);
            return res.status(200).json({ message: 'Feed and owner deleted' });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new FeedController();
