
import React, { useState,useEffect } from "react";
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
import ViewHistoryList from "./components/HealthManagement/ViewHistoryList";
import DuyetKham from "./components/ReceptionManage/DuyetKham";
import ViewDonTiepNhan from "./components/ReceptionManage/ViewDonTiepNhan";
import ViewDrug from "./components/ReceptionManage/ViewDrug";
import ViewDichVu from "./components/ReceptionManage/ViewDichVu";
import ViewDon from "./components/HealthManagement/ViewDon"
import ViewHistoryBA from "./components/HealthManagement/ViewHistoryBA";
import ViewLichHen from './components/User/ViewLichHen'
import EditDonTN from "./components/ReceptionManage/EditDonTN";
import ViewPatientRegister from "./components/ReceptionManage/ViewPatientRegister";
import EditThuoc from "./components/ReceptionManage/EditThuoc";
const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  // Hàm xử lý đăng nhập
  // const loginHandler = () => setIsAuthenticated(true);

  // Hàm xử lý đăng xuất
  // const logoutHandler = () => setIsAuthenticated(false);

  // Kiểm tra xem người dùng có ở trang Đổi mật khẩu hoặc Cài đặt tài khoản không
  const [userRole, setUserRole] = useState(null);
  const [ten, setTen] = useState(null);
  const [userId, setUserId] = useState(null);

  const hideNavbar = location.pathname === "/login" || location.pathname === "/change-password";
  const hideHeader = location.pathname === "/login"
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem('ten');
    const storedId = localStorage.getItem('userId');
    if (storedRole) {
      setUserRole(storedRole);
    }
    if (storedName) {
      setTen(storedName); 
    }

    if (storedId) {
      setUserId(storedId); 
    }
  }, []);
  return (
    <div>
      {/* Hiển thị Header khi đăng nhập thành công */}
     
      {!hideHeader && <Header ten = {ten}/>}

      {/* Ẩn Navbar khi ở trang Đổi mật khẩu hoặc Cài đặt tài khoản */}
      
      {!hideNavbar && (
        <>
          {userRole === "benh_nhan" && <NavbarUser />}
          {userRole === "le_tan" && <Navbar />}
          {userRole === "bac_si" && <NavbarHealth />}
        </>
        )}

      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login setUserRole={setUserRole} setTen={setTen} setUserId={setUserId}/>} />

        {/* Trang Đơn tiếp nhận */}
        <Route
          path="/reception-form"
          element={<ReceptionForm userId={userId}/>}
        />
        <Route
          path="/home"
          element={<Home />}
        />
         <Route
          path="/schedule-form"
          element={<ScheduleForm userId={userId}/>}
        />
         <Route
          path="/schedule-list"
          element={<ScheduleList /> }
        />
         <Route
          path="/health-history"
          element={<HealthHistory userId={userId} />}
        />
         <Route
          path="/invoice-history"
          element={<InvoiceHistory />}
        />

        {/* Trang Danh sách tiếp nhận */}
        <Route
          path="/reception-list"
          element={<ReceptionList />}
        />

        {/* Chi tiết đơn tiếp nhận */}
        {/* <Route
          path="/reception-form/:id" 
          // element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
          element={<ReceptionForm />}
        /> */}

        <Route
          // path="/duyet-kham/:id" 
          path="/duyet-kham/:id" 
          element={<DuyetKham userId={userId}/>}
        />

        <Route
          path="/don-tiep-nhan/:id" 
          element={<ViewDonTiepNhan />}
        />
        <Route
          path="/edit-don/:id" 
          element={<EditDonTN userId={userId}/>}
        />

        <Route
          path="/lich-hen/:id" 
          element={<ViewLichHen />}
        />

        <Route
          path="/view-drug/:id" 
          element={<ViewDrug />}
        />

        <Route
          path="/edit-drug/:id" 
          element={<EditThuoc />}
        />

        <Route
          path="/view-dichvu" 
          element={<ViewDichVu />}
        />

        {/* Sửa đơn tiếp nhận */}
        {/* <Route
          path="/edit-reception-form/:id" 
          element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
        /> */}

        {/* Đăng ký tài khoản bệnh nhân*/}
        <Route
          path="/patient-register"
          // element={isAuthenticated ? <PatientRegister /> : <Navigate to="/login" replace />}
          element={<PatientRegister />}
        />
        {/* Trang Danh sách tài khoản */}
        <Route
          path="/patient-list"
          // element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
          element={<PatientList />}
        />

        {/* Trang Đổi mật khẩu */}
        <Route
          path="/change-password"
          // element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" replace />}
          element={<ChangePassword userId={userId} />}
        />

        <Route
          path="/khambenh-list"
          element={<KhamBenhList />}
        />

          <Route path="/view-don/:id" element={<ViewDon />} />
          <Route path="/view-history-ba/:id" element={<ViewHistoryBA ten = {ten} />} />

          <Route path="/view-patient-register/:id" element={<ViewPatientRegister ten = {ten} />} />



        {/* Trang Đơn khám bệnh */}
        <Route
          path="/health-form/:id"
          // element={isAuthenticated ? <HealthForm /> : <Navigate to="/login" replace />}
          element={<HealthForm ten = {ten} userId={userId}/>}
        />
        
        {/* Trang Đơn thuốc */}
        <Route
          path="/prescription-form/:id"
          // element={isAuthenticated ? <PrescriptionForm /> : <Navigate to="/login" replace />}
          element={<PrescriptionForm ten = {ten} userId={userId} />}
        />

        <Route
          path="/view-history-list/:id"
          // element={isAuthenticated ? <ViewHistory /> : <Navigate to="/login" replace />}
          element={<ViewHistoryList />}
        />

        {/* Trang Hóa đơn */}
        <Route
          path="/invoice-list"
          // element={isAuthenticated ? <InvoiceList /> : <Navigate to="/login" replace />}
          element={<InvoiceList />}
        />

        <Route
          path="/invoice-form/:id"
          // element={isAuthenticated ? <InvoiceForm /> : <Navigate to="/login" replace />}
          element={<InvoiceForm />}
        />

        <Route
          path="/drug-list"
          // element={isAuthenticated ? <DrugList /> : <Navigate to="/login" replace />}
          element={<DrugList />}
        />
        <Route
          path="/drug-form"
          // element={isAuthenticated ? <DrugForm /> : <Navigate to="/login" replace />}
          element={<DrugForm />}
        />

        <Route
          path="/dichvu-list"
          // element={isAuthenticated ? <DichVuList /> : <Navigate to="/login" replace />}
          element={<DichVuList />


          }
        />
        <Route
          path="/dichvu-form"
          // element={isAuthenticated ? <DichVuForm /> : <Navigate to="/login" replace />}
          element={ <DichVuForm /> }
        />

        {/* Điều hướng mặc định */}
        <Route
          path="/"
          // element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
          // element={<Navigate to="/login" replace />}
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
