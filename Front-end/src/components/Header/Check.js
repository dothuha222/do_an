
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
import KhamBenhList from "./components/HealthManagement/KhamBenhList";
import InvoiceForm from "./components/ReceptionManage/InvoiceForm";
import InvoiceList from "./components/ReceptionManage/InvoiceList";
import DrugList from "./components/ReceptionManage/DrugList";
import DrugForm from "./components/ReceptionManage/DrugForm";
import NavbarUser from "./components/User/NavbarUser";
import NavbarHealth from "./components/HealthManagement/NavbarHealth";
import Home from "./components/User/Home";
import ScheduleForm from "./components/User/ScheduleForm";
import ScheduleList from "./components/User/ScheduleList";
import HealthHistory from "./components/User/HealthHistory";
import InvoiceHistory from "./components/User/InvoiceHistory";
import DichVuList from "./components/ReceptionManage/DichVuList";
import DichVuForm from "./components/ReceptionManage/DichVuForm";
import ViewHistory from "./components/HealthManagement/ViewHistory";


const App = () => {
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  const hideNavbar = location.pathname === "/change-password";

  return (
    <div>
      <Header/>
      <Navbar />
      <Routes>
     
        <Route path="/login" element={<Login />} />
        <Route
          path="/reception-form"
          element={<ReceptionForm />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
         <Route
          path="/schedule-form"
          element={<ScheduleForm />}
        />
         <Route
          path="/schedule-list"
          element={<ScheduleList /> }
        />
         <Route
          path="/health-history"
          element={<HealthHistory />}
        />
         <Route
          path="/invoice-history"
          element={<InvoiceHistory />}
        />

        <Route
          path="/reception-list"
          element={<ReceptionList />}
        />

        <Route
          path="/reception-form/:id" 
          element={<ReceptionForm />}
        />
        <Route
          path="/patient-register"
          element={<PatientRegister />}
        />
        <Route
          path="/patient-list"
          element={<PatientList />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        <Route
          path="/khambenh-list"
          element={<KhamBenhList />}
        />

        <Route
          path="/health-form"
          element={<HealthForm />}
        />
        
        <Route
          path="/prescription-form"
          element={<PrescriptionForm />}
        />

        <Route
          path="/view-history"
          element={<ViewHistory />}
        />

        <Route
          path="/invoice-list"
          element={<InvoiceList />}
        />

        <Route
          path="/invoice-form"
          element={<InvoiceForm />}
        />

        <Route
          path="/drug-list"
          element={<DrugList />}
        />
        <Route
          path="/drug-form"
          element={<DrugForm />}
        />

        <Route
          path="/dichvu-list"
          element={<DichVuList />
          }
        />
        <Route
          path="/dichvu-form"
          element={ <DichVuForm /> }
        />

        {/* Điều hướng mặc định */}
        <Route
          path="/"
          element={<Navigate to="/reception-form" replace />}
        />

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
