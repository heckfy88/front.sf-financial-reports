import React, { useState } from "react";
import Dashboard1 from "./Dashboard1_TransactionsOverTime";
import Dashboard2 from "./Dashboard2_ByTransactionType";
import Dashboard3 from "./Dashboard3_IncomeVsExpense";
import Dashboard4 from "./Dashboard4_StatusStats";
import Dashboard5 from "./Dashboard5_BankStats";
import Dashboard6 from "./Dashboard6_CategoryStats";
import styles from "./styles.module.scss";
import cs from "classnames";
import { useStores } from "_stores/use-stores.js";
import { observer } from "mobx-react-lite";

const tabs = [
  "📈 По времени",
  "💳 По типу",
  "⚖️ Поступления vs Траты",
  "🔁 Статусы",
  "🏦 Банки",
  "📊 Категории"
];

function DashboardTabsComponent () {
  const [activeTab, setActiveTab] = useState(0);
  const { transactionsStore } = useStores();
  const { filteredTransactions: transactions, loading } = transactionsStore;

  const dashboards = [
    <Dashboard1 transactions={transactions} loading={loading} />,
    <Dashboard2 transactions={transactions} loading={loading}  />,
    <Dashboard3 transactions={transactions} loading={loading} />,
    <Dashboard4 transactions={transactions} loading={loading} />,
    <Dashboard5 transactions={transactions} loading={loading} />,
    <Dashboard6 transactions={transactions} loading={loading} />,
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardTabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cs(styles.tabButton, index === activeTab && styles.active)}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.dashboardContent}>
        {dashboards[activeTab]}
      </div>
    </div>
  );
}

export const DashboardTabs = observer(DashboardTabsComponent);
