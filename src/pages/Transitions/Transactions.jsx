import Header from "_components/Header/Header.jsx";
import { useState } from "react";
import Button from "_components/Button/Button.jsx";
import { AddTransactionModal } from "_components/AddTransactionModal/AddTransactionModal.jsx";
import { TransactionsTable } from "_components/TransactionsTable/TransactionsTable.jsx";
import { DownloadButton } from "_components/DownloadButton/DownloadButton.jsx";
import styles from "./styles.module.scss";

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header big center title="Транзакции" />
      <div className={styles.actions}>
        <Button onClick={() => setIsOpen(true)} title="+ Добавить транзакцию"/>
        <DownloadButton />
      </div>
      {isOpen && <AddTransactionModal onClose={() => setIsOpen(false)} />}
      <TransactionsTable />
    </>
  );
};

export default Transactions;
