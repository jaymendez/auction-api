import { Lot } from '@/interfaces/lots.interface';
import LotService from '@/services/lots.service';
import { NextFunction, Request, Response } from 'express';

class LotsController {
  public lotService = new LotService();

  public getLots = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLotsData = await this.lotService.findAllLot();

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

  // public updateUser = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const userData: CreateUserDto = req.body;
  //     const updateUserData: User = await this.userService.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const deleteUserData: User = await this.userService.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default LotsController;
