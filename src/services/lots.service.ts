import { Lot } from '@/interfaces/lots.interface';
import lotModel from '@/models/lots.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class LotService {
  public lots = lotModel;

  public async findAllLot(): Promise<Lot[]> {
    const lots: Lot[] = await this.lots.find();
    return lots;
  }

  public async findLotById(lotId: string): Promise<Lot> {
    if (isEmpty(lotId)) throw new HttpException(400, 'LotId is empty');

    const findLot: Lot = await this.lots.findOne({ _id: lotId });
    if (!findLot) throw new HttpException(409, "Lot doesn't exist");

    return findLot;
  }

  public async createLot(lotData: Lot): Promise<Lot> {
    if (isEmpty(lotData)) throw new HttpException(400, 'lotData is empty');

    const findLot: Lot = await this.lots.findOne({ name: lotData.name });
    if (findLot) throw new HttpException(409, `This item ${lotData.name} already exists`);

    const createLotData: Lot = await this.lots.create({ ...lotData });

    return createLotData;
  }
}

export default LotService;
