import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";
import RecoverPassword from "../pages/RecoverPassword";
import NewPassword from "../pages/NewPassword";

function AppNavivation() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/recover_password" element={<RecoverPassword />} />
          <Route path="/reset-password-form/:reset_token" element={<NewPassword />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppNavivation;
