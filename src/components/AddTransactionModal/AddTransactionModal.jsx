import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Header from "_components/Header/Header.jsx";
import { CATEGORY_FROM_RUS_DESCRIPTIONS, PERSON_TYPES, TRANSACTION_STATUSES_FROM_RUS_TITLE } from "_services/transactions.service.js";
import { generateUUID } from "_services/operuid.service.js";
import { useStores } from "_stores/use-stores.js";

function AddTransactionModal({ onClose }) {
  const [formData, setFormData] = useState({
    personType: 'Физическое лицо',
    date: '',
    comment: '',
    amount: '',
    status: 'Новая',
    senderBank: '',
    senderAccount: '',
    receiverBank: '',
    inn: '',
    checkingAccount: '',
    category: 'Оплата моих услуг',
    phone: '',
  });
  const [error, setError] = useState("");

  const { transactionsStore } = useStores();

  const categories = CATEGORY_FROM_RUS_DESCRIPTIONS;
  const statuses = TRANSACTION_STATUSES_FROM_RUS_TITLE;
  const personType = PERSON_TYPES;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const cleaned = value.replace(/[^\d]/g, '');
      let masked = cleaned.startsWith('8') || cleaned.startsWith('7')
        ? '+7' + cleaned.slice(1)
        : '+7' + cleaned;

      masked = masked.slice(0, 12);
      setFormData({ ...formData, [name]: masked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{11}$/.test(formData.inn)) {
      alert('ИНН должен состоять из 11 цифр');
      return;
    }

    const data = {
      "id": generateUUID(),
      "userType": personType[formData.personType],
      "date": formData.date.replaceAll("-", "."),
      "description": formData.comment,
      "amount": formData.amount,
      "status": statuses[formData.status],
      "senderBank": formData.senderBank,
      "senderAccount": formData.senderAccount,
      "receiverBank": formData.receiverBank,
      "receiverAccount": formData.checkingAccount,
      "receiverInn": formData.inn,
      "category": categories[formData.category],
      "receiverPhone": formData.phone,
    }

    console.log(data);

    transactionsStore.addTransactions(JSON.stringify(data)).then(() => {
      onClose();
    }).catch(() => {
      setError("Проверьте данные и попробуйте отправить ещё раз.")
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.formWrapper}>
          <Header center title="Добавить транзакцию" />
          <form onSubmit={handleSubmit}>
            <label>
              Тип лица:
              <select name="personType" value={formData.personType} onChange={handleChange}>
                {Object.keys(personType).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </label>

            <label>
              Дата и время:
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>
            <label>
              Комментарий:
              <input type="text" name="comment" value={formData.comment} onChange={handleChange} />
            </label>

            <label>
              Сумма:
              <input type="number" step="0.00001" name="amount" value={formData.amount} onChange={handleChange} required />
            </label>

            <label>
              Статус:
              <select name="status" value={formData.status} onChange={handleChange}>
                {Object.keys(statuses).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </label>
            <label>
              Категория:
              <select name="category" value={formData.category} onChange={handleChange}>
                {Object.keys(categories).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </label>
            <label>
              Банк отправителя:
              <input type="text" name="senderBank" value={formData.senderBank} onChange={handleChange} required />
            </label>
            <label>
              Счет отправителя:
              <input type="text" name="senderAccount" value={formData.senderAccount} onChange={handleChange} required />
            </label>
            <label>
              Банк получателя:
              <input type="text" name="receiverBank" value={formData.receiverBank} onChange={handleChange} required />
            </label>
            <label>
              ИНН получателя:
              <input type="text" name="inn" value={formData.inn} onChange={handleChange} required />
            </label>
            <label>
              Расчетный счет:
              <input type="text" name="checkingAccount" value={formData.checkingAccount} onChange={handleChange} required />
            </label>
            <label>
              Телефон:
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+7XXXXXXXXXX" required />
            </label>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.modalActions}>
              <button type="submit">Отправить</button>
              <button type="button" onClick={onClose}>Закрыть</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;

AddTransactionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
