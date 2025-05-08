import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { useStores } from "_stores/use-stores.js";
import Button from "_components/Button/Button.jsx";

function AddCategoryComponent({ onClose }) {
  const { transactionsStore } = useStores();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const addHandler = useCallback(() => {
    const data = {
      [description]: {
        name,
        description,
        type,
      }
    }
    transactionsStore.addCategory(data);
    onClose();
  }, [description, name, onClose, transactionsStore, type])


  return (
    <div className={styles.component}>
      <div className={styles.inputs}>
        <input type="text" name="addName" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" required />
        <input type="text" name="addDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание" required />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">Не выбрано</option>
          <option value="INCOME">Доход</option>
          <option value="EXPENSE">Расход</option>
        </select>
      </div>
      <div className={styles.actions}>
        <Button onClick={addHandler} title="Добавить" disabled={!name || !description || !type}/>
        <Button onClick={onClose} title="Отмена" />
      </div>
    </div>
  );
}

export const AddCategory = observer(AddCategoryComponent);
