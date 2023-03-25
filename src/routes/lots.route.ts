import LotsController from '@/controllers/lots.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class LotsRoute implements Routes {
  public path = '/lots';
  public router = Router();
  public lotsController = new LotsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.lotsController.getLots);
    this.router.get(`${this.path}/:id`, authMiddleware, this.lotsController.getLotById);
    this.router.post(`${this.path}`, authMiddleware, this.lotsController.createLot);
    this.router.put(`${this.path}/:id`, authMiddleware, this.lotsController.updateLot);
    this.router.put(`${this.path}/:id/transaction`, authMiddleware, this.lotsController.createTransactionAndUpdateLot);
    this.router.put(`${this.path}/:id/transfer`, authMiddleware, this.lotsController.lotTransfer);
  }
}

export default LotsRoute;
