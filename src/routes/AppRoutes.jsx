import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '_pages/Home/Home.jsx';
import Transactions from '_pages/Transitions/Transactions.jsx';
import Reports from '_pages/Reports';
import Login from '_pages/Login/Login.jsx';
import MainLayout from "_components/MainLayout/MainLayout";
import ProtectedRoute from '_components/ProtectedRoute/ProtectedRoute';

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRouter;
