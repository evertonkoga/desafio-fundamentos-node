import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    let convertedType: 'income' | 'outcome';
    if (type === 'income') {
      convertedType = 'income';
    } else if (type === 'outcome') {
      convertedType = 'outcome';
    } else {
      throw Error(`Only 'income' and 'outcome' types are allowed.`);
    }

    const transaction = new Transaction({ title, value, type: convertedType });

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
