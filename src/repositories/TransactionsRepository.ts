import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const allTransactions = await this.find();

    const aggregation = allTransactions.reduce(
      (accum, current) => {
        switch (current.type) {
          case 'income':
            accum.income += Number(current.value);
            break;
          case 'outcome':
            accum.outcome += Number(current.value);
            break;

          default:
            break;
        }

        return accum;
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      ...aggregation,
      total: aggregation.income - aggregation.outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
