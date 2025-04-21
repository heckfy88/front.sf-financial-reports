import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '_pages/Home';
import Transactions from '_pages/Transactions';
import Reports from '_pages/Reports';
import Login from '_pages/Login';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;
