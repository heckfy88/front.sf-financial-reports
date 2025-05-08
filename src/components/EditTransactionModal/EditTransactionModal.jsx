import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Header from "_components/Header/Header.jsx";
import { PERSON_TYPES } from "_services/transactions.service.js";
import { useStores } from "_stores/use-stores.js";
import { observer } from "mobx-react-lite";
import Button from "_components/Button/Button.jsx";
import { AddCategory } from "_components/AddCategory/AddCategory.jsx";

function EditTransactionModalComponent({ onClose, transaction }) {
  const { transactionsStore } = useStores();

  const categories = transactionsStore.getCategories();
  const statuses = transactionsStore.getStatuses();
  const personType = PERSON_TYPES;

  const [formData, setFormData] = useState({
    personType: personType[transaction.receiverUserType],
    date: transaction.date.replaceAll(".", "-"),
    comment: transaction.description,
    amount: transaction.amount,
    status: Object.keys(statuses).find(key => statuses[key].name === transaction.status.name),
    senderBank: transaction.senderBank,
    senderAccount: transaction.senderAccount,
    receiverBank: transaction.receiverBank,
    receiverAccount: transaction.receiverAccount,
    inn: transaction.receiverInn,
    checkingAccount: transaction.receiverAccount,
    category: transaction.category.description,
    phone: transaction.receiverPhone,
  });

  const [error, setError] = useState("");
  const [displayAddPanel, setDisplayAddPanel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleaned = value.replace(/[^\d]/g, "");
      let masked = cleaned.startsWith("8") || cleaned.startsWith("7") ? "+7" + cleaned.slice(1) : "+7" + cleaned;
      masked = masked.slice(0, 12);
      setFormData({ ...formData, [name]: masked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{11}$/.test(formData.inn)) {
      alert("ИНН должен состоять из 11 цифр");
      return;
    }

    const category = categories[formData.category];
    delete category.id;

    const updatedData = {
      id: transaction.id,
      receiverUserType: Object.entries(personType).find(([, rus]) => rus === formData.personType)[0],
      date: formData.date.replaceAll("-", "."),
      description: formData.comment,
      amount: Number(formData.amount),
      status: statuses[formData.status],
      senderBank: formData.senderBank,
      senderAccount: formData.senderAccount,
      receiverBank: formData.receiverBank,
      receiverAccount: formData.checkingAccount,
      receiverInn: formData.inn,
      category: category,
      receiverPhone: formData.phone,
    };

    transactionsStore.updateTransaction(updatedData)
      .then(() => onClose())
      .catch(() => setError("Ошибка при обновлении. Проверьте данные и попробуйте ещё раз."));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.formWrapper}>
          <Header center title="Редактировать транзакцию" />
          <form onSubmit={handleSubmit}>
            <label>
              Тип лица:
              <select name="personType" value={formData.personType} onChange={handleChange}>
                {Object.values(personType).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </label>
            <label>
              Дата:
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
              <div className={styles.categoryWrapper}>
                <div className={styles.selectRow}>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    {Object.keys(categories).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                  <Button onClick={() => setDisplayAddPanel(!displayAddPanel)} title="+" />
                </div>
                {displayAddPanel && <AddCategory onClose={() => setDisplayAddPanel(false)} /> }
              </div>
            </label>
            <label>
              Банк отправителя:
              <input type="text" name="senderBank" value={formData.senderBank} onChange={handleChange} required />
            </label>
            <label>
              Счет отправителя:
              <input type="text" name="senderAccount" value={formData.senderAccount} disabled />
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
              <input type="text" name="checkingAccount" value={formData.checkingAccount} disabled />
            </label>
            <label>
              Телефон:
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+7XXXXXXXXXX" required />
            </label>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.modalActions}>
              <button type="submit">Сохранить</button>
              <button type="button" onClick={onClose}>Отмена</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditTransactionModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

export const EditTransactionModal = observer(EditTransactionModalComponent);
