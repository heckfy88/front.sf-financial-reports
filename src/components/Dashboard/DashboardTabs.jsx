import { useState } from 'react';
import TimelineChart from './TimelineChart';
import TransactionTypeChart from './TransactionTypeChart';
import IncomeVsExpenseChart from './IncomeVsExpenseChart';
import StatusPieChart from './StatusPieChart';
import BankStatsChart from './BankStatsChart';
import CategoryBreakdownChart from './CategoryBreakdownChart';

const DashboardTabs = () => {
  const [tab, setTab] = useState('timeline');

  const tabComponents = {
    timeline: <TimelineChart />,
    type: <TransactionTypeChart />,
    comparison: <IncomeVsExpenseChart />,
    status: <StatusPieChart />,
    banks: <BankStatsChart />,
    categories: <CategoryBreakdownChart />,
  };

  return (
    <div>
      <div className="tab-buttons">
        <button onClick={() => setTab('timeline')}>📈 Временная динамика</button>
        <button onClick={() => setTab('type')}>💳 Тип транзакции</button>
        <button onClick={() => setTab('comparison')}>⚖️ Поступления vs Расходы</button>
        <button onClick={() => setTab('status')}>🔁 Статус транзакций</button>
        <button onClick={() => setTab('banks')}>🏦 Банки</button>
        <button onClick={() => setTab('categories')}>📊 Категории</button>
      </div>
      <div className="tab-content">
        {tabComponents[tab]}
      </div>
    </div>
  );
};

export default DashboardTabs;
