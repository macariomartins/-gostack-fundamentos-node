import Transaction from '../models/Transaction';

interface TransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') income += transaction.value;
      else outcome += transaction.value;
    });

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create(trasactionData: TransactionData): Transaction {
    const transaction = new Transaction(trasactionData);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
