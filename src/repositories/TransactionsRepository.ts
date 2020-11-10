import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;

    const income =
      this.transactions.length === 0
        ? 0
        : this.transactions
          .map(transaction =>
            transaction.type === 'income' ? transaction.value : 0,
          )
          .reduce(reducer);

    const outcome = this.transactions.length === 0
      ? 0
      : this.transactions
        .map(transaction =>
          transaction.type === 'outcome' ? transaction.value : 0,
        )
        .reduce(reducer);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create(transaction: Transaction): Transaction {
    const balance = this.getBalance();
    if (transaction.type === 'outcome' && transaction.value > balance.total)
      throw Error('Transaction not allowed');

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
