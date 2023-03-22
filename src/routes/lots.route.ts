import LotsController from '@/controllers/lots.controller';
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
    this.router.get(`${this.path}/:id`, this.lotsController.getLotById);
    this.router.post(`${this.path}`, this.lotsController.createLot);
  }
}

export default LotsRoute;
