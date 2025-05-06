import { Outlet } from "react-router-dom";
import styles from './styles.module.scss';
import Menu from "_components/Menu/Menu.jsx";
import PageLayout from "_components/PageLayout/PageLayout.jsx";
import { useState } from "react";
import Button from "_components/Button/Button.jsx";
import { TransactionsFilterModal } from "_components/TransactionsFilterModal/TransactionsFilterModal.jsx";

const MainLayout = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <div className={styles.layout}>
      <Menu />
      <Button onClick={() => setIsOpenFilter(true)} className={styles.button} title="Фильтры" />
      {isOpenFilter && <TransactionsFilterModal onClose={() => setIsOpenFilter(false)} /> }
      <PageLayout>
        <Outlet />
      </PageLayout>
    </div>
  );
};

export default MainLayout;
