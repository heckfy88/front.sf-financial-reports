import React, { useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "_stores/use-stores.js";
import styles from "./styles.module.scss";
import { TRANSACTION_STATUS_TYPES } from "_services/transactions.service.js";
import Button from "_components/Button/Button.jsx";
import EditTransactionModal from "_components/EditTransactionModal/EditTransactionModal.jsx";

function TransactionsTableComponent() {
  const { transactionsStore } = useStores();
  const { filteredTransactions, loading } = transactionsStore;
  const [isOpen, setIsOpen] = useState(false);
  const [updatedTransactions, setUpdatedTransactions] = useState({});

  const onClickHandler = useCallback(transaction => {
    setUpdatedTransactions(transaction);
    setIsOpen(true);
  }, []);

  const transactionsList = useMemo(() => {
    const transactions = filteredTransactions;

    if (loading) {
      return (
        <tr>
          <td className={styles.noDataRow} colSpan="13">Загрузка данных ....</td>
        </tr>
      );
    }

    if (!transactions || transactions.length === 0) {
      return (
        <tr>
          <td className={styles.noDataRow} colSpan="13">Данных пока нет</td>
        </tr>
      )
    }

    return transactions.map((transaction, index) => (
        <tr key={transaction.id + index}>
          <td>{transaction.date}</td>
          <td>{transaction.userType}</td>
          <td>{transaction.description}</td>
          <td>{transaction.amount.toLocaleString()}</td>
          <td>{transaction.status.title}</td>
          <td>{transaction.senderBank}</td>
          <td>{transaction.senderAccount}</td>
          <td>{transaction.receiverBank}</td>
          <td>{transaction.receiverAccount}</td>
          <td>{transaction.receiverInn}</td>
          <td>{transaction.category.description}</td>
          <td>{transaction.receiverPhone}</td>
          <td>{transaction.status.name === TRANSACTION_STATUS_TYPES.NEW ? <Button onClick={() => onClickHandler(transaction)} title="Редактировать" /> : ""}</td>
        </tr>
      ));
  }, [filteredTransactions, loading, onClickHandler])

  return (
    <div className={styles.tableContainer}>
      {isOpen && <EditTransactionModal onClose={() => setIsOpen(false)} transaction={updatedTransactions} />}
      <table className={styles.transactionsTable}>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тип пользователя</th>
            <th>Описание</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Банк отправителя</th>
            <th>Счёт отправителя</th>
            <th>Банк получателя</th>
            <th>Счёт получателя</th>
            <th>ИНН получателя</th>
            <th>Категория</th>
            <th>Телефон получателя</th>
            <th>Редактировать</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList}
        </tbody>
      </table>
    </div>
  );
}

export const TransactionsTable = observer(TransactionsTableComponent);
