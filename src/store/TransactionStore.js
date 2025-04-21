import { makeAutoObservable } from 'mobx';

class TransactionStore {
  transactions = [];
  filter = {};

  constructor() {
    makeAutoObservable(this);
  }

  setTransactions(data) {
    this.transactions = data;
  }

  setFilter(filter) {
    this.filter = filter;
  }

  get filteredTransactions() {
    // применим фильтры тут
    return this.transactions; // пока просто возвращаем
  }
}

export default new TransactionStore();
