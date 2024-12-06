

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login'; // Component đăng nhập
// import Register from './components/Register'; // Component đăng ký
// import ReceptionForm from './components/ReceptionManage/ReceptionForm'; // Component Đơn tiếp nhận
// import ReceptionList from './components/ReceptionManage/ReceptionList'; // Component Danh sách tiếp nhận
// import PatientList from './components/ReceptionManage/PatientList'; // Component Danh sách bệnh nhân
// import Navbar from './components/ReceptionManage/Navbar'; // Navbar

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập

//   // Hàm xử lý đăng nhập
//   const loginHandler = () => setIsAuthenticated(true);

//   // Hàm xử lý đăng xuất
//   const logoutHandler = () => setIsAuthenticated(false);

//   return (
//     <Router>
//       <div>
//         {/* Chỉ hiển thị Navbar khi đã đăng nhập */}
//         {isAuthenticated && <Navbar logoutHandler={logoutHandler} />}

//         <Routes>
//           {/* Trang đăng nhập */}
//           <Route path="/login" element={<Login loginHandler={loginHandler} />} />

//           {/* Trang đăng ký */}
//           <Route path="/register" element={<Register />} />

//           {/* Trang Đơn tiếp nhận */}
//           <Route
//             path="/reception-form"
//             element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách tiếp nhận */}
//           <Route
//             path="/reception-list"
//             element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách bệnh nhân */}
//           <Route
//             path="/patient-list"
//             element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng mặc định */}
//           <Route
//             path="/"
//             element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng sai đường dẫn */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login"; // Component đăng nhập
// import Register from "./components/Register"; // Component đăng ký
// import ReceptionForm from "./components/ReceptionManage/ReceptionForm"; // Component Đơn tiếp nhận
// import ReceptionList from "./components/ReceptionManage/ReceptionList"; // Component Danh sách tiếp nhận
// import PatientList from "./components/ReceptionManage/PatientList"; // Component Danh sách bệnh nhân
// import Navbar from "./components/ReceptionManage/Navbar"; // Navbar
// import Header from "../src/components/Header/Header"; // Header

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập

//   // Hàm xử lý đăng nhập
//   const loginHandler = () => setIsAuthenticated(false);

//   // Hàm xử lý đăng xuất
//   const logoutHandler = () => setIsAuthenticated(false);

//   return (
//     <Router>
//       <div>
//         {/* Hiển thị Header và Navbar khi đăng nhập thành công */}
//         {isAuthenticated && (
//           <>
//             <Header logoutHandler={logoutHandler} /> {/* Header luôn hiển thị trên Navbar */}
//             <Navbar /> {/* Navbar luôn nằm dưới Header */}
//           </>
//         )}

//         <Routes>
//           {/* Trang đăng nhập */}
//           <Route path="/login" element={<Login loginHandler={loginHandler} />} />

//           {/* Trang đăng ký */}
//           <Route path="/register" element={<Register />} />

//           {/* Trang Đơn tiếp nhận */}
//           <Route
//             path="/reception-form"
//             element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách tiếp nhận */}
//           <Route
//             path="/reception-list"
//             element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách bệnh nhân */}
//           <Route
//             path="/patient-list"
//             element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng mặc định */}
//           <Route
//             path="/"
//             element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng sai đường dẫn */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login"; // Component đăng nhập
// import Register from "./components/Register"; // Component đăng ký
// import ReceptionForm from "./components/ReceptionManage/ReceptionForm"; // Component Đơn tiếp nhận
// import ReceptionList from "./components/ReceptionManage/ReceptionList"; // Component Danh sách tiếp nhận
// import PatientList from "./components/ReceptionManage/PatientList"; // Component Danh sách bệnh nhân
// import Navbar from "./components/ReceptionManage/Navbar"; // Navbar
// import Header from "../src/components/Header/Header"; // Header
// import ChangePassword from "../src/components/Header/ChangePassword"; // Component Đổi mật khẩu
// import AccountSetting from "../src/components/Header/AccountSetting"; // Component Cài đặt tài khoản

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập

//   // Hàm xử lý đăng nhập
//   const loginHandler = () => setIsAuthenticated(true);

//   // Hàm xử lý đăng xuất
//   const logoutHandler = () => setIsAuthenticated(false);

//   return (
//     <Router>
//       <div>
//         {/* Hiển thị Header và Navbar khi đăng nhập thành công */}
//         {isAuthenticated && (
//           <>
//             <Header logoutHandler={logoutHandler} /> {/* Header luôn hiển thị trên Navbar */}
//             <Navbar /> {/* Navbar luôn nằm dưới Header */}
//           </>
//         )}

//         <Routes>
//           {/* Trang đăng nhập */}
//           <Route path="/login" element={<Login loginHandler={loginHandler} />} />

//           {/* Trang đăng ký */}
//           <Route path="/register" element={<Register />} />

