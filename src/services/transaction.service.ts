import { Transaction } from '@/interfaces/transaction.interface';
import { User } from '@/interfaces/users.interface';
import lotModel from '@/models/lots.model';
import transactionModel from '@/models/transactions.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import UserService from './users.service';

class TransactionService {
  public transactions = transactionModel;
  public lots = lotModel;
  public userService = new UserService();

  public async findAllTransaction(): Promise<Transaction[]> {
    const transactions: Transaction[] = await this.transactions.find();
    return transactions;
  }

  public async findTransactionById(transactionId: string): Promise<Transaction> {
    if (isEmpty(transactionId)) throw new HttpException(400, 'transactionId is empty');

    const findTransaction: Transaction = await this.transactions.findOne({ _id: transactionId });
    if (!findTransaction) throw new HttpException(409, "Transaction doesn't exist");

    return findTransaction;
  }

  public async findTransactionsByUserId(userId: string): Promise<Transaction[]> {
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

    const findTransaction: Transaction[] = await this.transactions.find({ userId });
    if (!findTransaction) throw new HttpException(409, "Transaction doesn't exist");

    return findTransaction;
  }

  public async createTransaction(transactionData: Transaction): Promise<Transaction> {
    if (isEmpty(transactionData)) throw new HttpException(400, 'transactionData is empty');

    const user: User = await this.userService.findUserById(transactionData.userId);
    if (user.moneyAmount < transactionData.transactionAmount) {
      throw new HttpException(409, `User doesn't have enough money to perform this transaction.`);
    }
    // if (findTransaction) throw new HttpException(409, `This item ${transactionData.name} already exists`);
    await this.userService.computeUserMoney(transactionData, true);
    const createTransactionData: Transaction = await this.transactions.create({ ...transactionData });

    return createTransactionData;
  }

  public async updateTransaction(transactionId: string, transactionData: Partial<Transaction>): Promise<Transaction> {
    if (isEmpty(transactionData)) throw new HttpException(400, 'transactionData is empty');

    const updateTransactionById: Transaction = await this.transactions.findByIdAndUpdate(transactionId, { $set: transactionData }).exec();
    if (!updateTransactionById) throw new HttpException(409, "Transaction doesn't exist");

    return updateTransactionById;
  }

  public async closeLotTransactions(lotId: string) {
    if (isEmpty(lotId)) throw new HttpException(400, 'lotId is empty');

    // const findTransaction: Transaction = await this.transactions.findOne({ name: transactionData.name });
    // if (findTransaction) throw new HttpException(409, `This item ${transactionData.name} already exists`);
    const closedTransaction = await this.transactions.updateMany({ lotId }, { $set: { status: 'closed' } });
    const transactions = await this.transactions.find({ lotId });
    await Promise.all(
      transactions?.map(async transaction => {
        await this.userService.computeUserMoney(transaction);
      }),
    );

    return closedTransaction;
  }
}

export default TransactionService;
