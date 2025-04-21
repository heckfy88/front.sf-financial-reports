import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Главная</Link> |
          <Link to="/transactions">Транзакции</Link> |
          <Link to="/reports">Отчёты</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
