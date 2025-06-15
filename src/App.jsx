// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import "./theme.css"; // dark/light mode override
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./assets/pages/LoginPage";
import RegisterPage from "./assets/pages/RegisterPage";
import DetailPage from "./assets/pages/DetailPage";
import CheckoutPage from "./assets/pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
