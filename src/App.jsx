import './App.css'
import { Route, Routes } from "react-router-dom";
import MainLayout from "_components/MainLayout/MainLayout.jsx";
import AppRouter from "_/routes/AppRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AppRouter />} />
        <Route path="*" element={<AppRouter />} />
      </Route>
    </Routes>
  )
}

export default App
