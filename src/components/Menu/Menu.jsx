import React, { useCallback } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useStores } from "_stores/use-stores.js";
import Button from "_components/Button/Button.jsx";

function Menu() {
  const { authStore } = useStores();

  const clickHandler = useCallback(() => {
    authStore.logout();
  }, [authStore]);

  return (
    <header className={styles.component}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? styles.active : ''}
          end
        >
          Главная
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          Транзакции
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          Отчеты
        </NavLink>
      </nav>
      <Button onClick={clickHandler} title="Выйти" />
    </header>
  );
}

export default Menu;
