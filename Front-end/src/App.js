
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login"; // Component đăng nhập
import ReceptionForm from "./components/ReceptionManage/ReceptionForm"; // Component Đơn tiếp nhận
import ReceptionList from "./components/ReceptionManage/ReceptionList"; // Component Danh sách tiếp nhận
import PatientList from "./components/ReceptionManage/PatientList"; // Component Danh sách bệnh nhân
import PatientRegister from "./components/ReceptionManage/PatientRegister";
import Navbar from "./components/ReceptionManage/Navbar"; // Navbar
import Header from "../src/components/Header/Header"; // Header
import ChangePassword from "../src/components/Header/ChangePassword"; // Component Đổi mật khẩu
import HealthForm from "../src/components/HealthManagement/HealthForm"; // Component Đơn khám sức khỏe
import PrescriptionForm from "../src/components/HealthManagement/PrescriptionForm"
import InvoiceForm from "./components/ReceptionManage/InvoiceForm";
import InvoiceList from "./components/ReceptionManage/InvoiceList";
import DrugList from "./components/ReceptionManage/DrugList";
import DrugForm from "./components/ReceptionManage/DrugForm";
import NavbarUser from "./components/User/NavbarUser";
import Home from "./components/User/Home";
import ScheduleForm from "./components/User/ScheduleForm";
import ScheduleList from "./components/User/ScheduleList";
import HealthHistory from "./components/User/HealthHistory";
import InvoiceHistory from "./components/User/InvoiceHistory";
import DichVuList from "./components/ReceptionManage/DichVuList";
import DichVuForm from "./components/ReceptionManage/DichVuForm";
import ViewHistory from "./components/HealthManagement/ViewHistory";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  // Hàm xử lý đăng nhập
  const loginHandler = () => setIsAuthenticated(true);

  // Hàm xử lý đăng xuất
  const logoutHandler = () => setIsAuthenticated(false);

  // Kiểm tra xem người dùng có ở trang Đổi mật khẩu hoặc Cài đặt tài khoản không
  const hideNavbar = location.pathname === "/change-password";

  return (
    <div>
      {/* Hiển thị Header khi đăng nhập thành công */}
      {isAuthenticated && <Header logoutHandler={logoutHandler} />}

      {/* Ẩn Navbar khi ở trang Đổi mật khẩu hoặc Cài đặt tài khoản */}
      {!hideNavbar && isAuthenticated && <Navbar />}
      {/* {!hideNavbar && isAuthenticated && <NavbarUser />} */}

      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />
        {/* Trang Đơn tiếp nhận */}
        <Route
          path="/reception-form"
          element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
        />
        {/* <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
         <Route
          path="/schedule-form"
          element={isAuthenticated ? <ScheduleForm /> : <Navigate to="/login" replace />}
        />
         <Route
          path="/schedule-list"
          element={isAuthenticated ? <ScheduleList /> : <Navigate to="/login" replace />}
        />
         <Route
          path="/health-history"
          element={isAuthenticated ? <HealthHistory /> : <Navigate to="/login" replace />}
        />
         <Route
          path="/invoice-history"
          element={isAuthenticated ? <InvoiceHistory /> : <Navigate to="/login" replace />}
        /> */}

        {/* Trang Danh sách tiếp nhận */}
        <Route
          path="/reception-list"
          element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" replace />}
        />

        {/* Chi tiết đơn tiếp nhận */}
        <Route
          path="/reception-form/:id" 
          element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
        />

        {/* Sửa đơn tiếp nhận */}
        {/* <Route
          path="/edit-reception-form/:id" 
          element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
        /> */}
        {/* Đăng ký tài khoản */}
        <Route
          path="/patient-register"
          element={isAuthenticated ? <PatientRegister /> : <Navigate to="/login" replace />}
        />
        {/* Trang Danh sách tài khoản */}
        <Route
          path="/patient-list"
          element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
        />

        {/* Trang Đổi mật khẩu */}
        <Route
          path="/change-password"
          element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" replace />}
        />

        

        {/* Trang Đơn khám bệnh */}
        <Route
          path="/health-form"
          element={isAuthenticated ? <HealthForm /> : <Navigate to="/login" replace />}
        />
        
        {/* Trang Đơn thuốc */}
        <Route
          path="/prescription-form"
          element={isAuthenticated ? <PrescriptionForm /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/view-history"
          element={isAuthenticated ? <ViewHistory /> : <Navigate to="/login" replace />}
        />

        {/* Trang Hóa đơn */}
        <Route
          path="/invoice-list"
          element={isAuthenticated ? <InvoiceList /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/invoice-form"
          element={isAuthenticated ? <InvoiceForm /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/drug-list"
          element={isAuthenticated ? <DrugList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/drug-form"
          element={isAuthenticated ? <DrugForm /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/dichvu-list"
          element={isAuthenticated ? <DichVuList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dichvu-form"
          element={isAuthenticated ? <DichVuForm /> : <Navigate to="/login" replace />}
        />

        {/* Điều hướng mặc định */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
        />

       {/* <  Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        /> */}

        {/* Điều hướng sai đường dẫn */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

// Bao bọc ứng dụng trong Router để useLocation hoạt động
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
