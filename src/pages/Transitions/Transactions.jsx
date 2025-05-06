import Header from "_components/Header/Header.jsx";
import { useState } from "react";
import Button from "_components/Button/Button.jsx";
import AddTransactionModal from "_components/AddTransactionModal/AddTransactionModal.jsx";
import { TransactionsTable } from "_components/TransactionsTable/TransactionsTable.jsx";

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header big center title="Транзакции" />
      <Button onClick={() => setIsOpen(true)} title="+ Добавить транзакцию"/>
      {isOpen && <AddTransactionModal onClose={() => setIsOpen(false)} />}
      <TransactionsTable />
    </>
  );
};

export default Transactions;
