import { Router } from 'express';

import authMiddleware from '@/middlewares/auth.middleware';
import TransactionsController from '@controllers/transactions.controller';
import { Routes } from '@interfaces/routes.interface';

class TransactionsRoute implements Routes {
  public path = '/transactions';
  public router = Router();
  public transactionsController = new TransactionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.transactionsController.getTransactions);
    this.router.get(`${this.path}/:id`, authMiddleware, this.transactionsController.getTransactionById);
    this.router.post(`${this.path}`, this.transactionsController.createTransaction);
  }
}

export default TransactionsRoute;
