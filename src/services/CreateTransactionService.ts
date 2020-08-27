import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface TransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: TransactionData): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (transaction.type !== 'income' && transaction.type !== 'outcome')
      throw Error('Transactions must be "income" or "outcome"');

    if (transaction.value <= 0)
      throw Error('Transactions must be greater than zero');

    if (transaction.type === 'outcome' && transaction.value > balance.total)
      throw Error(
        'Outcome value must not be greater than your current balance',
      );

    const createdTransaction = this.transactionsRepository.create(transaction);

    return createdTransaction;
  }
}

export default CreateTransactionService;
