import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const transactionExists = await transactionsRepository.findOne(id);
    if (!transactionExists) {
      throw new AppError('Transaction does not exist.');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
