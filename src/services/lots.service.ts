import { Lot } from '@/interfaces/lots.interface';
import { Transaction } from '@/interfaces/transaction.interface';
import lotModel from '@/models/lots.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class LotService {
  public lots = lotModel;

  public async findAllLot({ userId = null, status }): Promise<Lot[]> {
    let findQuery = {};
    if (status) {
      let statusQuery = {};
      if (status === 'all') {
        if (!userId) {
          statusQuery = { $in: ['ongoing', 'published', 'completed'] };
        } else {
          statusQuery = { $in: ['ongoing', 'published', 'completed', 'draft'] };
        }
      }
      if (status === 'ongoing' || status === 'published') {
        statusQuery = { $in: ['ongoing', 'published'] };
      }
      findQuery = {
        ...findQuery,
        status: isEmpty(statusQuery) ? status : statusQuery,
      };
    }
    if (userId) {
      findQuery = {
        ...findQuery,
        userId,
      };
    }

    const lots: Lot[] = await this.lots.find(findQuery).populate('bids');
    return lots;
  }

  public async findLotById(lotId: string): Promise<Lot> {
    if (isEmpty(lotId)) throw new HttpException(400, 'LotId is empty');

    const findLot: Lot = await this.lots.findOne({ _id: lotId });
    if (!findLot) throw new HttpException(409, "Lot doesn't exist");

    return findLot;
  }

  public async findLotsByUserId(userId: string): Promise<Lot[]> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const lots: Lot[] = await this.lots.find({ userId });
    if (!lots) throw new HttpException(409, "Lot doesn't exist");

    return lots;
  }

  public async createLot(lotData: Lot): Promise<Lot> {
    if (isEmpty(lotData)) throw new HttpException(400, 'lotData is empty');

    const findLot: Lot = await this.lots.findOne({ name: lotData.name });
    if (findLot) throw new HttpException(409, `This item ${lotData.name} already exists`);

    const createLotData: Lot = await this.lots.create({ ...lotData });

    return createLotData;
  }

  public async updateLot(lotId: string, lotData: Partial<Lot>): Promise<Lot> {
    if (isEmpty(lotData)) throw new HttpException(400, 'lotData is empty');

    const updateLotById: Lot = await this.lots.findByIdAndUpdate(lotId, { $set: lotData }).exec();
    if (!updateLotById) throw new HttpException(409, "Lot doesn't exist");

    return updateLotById;
  }

  public async addBidToLot(lotId: string, transactionData: Transaction): Promise<Lot> {
    if (isEmpty(transactionData)) throw new HttpException(400, 'transactionData is empty');
    const lot = await this.findLotById(lotId);
    const [leadingBid] = lot?.bids;
    if (leadingBid) {
      if (leadingBid.userId === transactionData.userId) {
        throw new HttpException(409, `You're the leading bidder, can't create another bid.`);
      }
      if (leadingBid.transactionAmount >= transactionData.transactionAmount) {
        throw new HttpException(409, `Your bid should be greater than the leading bid.`);
      }
    }
    const updateLot: Lot = await this.lots.findByIdAndUpdate(lotId, { $push: { bids: transactionData } }).exec();
    return updateLot;
  }
}

export default LotService;
