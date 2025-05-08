import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "_stores/use-stores.js";
import jsPDF from "jspdf";
import { PERSON_TYPES } from "_services/transactions.service.js";
import autoTable from "jspdf-autotable";
import { Roboto } from "_assets/fonts/Roboto.js"
import Button from "_components/Button/Button.jsx";

const personType = PERSON_TYPES;


function DownloadButtonComponent() {
  const { transactionsStore } = useStores();
  const { filteredTransactions } = transactionsStore;

  const downloadPdf = useCallback(() => {
    const doc = new jsPDF();

    doc.addFileToVFS("Roboto.ttf", Roboto);
    doc.addFont("Roboto.ttf", "Roboto", "normal")
    doc.setFont("Roboto");
    doc.setFontSize(10);

    const head = [[
      "Дата", "Тип пользователя", "Описание", "Сумма", "Статус",
      "Банк отправителя", "Счёт отправителя", "Банк получателя",
      "Счёт получателя", "ИНН", "Категория", "Телефон"
    ]];

    const body = filteredTransactions.map(t => ([
      t.date,
      personType[t.receiverUserType],
      t.description,
      t.amount.toLocaleString(),
      t.status.title,
      t.senderBank,
      t.senderAccount,
      t.receiverBank,
      t.receiverAccount,
      t.receiverInn,
      t.category.description,
      t.receiverPhone
    ]));

    autoTable(doc, {
      head: head,
      body: body,
      styles: { font: "Roboto", fontSize: 8 },
      headStyles: { font: "Roboto", fontStyle: "normal" ,fontSize: 8, fillColor: [22, 160, 133], textColor: 255 },
    });

    doc.save("transactions.pdf");
  }, [filteredTransactions]);

  return (
    <Button onClick={downloadPdf} title="Скачать PDF" />
  );
}

export const DownloadButton = observer(DownloadButtonComponent);
