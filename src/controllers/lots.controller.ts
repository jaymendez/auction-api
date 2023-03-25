import { Lot } from '@/interfaces/lots.interface';
import { Transaction } from '@/interfaces/transaction.interface';
import LotService from '@/services/lots.service';
import TransactionService from '@/services/transaction.service';
import UserService from '@/services/users.service';
import { NextFunction, Request, Response } from 'express';

class LotsController {
  public lotService = new LotService();
  public transactionService = new TransactionService();
  public userService = new UserService();

  public getLots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, status } = req.query;
      const findAllLotsData = await this.lotService.findAllLot({ userId, status });

      res.status(200).json({ data: findAllLotsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLotById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lotId: string = req.params.id;
      const findOneLotData = await this.lotService.findLotById(lotId);

      res.status(200).json({ data: findOneLotData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lotData = req.body;
      const createLotData: Lot = await this.lotService.createLot(lotData);

      res.status(201).json({ data: createLotData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lotId: string = req.params.id;
      const lotData = req.body;
      const updateLotData: Lot = await this.lotService.updateLot(lotId, lotData);

      res.status(200).json({ data: updateLotData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public createTransactionAndUpdateLot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lotId = req.params.id;
      const transactionData = req.body;
      await this.transactionService.closeLotTransactions(lotId);
      const createTransactionData: Transaction = await this.transactionService.createTransaction(transactionData);
      const updateLotData: Lot = await this.lotService.addBidToLot(lotId, createTransactionData);

      res.status(201).json({ data: updateLotData, message: 'bidAction' });
    } catch (error) {
      next(error);
    }
  };

  public lotTransfer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lotId = req.params.id;
      const transactionData = req.body;
      const updatedTransaction = await this.transactionService.updateTransaction(transactionData._id, { status: 'success' });
      const oldLot = await this.lotService.findLotById(lotId);
      // Transfer the money to the owner of the lot
      const owner = await this.userService.computeUserMoney(transactionData, false, oldLot.userId);

      // Transfer the ownership of the lot to the owner and update the price of the item
      const updatedLot = await this.lotService.updateLot(lotId, {
        status: 'completed',
        userId: transactionData.userId,
        startingPrice: updatedTransaction.transactionAmount,
      });

      res.status(201).json({ data: { transaction: updatedTransaction, owner, lot: updatedLot }, message: 'lotTransfer' });
    } catch (error) {
      next(error);
    }
  };
}

export default LotsController;
