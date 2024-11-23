
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login'; // Component đăng nhập
// import Register from './components/Register'; // Component đăng ký
// import ReceptionForm from './components/ReceptionForm'; // Component Đơn tiếp nhận

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(true); // Trạng thái đăng nhập

//   return (
//     <Router>
//       <Routes>
//         {/* Đường dẫn mặc định là Login */}
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <Navigate to="/reception-form" replace />
//             ) : (
//               <Login setIsLoggedIn={setIsLoggedIn} />
//             )
//           }
//         />

//         {/* Đăng ký */}
//         <Route path="/register" element={<Register />} />

//         {/* Giao diện Đơn tiếp nhận */}
//         <Route
//           path="/reception-form"
//           element={
//             isLoggedIn ? (
//               <ReceptionForm />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Điều hướng sai đường dẫn về trang đăng nhập */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReceptionForm from '../src/components/ReceptionForm'
// import ReceptionList from './ReceptionList';
// import PatientList from './PatientList';
import Login from '../src/components/Login'
import Register from '../src/components/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Hàm đăng nhập
  const loginHandler = () => setIsAuthenticated(true);
  // Hàm đăng xuất
  const logoutHandler = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        {/* Route cho trang chủ mặc định, chuyển đến Login nếu chưa đăng nhập */}
        <Route path="/reception-form" element={isAuthenticated ? <ReceptionForm /> : <Navigate to="/login" />} />

        {/* Route cho các trang yêu cầu phải đăng nhập
        <Route path="/reception-list" element={isAuthenticated ? <ReceptionList /> : <Navigate to="/login" />} />
        <Route path="/patient-list" element={isAuthenticated ? <PatientList /> : <Navigate to="/login" />} /> */}
        
        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />

        {/* Trang đăng ký */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
