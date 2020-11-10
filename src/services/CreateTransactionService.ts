import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type))
      throw Error(`Only 'income' and 'outcome' types are allowed.`);

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total)
      throw Error('Transaction not allowed');

    const transaction = new Transaction({ title, value, type });

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