//           {/* Trang Đơn tiếp nhận */}
//           <Route
//             path="/reception-form"
//             element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách tiếp nhận */}
//           <Route
//             path="/reception-list"
//             element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách bệnh nhân */}
//           <Route
//             path="/patient-list"
//             element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Đổi mật khẩu */}
//           <Route
//             path="/change-password"
//             element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Cài đặt tài khoản */}
//           <Route
//             path="/account-settings"
//             element={isAuthenticated ? <AccountSetting /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng mặc định */}
//           <Route
//             path="/"
//             element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng sai đường dẫn */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Login from "./components/Login"; // Component đăng nhập
// import Register from "./components/Register"; // Component đăng ký
// import ReceptionForm from "./components/ReceptionManage/ReceptionForm"; // Component Đơn tiếp nhận
// import ReceptionList from "./components/ReceptionManage/ReceptionList"; // Component Danh sách tiếp nhận
// import PatientList from "./components/ReceptionManage/PatientList"; // Component Danh sách bệnh nhân
// import Navbar from "./components/ReceptionManage/Navbar"; // Navbar
// import Header from "../src/components/Header/Header"; // Header
// import ChangePassword from "../src/components/Header/ChangePassword"; // Component Đổi mật khẩu
// import AccountSetting from "../src/components/Header/AccountSetting"; // Component Cài đặt tài khoản

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập
//   const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

//   // Hàm xử lý đăng nhập
//   const loginHandler = () => setIsAuthenticated(true);

//   // Hàm xử lý đăng xuất
//   const logoutHandler = () => setIsAuthenticated(false);

//   // Kiểm tra xem người dùng có ở trang Đổi mật khẩu hoặc Cài đặt tài khoản không
//   const hideNavbar = location.pathname === "/change-password" || location.pathname === "/account-settings";

//   return (
//     <Router>
//       <div>
//         {/* Hiển thị Header khi đăng nhập thành công */}
//         {isAuthenticated && <Header logoutHandler={logoutHandler} />}

//         {/* Ẩn Navbar khi ở trang Đổi mật khẩu hoặc Cài đặt tài khoản */}
//         {!hideNavbar && isAuthenticated && <Navbar />}

//         <Routes>
//           {/* Trang đăng nhập */}
//           <Route path="/login" element={<Login loginHandler={loginHandler} />} />

//           {/* Trang đăng ký */}
//           <Route path="/register" element={<Register />} />

//           {/* Trang Đơn tiếp nhận */}
//           <Route
//             path="/reception-form"
//             element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách tiếp nhận */}
//           <Route
//             path="/reception-list"
//             element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Danh sách bệnh nhân */}
//           <Route
//             path="/patient-list"
//             element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Đổi mật khẩu */}
//           <Route
//             path="/change-password"
//             element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" replace />}
//           />

//           {/* Trang Cài đặt tài khoản */}
//           <Route
//             path="/account-settings"
//             element={isAuthenticated ? <AccountSetting /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng mặc định */}
//           <Route
//             path="/"
//             element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
//           />

//           {/* Điều hướng sai đường dẫn */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login"; // Component đăng nhập
import Register from "./components/Register"; // Component đăng ký
import ReceptionForm from "./components/ReceptionManage/ReceptionForm"; // Component Đơn tiếp nhận
import ReceptionList from "./components/ReceptionManage/ReceptionList"; // Component Danh sách tiếp nhận
import PatientList from "./components/ReceptionManage/PatientList"; // Component Danh sách bệnh nhân
import Navbar from "./components/ReceptionManage/Navbar"; // Navbar
import Header from "../src/components/Header/Header"; // Header
import ChangePassword from "../src/components/Header/ChangePassword"; // Component Đổi mật khẩu
import AccountSetting from "../src/components/Header/AccountSetting"; // Component Cài đặt tài khoản

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Trạng thái đăng nhập
  const location = useLocation(); // Lấy thông tin về đường dẫn hiện tại

  // Hàm xử lý đăng nhập
  const loginHandler = () => setIsAuthenticated(true);

  // Hàm xử lý đăng xuất
  const logoutHandler = () => setIsAuthenticated(false);

  // Kiểm tra xem người dùng có ở trang Đổi mật khẩu hoặc Cài đặt tài khoản không
  const hideNavbar = location.pathname === "/change-password" || location.pathname === "/account-settings";

  return (
    <div>
      {/* Hiển thị Header khi đăng nhập thành công */}
      {isAuthenticated && <Header logoutHandler={logoutHandler} />}

      {/* Ẩn Navbar khi ở trang Đổi mật khẩu hoặc Cài đặt tài khoản */}
      {!hideNavbar && isAuthenticated && <Navbar />}

      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />

        {/* Trang đăng ký */}
        <Route path="/register" element={<Register />} />

        {/* Trang Đơn tiếp nhận */}
        <Route
          path="/reception-form"
          element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" replace />}
        />

        {/* Trang Danh sách tiếp nhận */}
        <Route
          path="/reception-list"
          element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" replace />}
        />

        {/* Trang Danh sách bệnh nhân */}
        <Route
          path="/patient-list"
          element={isAuthenticated ? <PatientList /> : <Navigate to="/login" replace />}
        />

        {/* Trang Đổi mật khẩu */}
        <Route
          path="/change-password"
          element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" replace />}
        />

        {/* Trang Cài đặt tài khoản */}
        <Route
          path="/account-settings"
          element={isAuthenticated ? <AccountSetting /> : <Navigate to="/login" replace />}
        />

        {/* Điều hướng mặc định */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/reception-form" replace /> : <Navigate to="/login" replace />}
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
