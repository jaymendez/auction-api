import { Transaction } from '@/interfaces/transaction.interface';
import TransactionService from '@/services/transaction.service';
import { NextFunction, Request, Response } from 'express';

class TransactionsController {
  public transactionService = new TransactionService();

  public getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTransactionData = await this.transactionService.findAllTransaction();

      res.status(200).json({ data: findAllTransactionData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const findOneTransactionData = await this.transactionService.findTransactionById(transactionId);

      res.status(200).json({ data: findOneTransactionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionData = req.body;
      const createTransactionData: Transaction = await this.transactionService.createTransaction(transactionData);

      res.status(201).json({ data: createTransactionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionsController;
