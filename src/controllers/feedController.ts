import { Request, Response, NextFunction } from 'express';
import { FeedRepository } from '../repositories';
import { Feed, UpdateFeed } from '../DTOs';

class FeedController {

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
          const feed = await FeedRepository.findAll();
    
          return res.status(200).json({ data: feed });
        } catch (error) {
          return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
          const { feedId } = req.params;
    
          const feed = await FeedRepository.findById(feedId);
    
          if (!feed) {
            return res.status(404).json({ message: 'Feed not found' });
          }
    
          return res.status(200).json({ data: feed });
        } catch (error) {
          return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
          const { feedId } = req.params;
          const feedData = UpdateFeed.parse(req.body);
    
          const feed = await FeedRepository.update(feedId, feedData);
    
          return res.status(200).json({ message: 'Animal updated', data: feed });
        } catch (error) {
          return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
          const { feedId } = req.params;
    
          await FeedRepository.delete(feedId);
    
          return res.status(200).json({ message: 'Feed and animal deleted' });
        } catch (error) {
          return next(error);
        }
    }

}
export default new FeedController();