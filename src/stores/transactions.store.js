import { makeAutoObservable, runInAction } from "mobx";

class TransactionsStore {
  _api;
  _transactions = [];
  _statuses = [];
  _categories = {};
  filter = {
    senderBank: "",
    receiverBank: "",
    exactDate: null,
    dateFrom: null,
    dateTo: null,
    status: "",
    receiverInn: "",
    amountMin: null,
    amountMax: null,
    category: "",
    type: ""
  };
  dashboard = {};
  error = null;
  loading = true;

  constructor(api) {
    makeAutoObservable(this, {
      _api: false,
    });
    this._api = api;
  }

  async loadTransactions() {
    this.loading = true;
    try {
      const resolve = await this._api.get("/v1/transactions");

      runInAction(() => {
        this._transactions = resolve.data;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadStatuses() {
    this.loading = true;
    try {
      const resolve = await this._api.get("/v1/transactions/statuses");
      runInAction(() => {
        const statusList = resolve.data;
        this._statuses = Object.fromEntries(statusList.map(status => [status.title, status]));
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadCategories() {
    this.loading = true;
    try {
      const resolve = await this._api.get("/v1/transactions/categories");
      runInAction(() => {
        const categoriesList = resolve.data;
        this._categories = Object.fromEntries(categoriesList.map(category => [category.description, category]));
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  addCategory(category) {
    this._categories = {...this._categories, ...category};
  }

  getCategories() {
    return this._categories;
  }

  getTransactions() {
    return this._transactions;
  }

  getStatuses() {
    return this._statuses;
  }

  async addTransactions(data) {
    this.loading = true;
    try {
      const resolve = await this._api.post("/v1/transactions", data);
      runInAction(() => {
        this._transactions = [...this._transactions, resolve.data];
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  setFilter(filter) {
    this.filter = { ...this.filter, ...filter };
  }

  resetFilter() {
    this.filter = {
      senderBank: "",
      receiverBank: "",
      exactDate: null,
      dateFrom: null,
      dateTo: null,
      status: "",
      receiverInn: "",
      amountMin: null,
      amountMax: null,
      category: "",
      type: ""
    };
  }

  get filteredTransactions() {
    return this._transactions.filter(tx => {
      const {
        senderBank,
        receiverBank,
        exactDate,
        dateFrom,
        dateTo,
        status,
        receiverInn,
        amountMin,
        amountMax,
        category,
        type
      } = this.filter;

      const txDate = new Date(tx.date);

      return (
        (!senderBank || tx.senderBank === senderBank) &&
        (!receiverBank || tx.receiverBank === receiverBank) &&
        (!exactDate || tx.date === exactDate) &&
        (!dateFrom || txDate >= new Date(dateFrom)) &&
        (!dateTo || txDate <= new Date(dateTo)) &&
        (!status || tx.status.name === status) &&
        (!receiverInn || tx.receiverInn === receiverInn) &&
        (!amountMin || tx.amount >= amountMin) &&
        (!amountMax || tx.amount <= amountMax) &&
        (!category || tx.category.name === category) &&
        (!type || tx.category.type === type)
      );
    });
  }

  async updateTransaction(data) {
    this.loading = true;
    try {
      const resolve = await this._api.patch("/v1/transactions", data);
      runInAction(() => {
        const index = this._transactions.findIndex(t => t.id === data.id);
        if (index !== -1) {
          this._transactions[index] = resolve.data;
        }
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
      throw e;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async deleteTransaction(id) {
    this.loading = true;
    try {
      await this._api.delete(`/v1/transactions/${id}`);
      runInAction(() => {
        const index = this._transactions.findIndex(t => t.id === id);
        if (index !== -1) {
          this._transactions[index] = {
            ...this._transactions[index],
            status: {
              name: "DELETED",
              title: "Платеж удален",
              weight: 0
            }
          };
        }
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
      throw e;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default TransactionsStore;
