import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "_stores/use-stores.js";
import styles from "./styles.module.scss";
import Header from "_components/Header/Header.jsx";
import PropTypes from "prop-types";
import Button from "_components/Button/Button.jsx";

function TransactionsFilterModalComponent({ onClose }) {
  const { transactionsStore } = useStores();
  const [localFilter, setLocalFilter] = useState({ ...transactionsStore.filter });

  const categories = transactionsStore.getCategories();
  const statuses = transactionsStore.getStatuses();

  const handleChange = (field, value) => {
    setLocalFilter(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    transactionsStore.setFilter(localFilter);
    onClose();
  };

  const resetFilters = () => {
    transactionsStore.resetFilter();
    setLocalFilter({ ...transactionsStore.filter });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.formWrapper}>
          <Button onClick={() => onClose()} className={styles.buttonClose} title="Закрыть" />
          <Header center title="Фильтры:" />
          <label>
            Банк отправителя:
            <input
              type="text"
              value={localFilter.senderBank}
              onChange={e => handleChange("senderBank", e.target.value)}
            />
          </label>
          <label>
            Банк получателя:
            <input
              type="text"
              value={localFilter.receiverBank}
              onChange={e => handleChange("receiverBank", e.target.value)}
            />
          </label>
          <label>
            Конкретная дата:
            <input
              type="date"
              value={localFilter.exactDate || ""}
              onChange={e => handleChange("exactDate", e.target.value)}
            />
          </label>
          <label>
            Диапазон дат:
            <div className={styles.dateRange}>
              <input
                type="date"
                value={localFilter.dateFrom || ""}
                onChange={e => handleChange("dateFrom", e.target.value)}
              />
              <span>–</span>
              <input
                type="date"
                value={localFilter.dateTo || ""}
                onChange={e => handleChange("dateTo", e.target.value)}
              />
            </div>
          </label>
          <label>
            ИНН получателя:
            <input
              type="text"
              value={localFilter.receiverInn}
              onChange={e => handleChange("receiverInn", e.target.value)}
            />
          </label>
          <label>
            Сумма операции (от и до):
            <div className={styles.amountRange}>
              <input
                type="number"
                placeholder="Мин"
                value={localFilter.amountMin || ""}
                onChange={e => handleChange("amountMin", Number(e.target.value))}
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Макс"
                value={localFilter.amountMax || ""}
                onChange={e => handleChange("amountMax", Number(e.target.value))}
              />
            </div>
          </label>
          <label>
            Статус:
            <select
              value={localFilter.status}
              onChange={e => handleChange("status", e.target.value)}
            >
              <option value="">Не выбрано</option>
              {Object.entries(statuses).map(([key, value]) => (
                <option key={key} value={value.name}>{key}</option>
              ))}
            </select>
          </label>
          <label>
            Тип операции:
            <select
              value={localFilter.type}
              onChange={e => handleChange("type", e.target.value)}
            >
              <option value="">Не выбрано</option>
              <option value="INCOME">Доход</option>
              <option value="EXPENSE">Расход</option>
            </select>
          </label>
          <label>
            Категория:
            <select
              value={localFilter.category}
              onChange={e => handleChange("category", e.target.value)}
            >
              <option value="">Не выбрано</option>
              {Object.entries(categories).length > 0 && Object.entries(categories).map(([key, value]) => (
                <option key={key} value={value.name}>{key}</option>
              ))}
            </select>
          </label>
          <div className={styles.modalActions}>
            <button onClick={resetFilters}>Сбросить</button>
            <button onClick={applyFilters}>Применить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

TransactionsFilterModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export const TransactionsFilterModal = observer(TransactionsFilterModalComponent);
